namespace News.API.Models
{
    public class News
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime? Deleted { get; set; }
        public DateTime? Modified { get; set;}
    }
}
