/*using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models{
    public class Advokatura{
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string ime{get; set;}

        [Required]
        [MaxLength(50)]
        public string mail{get; set;}

        public List<Slucaj> Slucajevi { get; set; }

        public List<Sudija> Sudije { get; set; }
        public List<Advokat> Advokati { get; set; }
    }
}*/