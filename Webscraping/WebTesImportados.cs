﻿using System.Diagnostics;
using System.Linq;
using System.Text;
using Microsoft.Playwright;

namespace WebScraping;
public class WebTesImportados {
    public static async Task<List<Product>> Scraping() {
        // Necesario para instalar los navegadores
        Microsoft.Playwright.Program.Main(["install"]);
        using IPlaywright playwright = await Playwright.CreateAsync();
        BrowserTypeLaunchOptions options = new BrowserTypeLaunchOptions() {
            Headless = false // Se indica falso para poder ver el navegador
        };
        await using IBrowser browser = await
        playwright.Chromium.LaunchAsync(options);
        await using IBrowserContext context = await browser.NewContextAsync();
        IPage page = await context.NewPageAsync();
        // Ir a la página del vendedor
        await page.GotoAsync("https://www.asianfoodlovers.com/en/products/drinks-juices-alcohol/drinks-juices/iced-tea?query=:position:allCategories:B2C_3_0039:priceFacet:€0%20-%20€5");

        // Recorremos la lista de productos y recolectamos los datos
        List<Product> products = new List<Product>();
        IReadOnlyList<IElementHandle> productElements = await
        page.QuerySelectorAllAsync("div div.c-facet-lister__item");
        
        //Sustituimos el foreach por un for para limitarlo a 10 productos
        
        /*
        foreach (IElementHandle productElement in productElements) {
            try {
                Product product = await GetProductAsync(productElement);
                products.Add(product);
                Console.WriteLine(product);
            }
            catch {}
        }
        */
        
        
        for(int i=0; i<10; i++) {
            try {
                Product product = await GetProductAsync(productElements[i]);
                products.Add(product);
                //Console.WriteLine(product);
            }
            catch {}
        }
        
        System.Console.WriteLine("\n=================================================\n");
        System.Console.WriteLine("Los datos objetidos de ASIANFOODLOVERS.COM han sido:\n");
        
        // Con los datos recolectados, buscamos el producto más barato
        Product cheapest = products.MinBy(p => p.Price);
        Console.WriteLine($"Oferta más barata:\n{cheapest} ");

        // Con los datos recolectados, buscamos el producto más caro
        Product expensive = products.MaxBy(p => p.Price);
        Console.WriteLine($"Oferta más cara:\n{expensive} ");

        // Con los datos recolectados, buscamos la media
        try {
            decimal media = products.Average(p => p.Price);
            Console.WriteLine($"Media de los productos: {media} ");
        } catch (System.Exception) {}
        
        return products;
       
    }
    private static async Task<Product> GetProductAsync(IElementHandle element) {
        IElementHandle priceElement = await
        element.QuerySelectorAsync(".c-card-item-product__price");
        string priceRaw = await priceElement.InnerTextAsync();
        priceRaw = priceRaw.Replace("€", "",
        StringComparison.OrdinalIgnoreCase);
        priceRaw = priceRaw.Trim().Replace(" ", ",");
        decimal price = decimal.Parse(priceRaw);

        IElementHandle nameElement = await
        element.QuerySelectorAsync(".c-card-item-product__title");
        string name = await nameElement.InnerTextAsync();
        return new Product(name, price);
    }

}