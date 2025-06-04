using Microsoft.AspNetCore.Mvc;
using AuthECAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AuthECAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopifyOrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShopifyOrdersController(AppDbContext context)
        {
            _context = context;
        }

        // Next step: we'll add the POST method to save orders
        [HttpPost("save")]
        public async Task<IActionResult> SaveOrders([FromBody] List<ShopifyOrder> orders)
        {
            if (orders == null || !orders.Any())
            {
                return BadRequest("No orders received.");
            }

            foreach (var order in orders)
            {
                var existingOrder = await _context.ShopifyOrders
                    .FirstOrDefaultAsync(o => o.OrderNumber == order.OrderNumber);

                if (existingOrder == null)
                {
                    _context.ShopifyOrders.Add(order);
                }
                else
                {
                    // Update existing order (status, financial status, etc.)
                    existingOrder.Status = order.Status;
                    existingOrder.FinancialStatus = order.FinancialStatus;
                    existingOrder.TotalPrice = order.TotalPrice;
                    existingOrder.TotalDiscount = order.TotalDiscount;
                    existingOrder.CreatedAt = order.CreatedAt;
                    existingOrder.LineItemsJson = order.LineItemsJson;
                    existingOrder.FulfillmentStatus=order.FulfillmentStatus;
                    existingOrder.ProductName = order.ProductName;
                    existingOrder.ProductId= order.ProductId;
                    existingOrder.Quantity = order.Quantity;
                }
            }

            await _context.SaveChangesAsync();
            return Ok("Orders saved/updated successfully.");
        }
        [HttpGet("get")]
        public ActionResult<List<ShopifyOrder>> GetOrders()
        {
            var data = _context.ShopifyOrders
                .Where(x => x.Status == "active")
                .ToList();

            return data; 
        }
        [HttpGet("getinactive")]
        public ActionResult<List<ShopifyOrder>> GetOrdersinactive()
        {
            var data = _context.ShopifyOrders
                .Where(x => x.Status == "inactive")
                .ToList();

            return data;
        }
        public class statusupdate{
           public int Id {get;set;}
        }
        [HttpPost("inactive")]
        public ActionResult<List<ShopifyOrder>> ChangeStatus(statusupdate input)
        {
            var statusupdate = _context.ShopifyOrders.Find(input.Id);
           statusupdate.Status = "inactive";
            _context.ShopifyOrders.Update(statusupdate);
            _context.SaveChanges();
            return Ok();
        }

    }
}
