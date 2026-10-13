using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter(allowIntegerValues: false)));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CampusEats Menu API",
        Version = "v1",
        Description = "Production-ready CampusEats REST API with CORS and environment configuration."
    });
});

// Configure CORS for deployed frontend (Task 03)
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(
            "https://campuseats-web.vercel.app",
            "https://campuseats-dashboard.vercel.app",
            "http://localhost:5173",
            "http://localhost:4173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<CampusEats.Api.Services.IMenuService, CampusEats.Api.Services.MenuService>();

var app = builder.Build();

// Enable Swagger in both development and production for verification (Task 03 / Task 05)
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "CampusEats Menu API v1");
    options.RoutePrefix = "swagger";
});

// Enable CORS policy before MapControllers
app.UseCors("Frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
