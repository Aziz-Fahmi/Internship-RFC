using System.ComponentModel.DataAnnotations;

namespace CVTechAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Role { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
