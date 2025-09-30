using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public int Status { get; set; }
        public decimal TotalAmount { get; set; }

        public User? User { get; set; }
        public List<OrderLine> OrderLines { get; set; } = new();
    }
}
