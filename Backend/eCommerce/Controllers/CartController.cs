﻿using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


namespace eCommerce.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [Authorize]
        [HttpGet("Get_Cart")]
        public async Task<CartDto> GetCartByIdAsync(long id)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) Unauthorized("Usuario no autorizado");

            return await _cartService.GetCartAsync(id);

        }


        [Authorize]
        [HttpPut("Update_CartProduct")]
        public ActionResult<CartProduct> UpdateCart([FromQuery] CartProduct cartProduct)
        {

            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) Unauthorized("Usuario no autorizado");

            if (cartProduct == null) return BadRequest("Datos del producto no válidos.");

            return  Ok (_cartService.UpdateCartProductAsync(cartProduct));
        }

        [Authorize]
        [HttpDelete("Delete_CartProduct")]
        public async Task<ActionResult> DeleteCartProduct([FromQuery] CartProduct cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) Unauthorized("Usuario no autorizado");

            try
            {
                await _cartService.DeleteCartProduct(cartProduct); 
            }
            catch (Exception)
            {
                return BadRequest("El item ha eliminar no existe en la base de datos");
            }
            
            return NoContent();
        }

        [Authorize]
        [HttpGet("Update_GlobalCart")]
        public async Task<List<CartProduct>> GetCartAsync([FromQuery]List<CartProduct> cartProduct)
        {
            Claim userClaimId = User.FindFirst("id");

            if (userClaimId == null) Unauthorized("Usuario no autorizado");

            await _cartService.UpdateCartProductsAsync(cartProduct);
            return cartProduct;
            
        }
    }
}
