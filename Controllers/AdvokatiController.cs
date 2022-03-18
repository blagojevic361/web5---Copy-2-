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
    public class AdvokatiController : ControllerBase
    {   
        public SudContext Context { get; set;}
        public AdvokatiController(SudContext context)
        {
            Context = context;
        }
        [Route("PreuzmiAdvokate")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiAdvokate(){
            try{
                return Ok(await Context.Advokat.Select(p=> new {p.Id, p.Ime,p.Prezime,p.BrojKomore,p.AdresaKancelarije,p.Zvanje}).ToListAsync());
            }
            catch (Exception e){
                return BadRequest(e);
            }
        }
        [Route("Advokati/{id}")]
        [HttpGet]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> Preuzmi(string id){
            int idd = Int32.Parse(id);
            var slucajevi = Context.Spoj
            .Include(p => p.Advokat)
            
            .Include(p => p.Slucaj)
            .Include(p => p.Sudija)
            .Where(p=> p.Advokat.Id==idd);
            var slucaj = await slucajevi.ToListAsync();
            return Ok
            (
                    slucaj.Select(p =>
                    new{
                    Naziv=p.Slucaj.Naziv,
                    Sudija=p.Sudija.Ime + " " + p.Sudija.Prezime,
                    JavniTuzitelj=p.Slucaj.JavniTuzitelj,
                    Advokat=p.Advokat.Ime + " " + p.Advokat.Prezime
                    }).ToList()
            );
        }
        
        [Route("DodajAdvokata/{ime}/{prezime}/{brKomore}/{adresaKancelarije}/{zvanje}")]
        [HttpPost]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> DodajAvokata([FromBody] Advokat advokat){
            if(advokat.BrojKomore <0)
            {
                return BadRequest("Pogresan broj komore.");
            }
            if(string.IsNullOrWhiteSpace(advokat.Ime) || advokat.Ime.Length > 50)
            {
                return BadRequest("Pogresno ime.");
            }
            if(string.IsNullOrWhiteSpace(advokat.Prezime) || advokat.Prezime.Length > 50)
            {
                return BadRequest("Pogresno prezime.");
            }
            
            try{
                Context.Advokat.Add(advokat);
                await Context.SaveChangesAsync();
                return Ok($"Advokat {advokat.Prezime} je dodat.");
            }
            catch (Exception e)
            {
                 return BadRequest(e.Message);
            }
        }
        [Route("PromeniZvanjeAdvokata/{ime}/{prezime}/{zvanje}")]
        [HttpPut]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> Promeni(string ime, string prezime, string zvanje){
            try{
            var advokat = Context.Advokat.Where(p => p.Ime == ime && p.Prezime == prezime).FirstOrDefault();
            if (advokat.Zvanje==zvanje){
                return NotFound();
            }
            else if (advokat !=null){
                advokat.Zvanje= zvanje;
                await Context.SaveChangesAsync();
                return Ok($"Advokat {advokat.Prezime} sada ima novo zvanje.");}
            else return BadRequest("Advokat nije pronadjen.");
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("PromenaFromBody")]
        [HttpPut]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> PromeniBody([FromBody] Advokat advokat){
            if(string.IsNullOrWhiteSpace(advokat.Ime) || advokat.Ime.Length > 50)
            {
                return BadRequest("Pogresno prezime.");
            }
            if(string.IsNullOrWhiteSpace(advokat.Prezime) || advokat.Prezime.Length > 50)
            {
                return BadRequest("Pogresno prezime.");
            }
            if(advokat.BrojKomore <0)
            {
                return BadRequest("Pogresan broj komore.");
            }
            try{
                var advokatZaPromenu = await Context.Advokat.FindAsync(advokat.Id);
                advokatZaPromenu.Ime= advokat.Ime;
                advokatZaPromenu.Prezime = advokat.Prezime;
                advokatZaPromenu.BrojKomore = advokat.BrojKomore;
                advokatZaPromenu.AdresaKancelarije = advokat.AdresaKancelarije;
                advokatZaPromenu.Zvanje = advokat.Zvanje;

                await Context.SaveChangesAsync();
                return Ok($"Advokat sa ID: {advokatZaPromenu.Id} je uspesno izmenjen.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiAdvokata/{ime}/{prezime}")]
        [HttpDelete]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> Izbrisi(string ime, string prezime){
            try{
                var advokat = Context.Advokat.Where(p => p.Ime == ime && p.Prezime == prezime).FirstOrDefault();
                if (advokat !=null)
                {
                string prez=advokat.Prezime;
                Context.Advokat.Remove(advokat);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisan advokat {prez}.");
                }
                else return BadRequest("Advokat nije pronadjen.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}
