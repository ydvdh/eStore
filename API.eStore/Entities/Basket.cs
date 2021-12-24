using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace API.eStore.Entities
{
    public class Basket
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if(Items.All(product=>product.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product=product,Quantity=quantity});
            }
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if(existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quatilty)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if(item == null) return;
            item.Quantity -= quatilty;
            if(item.Quantity == 0) Items.Remove(item);
        }
    }

    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}
