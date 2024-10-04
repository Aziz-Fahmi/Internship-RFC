using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CVTechAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CVs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Candidat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Poste = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Competance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Formation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Langue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CV_URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Universites = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Niveau_d_etudes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Annees_d_experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Competences_et_Experiences_detectees = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pole = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CVs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CVs");
        }
    }
}
