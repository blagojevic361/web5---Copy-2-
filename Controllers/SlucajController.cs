using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlucajController : ControllerBase
    {   
        public SudContext Context { get; set;}
        public SlucajController(SudContext context)
        {
            Context = context;
        }
        [Route("PreuzmiSlucaj")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSlucajeve(){
            try{
                return Ok(await Context.Slucaj.Select(p=> new {p.Id, p.Naziv,p.Organizacija,p.JavniTuzitelj,p.PrvaSednica,p.KlasaVaznosti}).ToListAsync());
            }
            catch (Exception e){
                return BadRequest(e);
            }
        }
        [Route("PreuzmiSlucajIme/{Naziv}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSlucaj(string Naziv){
            var slucajevi = Context.Slucaj;
            var slucaj = await slucajevi.Where(p => p.Naziv==Naziv).ToListAsync();
            return Ok(slucaj);
        }
        [Route("Slucajevi/{id}")]
        [HttpGet]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> Preuzmi(string id){
            int idd = Int32.Parse(id);
            var slucajevi = Context.Spoj
            .Include(p => p.Sudija)
            .Include(p => p.Slucaj)
            .Where(p=> p.Sudija.id==idd);
            var slucaj = await slucajevi.ToListAsync();
            return Ok
            (
                
                    slucaj.Select(p =>
                    new{
                    Naziv=p.Slucaj.Naziv,
                    Organizacija=p.Slucaj.Organizacija,
                    Sudija=p.Sudija.Ime + " " + p.Sudija.Prezime

                    }).ToList()
            );
        }
        [Route("PreuzmiSlucajKlasa/{KlasaVaznosti}")]
        [HttpGet]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> PreuzmiSlucajKlasa(int KlasaVaznosti){
            var slucajevi= Context.Slucaj;
            var slucaj = await slucajevi.Where(p=> p.KlasaVaznosti==KlasaVaznosti).ToListAsync();
            return Ok(slucaj);
        }
 
        [Route("DodajSlucaj")]
        [HttpPost]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> DodajSlucaj([FromBody] Slucaj slucaj){
            if(string.IsNullOrWhiteSpace(slucaj.Naziv) || slucaj.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv.");
            }
            if(string.IsNullOrWhiteSpace(slucaj.Organizacija) || slucaj.Organizacija.Length > 50)
            {
                return BadRequest("Pogresna organizacija.");
            }
            if(string.IsNullOrWhiteSpace(slucaj.JavniTuzitelj) || slucaj.JavniTuzitelj.Length > 50)
            {
                return BadRequest("Pogresan javni tuzitelj.");
            }
            try{
                Context.Slucaj.Add(slucaj);
                await Context.SaveChangesAsync();
                return Ok($"Slucaj {slucaj.Naziv} je dodat.");
            }
            catch (Exception e)
            {
                 return BadRequest(e.Message);
            }
        } 
        [Route("IzbrisiSlucaj/{Naziv}")]
        [HttpDelete]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> IzbrisiSlucaj(string Naziv){
            try{
                var slucaj = Context.Slucaj.Where(p => p.Naziv == Naziv).FirstOrDefault();
                if (slucaj!=null)
                {
                string naz=slucaj.Naziv;
                Context.Slucaj.Remove(slucaj);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisan slucaj {naz}.");
                }
                else return BadRequest("Slucaj nije pronadjen.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}
