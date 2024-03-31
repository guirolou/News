namespace News.API.Dtos
{
    public class NewsDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
