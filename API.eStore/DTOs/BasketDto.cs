﻿using System.Collections.Generic;

namespace API.eStore.DTOs
{
    public class BasketDto
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<BasketItemDto> Items { get; set; } = new();
    }

    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int Quantity { get; set; }
    }
}
