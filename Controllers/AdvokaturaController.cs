using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AdvokaturaController : ControllerBase
    {
        public SudContext Context { get; set; }

        public AdvokaturaController(SudContext context)
        {
            Context = context;
        }

        /*[Route("Advokati")]
        [HttpGet]
        public async Task<ActionResult> VratiAdvokature()
        {
            try
            {
                return Ok(
                    await Context.Advokature.Include(advokatura => advokatura.Filmovi).ThenInclude(bf => bf.Film).ToListAsync());
                      
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }*/
    }
}