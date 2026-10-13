using CampusEats.Api.Dtos;
using CampusEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusEats.Api.Controllers;

/// <summary>CRUD operations and category information for the CampusEats menu.</summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _svc;

    public MenuController(IMenuService svc) => _svc = svc;

    /// <summary>Get all menu items.</summary>
    /// <remarks>Returns every dish, including currently unavailable items.</remarks>
    /// <response code="200">The complete menu.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<MenuItemDto>), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<MenuItemDto>> GetAll() => Ok(_svc.GetAll());

    /// <summary>Get the supported menu categories.</summary>
    /// <remarks>Use one of these category names in POST and PUT requests.</remarks>
    /// <response code="200">All supported categories with descriptions.</response>
    [HttpGet("categories")]
    [ProducesResponseType(typeof(IEnumerable<MenuCategoryDto>), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<MenuCategoryDto>> GetCategories() => Ok(_svc.GetCategories());

    /// <summary>Get one menu item by ID.</summary>
    /// <response code="200">The requested menu item.</response>
    /// <response code="404">No menu item has the supplied ID.</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(MenuItemDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<MenuItemDto> GetById(int id)
    {
        var item = _svc.GetById(id);
        return item is null ? NotFound() : Ok(item);
    }

    /// <summary>Create a menu item.</summary>
    /// <remarks>The server assigns the ID. Category must be Mains, Snacks, Dessert, or Drinks.</remarks>
    /// <response code="201">The item was created.</response>
    /// <response code="400">The request body or category is invalid.</response>
    [HttpPost]
    [Consumes("application/json")]
    [ProducesResponseType(typeof(MenuItemDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<MenuItemDto> Create([FromBody] CreateMenuItemDto dto)
    {
        var created = _svc.Create(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>Replace an existing menu item.</summary>
    /// <response code="204">The item was updated.</response>
    /// <response code="400">The request body or category is invalid.</response>
    /// <response code="404">No menu item has the supplied ID.</response>
    [HttpPut("{id:int}")]
    [Consumes("application/json")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Update(int id, [FromBody] CreateMenuItemDto dto)
    {
        var ok = _svc.Update(id, dto);
        return ok ? NoContent() : NotFound();
    }

    /// <summary>Delete a menu item.</summary>
    /// <response code="204">The item was deleted.</response>
    /// <response code="404">No menu item has the supplied ID.</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(int id)
    {
        var ok = _svc.Delete(id);
        return ok ? NoContent() : NotFound();
    }
}
