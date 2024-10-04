from pyspark.sql import SparkSession
from pyspark.sql.functions import col,udf,lit,when,regexp_replace,expr,format_number,concat
from pyspark.sql.types import DecimalType,StructType, StructField, StringType, IntegerType,FloatType
import re
import pandas as pd
import pyodbc


# Read the text file in fSexemple1
spark = SparkSession.builder.appName("ReadTextFile").getOrCreate()




text__Network_Security = spark.read.text("abfss://fs11@datalakeexemple11.dfs.core.windows.net/Liste-Universite-Experience-Competance/Network & Security.txt")
# Convert the DataFrame to a list
Network_Security = [row['value'] for row in text__Network_Security.select(col("value")).collect()]



text_DataCenter_Cloud = spark.read.text("abfss://fs11@datalakeexemple11.dfs.core.windows.net/Liste-Universite-Experience-Competance/Data Center & Cloud.txt")
# Convert the DataFrame to a list
Data_Center_Cloud = [row['value'] for row in text_DataCenter_Cloud.select(col("value")).collect()]



text_Data_Business_Application = spark.read.text("abfss://fs11@datalakeexemple11.dfs.core.windows.net/Liste-Universite-Experience-Competance/Data & Business Application.txt")
# Convert the DataFrame to a list
Data_Business_Application = [row['value'] for row in text_Data_Business_Application.select(col("value")).collect()]




text_Identity_Modern_Workplace = spark.read.text("abfss://fs11@datalakeexemple11.dfs.core.windows.net/Liste-Universite-Experience-Competance/Identity & Modern Workplace.txt")
# Convert the DataFrame to a list
Identity_Modern_Workplace = [row['value'] for row in text_Identity_Modern_Workplace.select(col("value")).collect()]








# create a SparkSession
spark = SparkSession.builder.appName("Read CSV").getOrCreate()
#lire le fichier cv (celui qui a été converti d'excel à un csv)
df = spark.read.csv("abfss://fs11@datalakeexemple11.dfs.core.windows.net/CvFormCSV.csv", header=True, inferSchema=True, sep=";")







server = 'cv-server.database.windows.net'
database = 'CV'
username = 'cvserver'
password = 'AzizFehmi123456'

cnxn = pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};SERVER=' + server + ';DATABASE='+ database +';UID=' + username + ';PWD='+ password)
cursor = cnxn.cursor()


# Fetch the university data from the database
cursor.execute("SELECT Nom, Abbreviation, Score FROM Universite")
university_data = cursor.fetchall()


def clean_text(text):
    # Remove special characters, convert to lowercase, and standardize spaces
    cleaned_text = re.sub(r'[^\w\s]', '', text.lower())
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
    return cleaned_text


university_list = [[clean_text(row.Nom) ,row.Abbreviation.lower(),row.Score] for row in university_data]



def extract_universities_from_list(text):
    if pd.isna(text):
        return "Cellule vide !", None  # Return None for the score if the text is empty

    # Preprocess the text: remove special characters, convert to lowercase, and standardize spaces
    text_processed = re.sub(r'[^\w\s]', '', text.lower())
    text_processed = re.sub(r'\s+', ' ', text_processed)

    max_score = 0  # Initialize max_score to 0
    processed_universities_name = [] # Set to keep track of processed university names
    processed_universities_abbrev = []  # Set to keep track of processed university abbreviations
    universities_info = []

    # Check each university entry from the list
    for university in university_list:
        # Check if the university name and abbreviation are in the input text
        if ( re.search(rf'\b{university[0]}\b', text_processed) or re.search(rf'\b{university[1]}\b', text_processed)):
           if (university[0] not in processed_universities_name and university[1] not in processed_universities_abbrev):  
            university_info = f"Nom: {university[0]} , Abbreviation: {university[1]}\n"
            universities_info.append(university_info)
            processed_universities_name.append(university[0])  # Add name to processed universities set
            processed_universities_abbrev.append(university[1])  # Add abbreviation to processed universities set
            max_score = max(max_score, university[2])  # Update max_score if needed

    if not universities_info:
        return "Aucune université détectée !", None

    # Generate the result by joining the university info
    result = ''.join(universities_info)
    return result, max_score



# Define a new UDF to extract universities and max score
extract_universities_with_max_score_udf = udf(lambda text: extract_universities_from_list(text), StructType([
    StructField("Universites", StringType(), True),
    StructField("MaxScore", DecimalType(3,2), True)
]))

# Apply the new UDF to a DataFrame column and create new columns for 'Universites' and 'Score'
df = df.withColumn('ExtractedInfo', extract_universities_with_max_score_udf(df['Formation']))

# Extract 'Universites' and 'MaxScore' from the struct column and create separate columns
df = df.withColumn('Universites', col('ExtractedInfo.Universites'))
df = df.withColumn('Score_Universite', col('ExtractedInfo.MaxScore'))
# If 'Score' is null, replace it with -1
df = df.withColumn('Score_Universite', when(col('Score_Universite').isNull(), lit(0)).otherwise(col('Score_Universite')))

