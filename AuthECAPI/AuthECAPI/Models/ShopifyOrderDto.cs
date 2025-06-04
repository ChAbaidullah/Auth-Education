namespace AuthECAPI.Models
{
    public class ShopifyOrderDto
    {
        public long OrderNumber { get; set; }
        public string ProductTitle { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public string TotalPrice { get; set; }
        public string DiscountedPrice { get; set; }
        public string FinancialStatus { get; set; }
    }
}
