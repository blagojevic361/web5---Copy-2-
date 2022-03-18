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
    public class SudijaController : ControllerBase
    {   
        public SudContext Context { get; set;}
        public SudijaController(SudContext context)
        {
            Context = context;
        }
        [Route("PreuzmiSudije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSudije(){
            try{
                return Ok(await Context.Sudija.Select(p=> new {p.id, p.Ime,p.Prezime,p.Iskustvo}).ToListAsync());
            }
            catch (Exception e){
                return BadRequest(e);
            }
        }
        [Route("PreuzmiSudijee")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSudijee(){
            try{
                return Ok(await Context.Sudija.Select(p=> new {p.id, p.Ime,p.Prezime,p.Grad}).ToListAsync());
            }
            catch (Exception e){
                return BadRequest(e);
            }
        }
        [Route("PreuzmiSudiju/{ime}/{prezime}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiSudiju(string ime, string prezime){
            var sudije = Context.Sudija;
            var sudija = await sudije.Where(p => p.Ime==ime && p.Prezime==prezime).ToListAsync();
            return Ok(sudija); 
        }
        [Route("DodajSudiju/{Ime}/{Prezime}/{Iskustvo}")]
        [HttpPost]

        public async Task<ActionResult> DodajSudiju([FromBody] Sudija sudija){
            if(string.IsNullOrWhiteSpace(sudija.Ime) || sudija.Ime.Length > 50)
            {
                return BadRequest("Pogresno ime.");
            }
            if(string.IsNullOrWhiteSpace(sudija.Prezime) || sudija.Prezime.Length > 50)
            {
                return BadRequest("Pogresno prezime.");
            }
            
            try{

                Context.Sudija.Add(sudija);
                await Context.SaveChangesAsync();

                return Ok($"Sudija {sudija.Prezime} je dodat.");
            }
            catch (Exception e)
            {
                 return BadRequest(e.Message);
            }
        }
        [Route("IzbrisiSudiju/{ime}/{prezime}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiSudiju(string ime, string prezime){
            try{
                var sudija = Context.Sudija.Where(p => p.Ime == ime && p.Prezime == prezime).FirstOrDefault();
                if (sudija !=null)
                {
                string prez=sudija.Prezime;
                Context.Sudija.Remove(sudija);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisan sudija {prez}.");
                }
                else return BadRequest("Sudija nije pronadjen.");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("PromeniIskustvoSudije/{ime}/{prezime}/{iskustvo}")]
        [HttpPut]
        //[ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ActionResult> Promeni(string ime, string prezime, string iskustvo){
            try{
            var sudija = Context.Sudija.Where(p => p.Ime == ime && p.Prezime == prezime).FirstOrDefault();
            if (sudija.Iskustvo==iskustvo){
                return NotFound();
            }
            else if (sudija !=null){
                sudija.Iskustvo= iskustvo;
                await Context.SaveChangesAsync();
                return Ok($"Sudija {sudija.Prezime} sada ima novo iskustvo.");}
            else return BadRequest("Advokat nije pronadjen.");
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }
    
    }
}