# Drop the 'ExtractedInfo' column if needed
df = df.drop('ExtractedInfo')


# Close the cursor to release the connection
cursor.close()
cnxn.close()





# List of words that define engineering
engineering_words = ["ingénieur", "génie", "engineering","ingenieur"]
master_words = ["mastère", "master", "masters","mastere","Mastère","maitrise","Master"]

# Regular expression pattern to match any of the engineering words and "|" means "or"
pattern = "|".join(engineering_words)
patternM = "|".join(master_words)

def detect_degree(formation):
    if formation is None:
        return "Niveau non détecté"
    elif re.search(pattern, formation):         #we import re to use search 
        return "Ingénieur"
    elif re.search(patternM, formation):
        return "Mastère"
    elif "Technicien" in formation.lower():
        return " Technicien supérieur"    
    elif "licence" in formation.lower():
        return "Licence"
    elif "baccalauréat" in formation.lower():
        return "Baccalauréat"
    else:
        return "Autre"


detect_degree_udf = udf(detect_degree, StringType())


#df.withcolumn pour ajouter une nouvelle colonne (nom,valeur)
df = df.withColumn("Niveau_d_études", detect_degree_udf("Formation"))


# Function to calculate score based on level of education
def calculate_education_level_score(education_level):
    if education_level == "Ingénieur":
        return 0.2
    elif education_level == "Mastère":
        return 0.15
    elif education_level == "Technicien supérieur":
        return 0.1
    elif education_level == "Licence":
        return 0.1
    elif education_level == "Baccalauréat":
        return 0.05
    elif education_level == "Autre":
        return 0.03
    else:
        return 0

# Create a UDF to apply the education level score calculation
calculate_education_level_score_udf = udf(calculate_education_level_score, FloatType())

# Assuming you have a column 'Niveau_d_études' that has the level of education
# Adjust the column name accordingly
df = df.withColumn("Niveau_Education_Score", calculate_education_level_score_udf(col("Niveau_d_études")))







# define a UDF to extract the year from the string in the format "20.."
#This function uses regular expressions to match any four-digit numbers starting with "20" in the input string,
#regardless of whether they are separated by dashes, slashes, or other characters. Then, it calculates the range between the largest and smallest year found in the input.

def extract_year(exp):
    if exp is None:
        return None
    else:
        pattern = r'(20\d{2})'
        matches = re.findall(pattern, exp)
        if matches:
            years = [int(x) for x in matches]
            return max(years) - min(years)
        else:
            return None


    


# the cast method is used to convert the resulting values of the UDF from string to integer type using the IntegerType() data type.
# apply the UDF to the Experience column
extract_year_udf = udf(extract_year,StringType())
df = df.withColumn("Années_d_expérience", when(extract_year_udf("Experience").isNotNull(), extract_year_udf("Experience")).otherwise("Pas d'année d'expérience détectée"))
# we are using the when() function to handle the null or missing values returned by the extract_year_udf function.
#when() takes two parameters:
#The first parameter is a Boolean expression that specifies the condition to evaluate.
#The second parameter is the value to return when the condition is true.
#In this case, we're checking if the result of extract_year_udf("Experience") is not null using the isNotNull() method.
#If the result is not null, the value of extract_year_udf("Experience") is returned. Otherwise, we return the string "Pas d'année d'expérience détectée".




def calculate_experience_score(experience_years):
    # Ensure the input is numeric
    try:
        experience_years = int(experience_years)
    except ValueError:
        return 0.0
    
    if experience_years >= 3:
        return 0.3
    elif experience_years >= 2:
        return 0.25
    elif experience_years > 1:
        return 0.2
    elif experience_years == 1:
        return 0.1
    else:
        return 0.0


# UDF to apply the experience score calculation
calculate_experience_score_udf = udf(calculate_experience_score, FloatType())

# Add a new column for experience score
df = df.withColumn("Annee_Experience_Score", calculate_experience_score_udf(col("Années_d_expérience")))









#counts pour initialiser les scores des mots cles trouvés
#most common list pour avoir le plus grand nombre de counts cad le pole correspendant au candidat
#casefold pour ignorer la casse




# create a UDF to search for competence and experience names in two columns

