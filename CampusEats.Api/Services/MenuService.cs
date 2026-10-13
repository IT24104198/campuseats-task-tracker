using CampusEats.Api.Dtos;
using CampusEats.Api.Models;

namespace CampusEats.Api.Services;

public class MenuService : IMenuService
{
    private readonly List<MenuItem> _items;
    private int _nextId;

    public MenuService() // seed in-memory data
    {
        _items = new()
        {
            new() { Id = 1, Name = "Kottu Roti", Price = 750m, Category = MenuCategory.Mains, Available = true,
                Description = "Shredded roti stir-fried with egg, vegetables, and a blend of spices." },
            new() { Id = 2, Name = "Fried Rice", Price = 850m, Category = MenuCategory.Mains, Available = true,
                Description = "Wok-tossed rice with mixed vegetables, egg, and soy sauce." },
            new() { Id = 3, Name = "Veg Sub", Price = 600m, Category = MenuCategory.Snacks, Available = false,
                Description = "A toasted sub roll with fresh vegetables, cheese, and tangy sauce." },
            new() { Id = 4, Name = "Watalappan", Price = 350m, Category = MenuCategory.Dessert, Available = true,
                Description = "Traditional Sri Lankan coconut custard with jaggery and cardamom." },
            new() { Id = 5, Name = "Iced Milo", Price = 300m, Category = MenuCategory.Drinks, Available = true,
                Description = "Cold, chocolatey Milo served over ice." },
        };
        _nextId = 6;
    }

    private static MenuItemDto ToDto(MenuItem m) => new()
    {
        Id = m.Id,
        Name = m.Name,
        Price = m.Price,
        Category = m.Category,
        Available = m.Available,
        Description = m.Description
    };

    public IEnumerable<MenuCategoryDto> GetCategories() =>
    [
        new() { Name = MenuCategory.Mains, Description = "Full meals suitable for lunch or dinner." },
        new() { Name = MenuCategory.Snacks, Description = "Light bites and quick food between classes." },
        new() { Name = MenuCategory.Dessert, Description = "Sweet dishes served after a meal." },
        new() { Name = MenuCategory.Drinks, Description = "Cold and hot beverages." }
    ];

    public IEnumerable<MenuItemDto> GetAll() =>
        _items.Select(ToDto);

    public MenuItemDto? GetById(int id)
    {
        var m = _items.FirstOrDefault(x => x.Id == id);
        return m is null ? null : ToDto(m);
    }

    public MenuItemDto Create(CreateMenuItemDto dto)
    {
        var item = new MenuItem
        {
            Id = _nextId++,
            Name = dto.Name,
            Price = dto.Price,
            Category = dto.Category,
            Available = dto.Available,
            Description = dto.Description
        };
        _items.Add(item);
        return ToDto(item);
    }

    public bool Update(int id, CreateMenuItemDto dto)
    {
        var m = _items.FirstOrDefault(x => x.Id == id);
        if (m is null) return false; // guard clause
        m.Name = dto.Name; // replaces the editable fields
        m.Price = dto.Price;
        m.Category = dto.Category;
        m.Available = dto.Available;
        m.Description = dto.Description;
        return true;
    }

    public bool Delete(int id)
    {
        var m = _items.FirstOrDefault(x => x.Id == id);
        if (m is null) return false;
        _items.Remove(m);
        return true;
    }
}
