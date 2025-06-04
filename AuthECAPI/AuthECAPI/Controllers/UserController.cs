using AuthECAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize] // Uncomment if you want to restrict access
    public class UsersController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;

        public UsersController(UserManager<AppUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // GET: api/users
        [HttpGet ("getlist")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _userManager.Users.ToListAsync();
        }

        // GET: api/users/{id}
        
        [HttpGet("getbyId/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // POST: api/users
        [HttpPost ("CreateUser")]
        public async Task<ActionResult<AppUser>> CreateUser(AppUser user)
        {
            var result = await _userManager.CreateAsync(user, "TempPassword123!"); // Set password appropriately
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/{id}
        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(string id, AppUser updatedUser)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            user.FullName = updatedUser.FullName;
            user.Email = updatedUser.Email;
            user.UserName = updatedUser.UserName;
            user.Gender = updatedUser.Gender;
            user.DOB = updatedUser.DOB;
            user.LibraryID = updatedUser.LibraryID;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound();

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return NoContent();
        }
    }
}