def find_competence(col1, col2):
    CompExp = set()                             #set() est une fonction qui permet de retourner des valeurs uniques (pas de doublons)                                            
    
    counts = { "Network_Security": 0, "Data_Business_Application": 0, "Data_Center_Cloud": 0, "Identity_Modern_Workplace": 0 }

    for compexp in Network_Security + Data_Business_Application + Data_Center_Cloud + Identity_Modern_Workplace:  
        if col1 is not None and compexp.casefold() in col1.casefold():                     
            CompExp.add(compexp)
            counts["Network_Security" if compexp in Network_Security else ("Data_Business_Application" if compexp in Data_Business_Application else ("Data_Center_Cloud" if compexp in Data_Center_Cloud else "Identity_Modern_Workplace"))] += 1
        if col2 is not None and compexp.casefold() in col2.casefold():
            CompExp.add(compexp)
            counts["Network_Security" if compexp in Network_Security else ("Data_Business_Application" if compexp in Data_Business_Application else ("Data_Center_Cloud" if compexp in Data_Center_Cloud else "Identity_Modern_Workplace"))] += 1

    if len(CompExp) > 0:
        most_common_list = max(counts, key=counts.get)
        return (", ".join(CompExp), most_common_list)
    else:
        return ('Aucune compétence et expérience détectée !', "Pas de pôle adéquat ")




# register the UDF
find_competence_udf = udf(find_competence, StructType([StructField('compexp', StringType()), StructField('most_common_list', StringType())]))

# add new columns to the DataFrame
df = df.withColumn("Competences_et_Experiences_détectées_pour_supp", find_competence_udf(col("Competance"), col("Experience")))
df = df.withColumn("Compétences_et_Expériences_détectées", col("Competences_et_Experiences_détectées_pour_supp").getItem("compexp"))
df = df.withColumn("pole", col("Competences_et_Experiences_détectées_pour_supp").getItem("most_common_list"))


df = df.drop("Competences_et_Experiences_détectées_pour_supp")





# Function to calculate score based on competence and experience
def calculate_competence_experience_score(competence_experience):
    # Count the number of words based on commas
    num_words = len(competence_experience.split(','))

    if num_words >= 10:
        return 0.2
    elif num_words >= 6:
        return 0.15
    else:
        return 0.1

# UDF to apply the competence and experience score calculation
calculate_competence_experience_score_udf = udf(calculate_competence_experience_score, FloatType())

# Assuming you have a column 'Words_Detected' that has the number of words detected for competence and experience
# Adjust the column name accordingly
df = df.withColumn("Competence_Experience_Score", calculate_competence_experience_score_udf(col("Compétences_et_Expériences_détectées")))










# define a UDF to remove all characters except digits
def clean_tel(tel):
    if tel is not None:
        tel_str = str(tel)
        return re.sub("[^0-9]", "", tel_str)
    else:
        return tel

# register the UDF
clean_tel_udf = udf(clean_tel, StringType())

# apply the UDF to the "tel" column
df = df.withColumn("tel", clean_tel_udf(col("tel")))


# remove semicolon from all columns
for col_name in df.columns:
    df = df.withColumn(col_name, regexp_replace(col(col_name), ';', ':'))









# Define a UDF to calculate language score
def calculate_language_score(langue):
    score = 0.0
    if langue is not None:
        if any(pattern in langue.lower() for pattern in ["french", "francais", "fr", "frc"]):
            score += 0.05
        if any(pattern in langue.lower() for pattern in ["english", "anglais", "en"]):
            score += 0.03
    
    # Add score for other cases
    if score == 0.0:
        score = 0.02
    
    return score

# Register the UDF
calculate_language_score_udf = udf(calculate_language_score, FloatType())

# Add a new column for language score
df = df.withColumn("Language_Score", calculate_language_score_udf(col("Langue")))





# Calculate the total score
df = df.withColumn("ScoreSupp", (col("Annee_Experience_Score") + col("Competence_Experience_Score") + col("Niveau_Education_Score") + col("Score_Universite") + col("Language_Score")) * 100)
df = df.withColumn("Score", concat(format_number((col("Annee_Experience_Score") + col("Competence_Experience_Score") + col("Niveau_Education_Score") + col("Score_Universite") + col("Language_Score")) * 100, 0), lit("%")))
df = df.drop("ScoreSupp")

# Define the JDBC URL
jdbc_url = "jdbc:sqlserver://cv-server.database.windows.net:1433;databaseName=CV;user=cvserver@cv-server;password=AzizFehmi123456"

# Define the properties for the JDBC connection
connection_properties = {
    "driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver",
}

# Write the DataFrame to the SQL table
df.write.jdbc(url=jdbc_url, table='CVFinal', mode="append", properties=connection_properties)

display(df)
'''
df.write.format("csv").option("header", "true").option("delimiter", ";").option("quote", "\"").option("charset", "UTF-8").mode("overwrite").save("abfss://fs11@datalakeexemple11.dfs.core.windows.net/CSVFinal.csv")



spark = SparkSession.builder.appName("test").getOrCreate()


test_file_path = "abfss://fs11@datalakeexemple11.dfs.core.windows.net/CSVFinal.csv/_SUCCESS"
#delete the succes file
spark._jvm.org.apache.hadoop.fs.FileSystem.get(spark._jsc.hadoopConfiguration()).delete(spark._jvm.org.apache.hadoop.fs.Path(test_file_path), True)
'''