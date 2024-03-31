using Microsoft.EntityFrameworkCore;

namespace News.API.Data
{
    public class NewsDbContext : DbContext
    {
        public DbSet<Models.News> News { get; set; }

        public NewsDbContext(DbContextOptions<NewsDbContext> context) : base(context) { }
    }
}
