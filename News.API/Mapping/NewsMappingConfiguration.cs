using AutoMapper;
using News.API.Dtos;

namespace News.API.Mappers
{
    public class NewsMappingConfiguration : Profile
    {
        public NewsMappingConfiguration() 
        {
            CreateMap<NewsDto, Models.News>()
                .ReverseMap();
        }
    }
}
