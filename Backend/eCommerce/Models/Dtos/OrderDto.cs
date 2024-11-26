using System;

namespace eCommerce.Models.Dtos;

public class OrderDto
{
  public long Id { get; set; }
  public decimal TotalPrice { get; set; }
  public DateTime PurchaseDate { get; set; }
  public List<CartProductDto> CartProducts { get; set; }

  public long UserId { get; set; }
}
