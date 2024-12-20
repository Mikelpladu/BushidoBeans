using eCommerce.Models.Database.Entities;
using eCommerce.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace eCommerce.Models.Dtos;

public class ReviewDto
{
    public long Id { get; set; }
    public required int Score { get; set; }
    public string Body { get; set; }
    public DateTime PubliDate { get; set; }
    
    public long ProductId { get; set; }
    public long UserId { get; set; }
    public string UserName { get; set; }
}