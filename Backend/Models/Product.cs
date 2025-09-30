using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public required string Sku { get; set; }
        public int Stock { get; set; }
        public int DesiredStock { get; set; }
        public int MinimumStock { get; set; }
        public int Status { get; set; }
        public bool IsEnabled { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public SupplyerProduct? SupplyerProduct { get; set; }
        public List<OrderLine> OrderLines { get; set; } = new();
    }
}
