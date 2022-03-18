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
    public class SudController : ControllerBase
    {
        public SudContext Context { get; set; }

        public SudController(SudContext context)
        {
            Context = context;
        }

        
    }
}