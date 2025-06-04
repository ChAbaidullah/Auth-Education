namespace AuthECAPI.Models
{
    public class ShopifyCustomerDto
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool VerifiedEmail { get; set; }
        public string Phone { get; set; }
    }
}
