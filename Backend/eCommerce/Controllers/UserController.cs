﻿using System.Security.Claims;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;
using eCommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eCommerce.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly UserService _service;

    public UserController(UserService service)
    {
        _service = service;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult> GetByIdAsync(long id)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debe iniciar sesión para llevar a cabo esta acción"});

        return Ok(await _service.GetByIdAsync(id));
    }

    [Authorize(Roles = "admin")]
    [HttpGet("Get_Users")]
    public async Task<ActionResult> GetAllAsync()
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debe iniciar sesión para llevar a cabo esta acción"});

        return Ok(await _service.GetAllAsync());
    }

    [Authorize(Roles = "admin")]
    [HttpPut("Update_User")]
    public async Task<ActionResult<UserDto>> UpdateAsync([FromBody]User user)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debes iniciar sesión para llevar a cabo esta acción"});

        return Ok(await _service.UpdateAsync(user));
    }

    [Authorize(Roles = "admin")]
    [HttpPut("Update_UserRole")]
    public async Task<ActionResult<UserDto>> UpdateUserRole([FromBody] HandleRole userRole)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debes iniciar sesión para llevar a cabo esta acción"});

        return Ok(await _service.UpdateRole(userRole));
    }


    [Authorize(Roles = "admin")]
    [HttpDelete("Delete_User/{id}")]
    public async Task<ActionResult<UserDto>> DeleteAsyncUser(long id)
    {
        Claim userClaimId = User.FindFirst("id");
        if (userClaimId == null) return Unauthorized(new {Message = "Debes iniciar sesión para llevar a cabo esta acción"});

        await _service.DeleteAsyncUserById(id);

        return NoContent();
    }
    
}