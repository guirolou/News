using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using News.API.Data;
using News.API.Dtos;

namespace News.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly NewsDbContext _dbContext;

        public NewsController(IMapper mapper, NewsDbContext dbContext) 
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsDto>>> GetAll() 
        {
            var news = await _dbContext.News.Where(n => n.Deleted == null).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<NewsDto>>(news));
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody]NewsDto newsDto)
        {
            var news = _mapper.Map<Models.News>(newsDto);
            news.Modified = DateTime.UtcNow;
            await _dbContext.News.AddAsync(news);
            await _dbContext.SaveChangesAsync();
            return Created();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody]NewsDto newsDto)
        {
            if (id != newsDto.Id)
            {
                return BadRequest();
            }
            var news = _mapper.Map<Models.News>(newsDto);
            news.Modified = DateTime.UtcNow;
            _dbContext.Entry(news).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var newsToDelete = await _dbContext.News.FirstOrDefaultAsync(n => n.Id == id && n.Deleted == null);
            if (newsToDelete == null)
            {
                return BadRequest();
            }

            newsToDelete.Deleted = DateTime.UtcNow;
            _dbContext.Entry(newsToDelete).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
