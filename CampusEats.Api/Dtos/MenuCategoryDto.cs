using CampusEats.Api.Models;

namespace CampusEats.Api.Dtos;

/// <summary>A supported menu category and its purpose.</summary>
public sealed class MenuCategoryDto
{
    /// <summary>Category value used in menu item requests.</summary>
    public MenuCategory Name { get; init; }

    /// <summary>Human-readable explanation of the category.</summary>
    public required string Description { get; init; }
}
