using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class RefillOrder
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public int Status { get; set; }
        public decimal OrderTotal { get; set; }

        public List<RefillOrderLine> RefillOrderLines { get; set; } = new();
    }
}
