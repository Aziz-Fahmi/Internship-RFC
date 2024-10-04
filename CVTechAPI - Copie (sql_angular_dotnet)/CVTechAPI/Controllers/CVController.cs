using CVTechAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CVTechAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CVController : ControllerBase
    {
        private readonly DataContext _context;
        public CVController(DataContext context) {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<CV>>> GetCVs()
        {
            return Ok(await _context.CVs.ToListAsync());
        
        }

        [HttpPost]
        public async Task<ActionResult<List<CV>>> CreateCV(CV cv)
        {
            _context.CVs.Add(cv);
            await _context.SaveChangesAsync();

            return Ok(await _context.CVs.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<CV>>> UpdateCV(CV cv)
        {
            var dbCV = await _context.CVs.FindAsync(cv.Id);
            if (dbCV == null)
                return BadRequest("CV non trouvé.");

            dbCV.Candidat = cv.Candidat;
            dbCV.Poste = cv.Poste;
            dbCV.Mail = cv.Mail;
            dbCV.Tel = cv.Tel;
            dbCV.Experience = cv.Experience;
            dbCV.Competance = cv.Competance;
            dbCV.Formation = cv.Formation;
            dbCV.Langue = cv.Langue;
            dbCV.CV_URL = cv.CV_URL;
            dbCV.Universites = cv.Universites;
            dbCV.Niveau_d_etudes = cv.Niveau_d_etudes;
            dbCV.Annees_d_experience = cv.Annees_d_experience;
            dbCV.Competences_et_Experiences_detectees = cv.Competences_et_Experiences_detectees;
            dbCV.Pole = cv.Pole;

            await _context.SaveChangesAsync();

            return Ok(await _context.CVs.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<CV>>> DeleteCV(int id)
        {
            var dbCV = await _context.CVs.FindAsync(id);
            if (dbCV == null)
                return BadRequest("cv non trouvé.");

            _context.CVs.Remove(dbCV);
            await _context.SaveChangesAsync();

            return Ok(await _context.CVs.ToListAsync());
        }
    }
}
