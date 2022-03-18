using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Slucaj")]
    public class Slucaj
    {
        [Key]
        public int Id { get; set; }
       
        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }
       
        [Required]
        [MaxLength(50)] 
        public string Organizacija { get; set; }

        [Required]
        [MaxLength(100)] 
        public string JavniTuzitelj { get; set; }

        [MaxLength(50)]
        public string PrvaSednica { get; set; } 

        [Range(1, 5)]
        public int KlasaVaznosti { get; set; }
        [JsonIgnore]
        public List<Spoj> SlucajAdvokat { get; set; }
    }
}