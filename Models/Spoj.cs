using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace Models{
    public class Spoj
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Klijent { get; set; }
        public Slucaj Slucaj { get; set; }
        [JsonIgnore]
        public Advokat Advokat { get; set; }

        public Sudija Sudija { get; set; }
    }
}