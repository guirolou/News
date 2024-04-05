using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using News.API.Data;
using News.API.Middleware;

var customOrigins = "CustomOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddCors(options =>
{
        var origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>();
    options.AddPolicy(customOrigins,
        policy =>
        {
            policy.WithOrigins(origins)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<NewsDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database"))
);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<TimeLogMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

using (var scope = app.Services.CreateScope())
{
    NewsDbContext context = scope.ServiceProvider.GetRequiredService<NewsDbContext>();
    context.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseCors(customOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
