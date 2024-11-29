using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class OrderProductMapper
{
  //TO DTO
   public OrderProductDto ToDto(OrderProduct orderProduct)
   {
       return new OrderProductDto
       {
           OrderId = orderProduct.OrderId,
           ProductId = orderProduct.ProductId,
           Image = orderProduct.Product.Image,
           Name = orderProduct.Product.Name,
           PurchasePrice = orderProduct.PurchasePrice,
           Quantity = orderProduct.Quantity
       };
   }
   public IEnumerable<OrderProductDto> ToDto(IEnumerable<OrderProduct> orderProducts)
   {
      return orderProducts.Select(ToDto);
   }
}
