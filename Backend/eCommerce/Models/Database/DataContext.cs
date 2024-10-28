using System;
using eCommerce.Models.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;

namespace eCommerce.Models.Database;

public class DataContext : DbContext
{
  private const string DATABASE_PATH = "BushidoDB.db";

  //Entidades (tablas)
  public DbSet<User> Users {get; set;}

  //Configuración del Entity Framework para la creación del archivo de BDD Sqlite
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
      string baseDir = AppDomain.CurrentDomain.BaseDirectory;
      optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
  }
}