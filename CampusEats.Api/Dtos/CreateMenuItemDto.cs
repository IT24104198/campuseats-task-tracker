using System.ComponentModel.DataAnnotations;
using CampusEats.Api.Models;

namespace CampusEats.Api.Dtos;

/// <summary>Details used to create or replace a menu item.</summary>
public sealed class CreateMenuItemDto
{
    /// <summary>Display name of the dish.</summary>
    [Required, StringLength(80)]
    public required string Name { get; init; }

    /// <summary>Price in Sri Lankan rupees.</summary>
    [Range(0.01, 100000)]
    public decimal Price { get; init; }

    /// <summary>One of: Mains, Snacks, Dessert, or Drinks.</summary>
    [Required, EnumDataType(typeof(MenuCategory))]
    public required MenuCategory Category { get; init; }

    /// <summary>Short customer-facing description of the dish.</summary>
    [Required, StringLength(300)]
    public required string Description { get; init; }

    /// <summary>Whether customers can currently order the item.</summary>
    public bool Available { get; init; } = true;
}
