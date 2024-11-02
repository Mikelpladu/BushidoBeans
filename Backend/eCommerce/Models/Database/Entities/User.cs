using Microsoft.EntityFrameworkCore;

namespace eCommerce.Models.Database.Entities;

[PrimaryKey(nameof(ID))]
[Index(nameof(Mail), IsUnique = true)]
public class User
{
    public long ID { get; set; }
    public string Mail { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public int Phone { get; set; }
    public string Admin { get; set; }

    public ICollection<Review> Reviews { get; set; }
    public Cart Cart { get; set; }
}