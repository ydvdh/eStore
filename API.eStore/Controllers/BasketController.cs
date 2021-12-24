using API.eStore.Data;
using API.eStore.DTOs;
using API.eStore.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.eStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ApiBaseController
    {
        private readonly StoreContext _storeContext;

        public BasketController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrivedBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrivedBasket();
            //create basket
            if (basket == null) basket = CreateBasket();
            //get product
            var product = await _storeContext.Products.FindAsync(productId);
            if (product == null) return NotFound();
            //add item
            basket.AddItem(product, quantity);
            //save product
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction("GetBasket", MapBasketToDto(basket));
            return BadRequest( new ProblemDetails {Title="Problem in saving item to basket"});
        }

       [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrivedBasket();
            if (basket == null) return NotFound();
            //remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            //save change
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result) Ok();
            return BadRequest(new ProblemDetails { Title = "Problem Removing item to basket" });
        }

        private async Task<Basket> RetrivedBasket()
        {
            return await _storeContext.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOPtions = new CookieOptions { IsEssential = true, Expires= DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOPtions);
            var basket = new Basket { BuyerId = buyerId };
            _storeContext.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                }).ToList()
            };
        }
    }
}
