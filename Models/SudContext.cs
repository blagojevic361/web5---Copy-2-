using Microsoft.EntityFrameworkCore;
namespace Models
{
    public class SudContext : DbContext
    {
        public DbSet<Advokat> Advokat { get; set; }
        public DbSet<Sudija> Sudija { get; set; }
        public DbSet<Slucaj> Slucaj { get; set; }
        public DbSet<Spoj> Spoj { get; set; }
        /*public DbSet<Advokatura> Advokature { get; set; }*/

        //public DbSet<AdovkaturaAdvokat> AdvokaturaAdvokati{get; set;}
        public SudContext(DbContextOptions options) : base(options){
        }
    
    }
}