
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace Models
{
    [Table("Sudija")]
    public class Sudija
    {
        [Key]
        public int id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; } 

        [MaxLength(200)]
        public string Iskustvo { get; set; } 

        [MaxLength(50)]
        public string Grad { get; set; } 
        
        [JsonIgnore]
        public List<Spoj> SudijaSlucaj { get; set; }
    }
}