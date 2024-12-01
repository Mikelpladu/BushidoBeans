using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _service;

    public ProductController(ProductService service)
    {
        _service = service;
    }
  
  [HttpGet("Product_Details")]
  public async Task<ProductDto> GetProductDetailsAsync(long id)
  {
    return await _service.GetProductDetailsAsync(id);
  }

  [HttpGet("Filtered_Products")]
  public async Task<Catalog> GetFilteredProducts([FromQuery]Filter filter)
  {
    return await _service.GetFilteredProducts(filter);
  }

  [Authorize(Roles = "admin")]
  [HttpPut("Update_Product")]
  public async Task<ProductDto> UpdateProductAsync([FromQuery]Product product)
  {
      return await _service.UpdateProductDetailsAsync(product);
  }

  [Authorize(Roles = "admin")]
  [HttpPost("Create_Product")]
  public async Task<bool> CreateProductAsync([FromQuery]Product product)
  {
      
      return await _service.CreateProductAsync(product);
  }
    

  /*
  [HttpGet]
  public async Task<IEnumerable<ProductDto>> GetAllAsync()
  {
    return await _service.GetAllAsync();
  }
  
  [HttpGet("{id}")]
  public async Task<ProductDto> GetByIdAsync(long id)
  {
    return await _service.GetByIdAsync(id);
  }
  */
}