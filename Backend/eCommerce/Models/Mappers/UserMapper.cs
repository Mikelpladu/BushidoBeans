using System;
using eCommerce.Models.Database.Entities;
using eCommerce.Models.Dtos;

namespace eCommerce.Models.Mappers;

public class UserMapper
{
  //Mapea los datos de un Usuario al DTO de Usuario
  public UserDto ToDto(User user) {
    return new UserDto() {
      ID = user.ID,
      Mail = user.Mail,
      Name = user.Name,
      Surname = user.Surname,
      Phone = user.Phone,
      Admin = user.Admin
    };
  }

  //Mapea los datos de todos los Usuarios al DTO de Usuario
  public IEnumerable<UserDto> ToDto(IEnumerable<User> users) {
    return users.Select(ToDto);
  }

//Mapea los datos de un DTO de usuario a la entidad Usuario
  public User ToEntity(UserDto user) {
    return new User() {
      ID = user.ID,
      Mail = user.Mail,
      Name = user.Name,
      Surname = user.Surname,
      Phone = user.Phone,
      Admin = user.Admin 
    };
  }

//Mapea los datos de todos los DTO de usuario a la entidad Usuario
  public IEnumerable<User> ToEntity(IEnumerable<UserDto> users) {
    return users.Select(ToEntity);
  }
}