namespace AuthECAPI.Models
{
    public class ShopifyProductDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Vendor { get; set; }
        public string ProductType { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<ShopifyVariantDto> Variants { get; set; }
    }

    public class ShopifyVariantDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public int InventoryQuantity { get; set; }
    }
}
