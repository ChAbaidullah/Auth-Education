using System;
using System.ComponentModel.DataAnnotations;

namespace AuthECAPI.Models
{
    public class ShopifyOrder
    {
        [Key]
        public int Id { get; set; }

        public long OrderNumber { get; set; }

        public string LineItemsJson { get; set; } // Store line items as JSON string

        public DateTime CreatedAt { get; set; }

        public decimal TotalPrice { get; set; }

        public decimal TotalDiscount { get; set; }

        public string FinancialStatus { get; set; }
        public string FulfillmentStatus { get; set; }
        public string ProductName { get; set; }
        public long ProductId { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; } = "active"; // 'active' or 'inactive'
    }
}
