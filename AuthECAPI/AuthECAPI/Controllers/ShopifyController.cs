using AuthECAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Threading.Tasks;

[ApiController]
[Route("api/shopify")]
public class ShopifyController : ControllerBase
{
    private readonly ShopifyService _shopifyService;

    public ShopifyController(ShopifyService shopifyService)
    {
        _shopifyService = shopifyService;
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetProducts()
    {
        var data = await _shopifyService.GetProductsAsync();
        return Content(data, "application/json");
    }

    [HttpGet("orders")]
    public async Task<IActionResult> GetOrders()
    {
        try
        {
            var data = await _shopifyService.GetOrdersAsync();
            //var arrayList = JsonConvert.DeserializeObject<ArrayList>(data);

            return Content(data, "application/json");
        }
        catch (Exception ex)
        {
            return Content("");
        }
    }

    [HttpGet("customers")]
    public async Task<IActionResult> GetCustomers()
    {
        var data = await _shopifyService.GetCustomersAsync();
        return Content(data, "application/json");
    }
}
