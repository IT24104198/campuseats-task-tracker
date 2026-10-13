using CampusEats.Api.Models;

namespace CampusEats.Api.Dtos;

/// <summary>A menu item returned by the CampusEats API.</summary>
public sealed class MenuItemDto
{
    /// <summary>Server-generated unique identifier.</summary>
    public int Id { get; init; }

    /// <summary>Display name of the dish.</summary>
    public required string Name { get; init; }

    /// <summary>Price in Sri Lankan rupees.</summary>
    public decimal Price { get; init; }

    /// <summary>Menu category.</summary>
    public MenuCategory Category { get; init; }

    /// <summary>Whether customers can currently order the item.</summary>
    public bool Available { get; init; }

    /// <summary>Customer-facing description of the dish.</summary>
    public required string Description { get; init; }
}
