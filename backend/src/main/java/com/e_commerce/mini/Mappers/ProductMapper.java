package com.e_commerce.mini.Mappers;

import com.e_commerce.mini.DTOs.AddProductDTO;
import com.e_commerce.mini.Entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public Product dtoToProduct(AddProductDTO addProductDTO){
        return new Product(
                addProductDTO.name(),
                addProductDTO.description(),
                addProductDTO.price(),
                addProductDTO.stock(),
                null,
                addProductDTO.photo());
    }
}
