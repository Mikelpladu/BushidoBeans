using eCommerce.Controllers;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Models.Mappers;

namespace eCommerce.Services;

public class CartService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly CartMapper _cartMapper;

    public CartService(UnitOfWork unitOfWork, CartMapper cartMapper)
    {
        _unitOfWork = unitOfWork;
        _cartMapper = cartMapper;
    }

    public async Task<CartDto> GetCartAsync(long cartId)
    {
        Cart cart = await _unitOfWork.CartRepository.GetByIdAsync(cartId);
        return _cartMapper.ToDto(cart);
    }

    //public async Task<Cart> AddToCartAsync(long userId, long productId, int quantity)
    //{
    //    var cart = await GetCartAsync(userId);

    //    if (cart == null)
    //    {
    //        cart = new Cart
    //        {
    //            Id = userId,
    //            CartProducts = new List<CartProduct>()
    //        };
    //       //_unitOfWork.CartRepository.Add(cart);
    //    }

    //    var product = await _unitOfWork.ProductRepository.GetByIdAsync(productId);

    //    if (product == null)
    //    {
    //        throw new Exception("Producto no encontrado");
    //    }

    //    var existingItem = cart.CartProducts.FirstOrDefault(cp => cp.ProductId == productId);

    //    if (existingItem != null)
    //    {
    //        existingItem.Quantity += quantity;
    //    }
    //    else
    //    {
    //        cart.CartProducts.Add(new CartProduct
    //        {
    //            CartId = cart.Id,
    //            ProductId = productId,
    //            Quantity = quantity
    //        });
    //    }

    //    await _unitOfWork.SaveAsync();
    //    return cart;
    //}

    public async Task<CartProduct> UpdateCartItemsAsync(CartProduct cartProduct)
    {
        var cart = await _unitOfWork.CartRepository.GetByIdAsync(cartProduct.CartId);
        if (cart == null)
        {
            throw new Exception("Carrito no encontrado.");
        }

        bool existe = await _unitOfWork.CartProductRepository.ExistAsync(cartProduct.CartId, cartProduct.ProductId);

        if (!existe)
        {
            await _unitOfWork.CartProductRepository.InsertAsync(cartProduct);
        }
        else
        {
            _unitOfWork.CartProductRepository.Update(cartProduct);
        }

        await _unitOfWork.SaveAsync();
        return cartProduct;
    }


    public async void DeleteCartProduct(CartProduct cartProduct)
    {

        if (await _unitOfWork.CartProductRepository.ExistAsync(cartProduct.CartId, cartProduct.ProductId))
        {
            _unitOfWork.CartProductRepository.Delete(cartProduct);
        }
        else
        {
            throw new Exception("Producto no encontrado");
        }

    }

}



