package com.e_commerce.mini.Controllers;

import com.e_commerce.mini.DTOs.AddProductDTO;
import com.e_commerce.mini.Entities.Product;
import com.e_commerce.mini.Services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return productService.getProduct(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody AddProductDTO product){
        return productService.saveProduct(product);
    }
}
