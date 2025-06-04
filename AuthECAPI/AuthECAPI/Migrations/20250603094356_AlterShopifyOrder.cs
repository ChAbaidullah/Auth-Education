using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthECAPI.Migrations
{
    /// <inheritdoc />
    public partial class AlterShopifyOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FulfillmentStatus",
                table: "ShopifyOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "ProductId",
                table: "ShopifyOrders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "ShopifyOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "ShopifyOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FulfillmentStatus",
                table: "ShopifyOrders");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ShopifyOrders");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "ShopifyOrders");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "ShopifyOrders");
        }
    }
}
