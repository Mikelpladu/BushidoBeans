namespace eCommerce.Models.Dtos;

public class CartDto
{
   public long Id { get; set; }
   public List<CartProductDto> CartProducts { get; set; }
}