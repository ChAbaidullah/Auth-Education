using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using AuthECAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections;


namespace AuthECAPI.Services;

public class ShopifyService
{
    private readonly HttpClient _httpClient;
    private readonly string _accessToken = "";
    private readonly string _storeUrl = "https://2bw40w-q2.myshopify.com";

    public ShopifyService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.Add("X-Shopify-Access-Token", _accessToken);
    }

    public async Task<string> GetProductsAsync()
    {
        var endpoint = $"{_storeUrl}/admin/api/2024-04/products.json";
        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetOrdersAsync()
{
    // Shopify only allows top-level order fields in 'fields' parameter.
    // To get product info, include 'line_items' as a whole.
    var endpoint = $"{_storeUrl}/admin/api/2024-04/orders.json?fields=order_number,created_at,total_price,current_total_discounts,financial_status,line_items";

    var response = await _httpClient.GetAsync(endpoint);
    response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
}


    public async Task<string> GetCustomersAsync()
    {
        var endpoint = $"{_storeUrl}/admin/api/2024-04/customers.json";
        var response = await _httpClient.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}
