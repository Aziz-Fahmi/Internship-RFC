using Microsoft.EntityFrameworkCore;

namespace CVTechAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<CV> CVs => Set<CV>();
    }
}
