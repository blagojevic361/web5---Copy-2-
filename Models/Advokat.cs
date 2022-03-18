using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections;
using System.Collections.Generic;
namespace Models
{
    [Table("Advokat")]
    public class Advokat
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
       
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; }
        
        [Range(1,1000)]
        public int BrojKomore { get; set; }
        
        [MaxLength(100)]
        public string AdresaKancelarije { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Zvanje { get; set; }

        public List<Spoj> AdvokatSlucaj { get; set; }
    }
}