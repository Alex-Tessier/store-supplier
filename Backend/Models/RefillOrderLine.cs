namespace Backend.Models
{
    public class RefillOrderLine
    {
        public int Id { get; set; }
        public int RefillOrderId { get; set; }
        public required string Sku { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int UnitByCrate { get; set; }

        public RefillOrder? RefillOrder { get; set; }
        public SupplyerProduct? SupplyerProduct { get; set; }
    }
}
