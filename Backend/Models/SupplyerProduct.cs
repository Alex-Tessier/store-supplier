using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class SupplyerProduct
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public int UnitByCrate { get; set; }
        public required string Sku { get; set; }
        public int Stock { get; set; }
        public int Status { get; set; }
        public bool IsEnabled { get; set; } = true;
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public List<RefillOrderLine> RefillOrderLines { get; set; } = new();
        public List<Product> Products { get; set; } = new();
    }
}
