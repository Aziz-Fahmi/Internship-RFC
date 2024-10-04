using Azure.Messaging;
using CVTechAPI.Context;
using CVTechAPI.Data;
using CVTechAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CVTechAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authcontext;
        public UserController(AppDbContext appDbContext)
        {
            _authcontext = appDbContext;
        }
        [HttpPost("authenticate")]

        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();


            var user = await _authcontext.Users
                .FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password== userObj.Password);
            if (user == null)
                return NotFound(new { Message = "Pseudo ou mot de passe incorrecte!" });


            return Ok(new
            {
                Message = "Authentification réussite!", 
                Role=user.Role
            });
        }




        [HttpPost("register")]

        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            await _authcontext.Users.AddAsync(userObj);
            await _authcontext.SaveChangesAsync();
            return Ok(new
            {
                Message ="Utilisateur ajouté!"
               
            });
                
        }


        }
}
