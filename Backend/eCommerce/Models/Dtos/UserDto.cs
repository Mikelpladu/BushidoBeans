namespace eCommerce.Models.Dtos;

public class UserDto
{
  public required long Id {get; set;}
  public required string Mail {get; set;}
  public required string Name {get; set;}
  public string Surname {get; set;}
  public required string Role {get;set;}
  public int Phone {get; set;}

  public List<AddressDto> Addresses { get; set; } = [];
  public List<OrderDto> Orders { get; set; } = [];
}
