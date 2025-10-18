package com.e_commerce.mini.DTOs;

import com.e_commerce.mini.Entities.Product;

public record AddProductDTO(
        String name,
        String description,
        Double price,
        Integer stock,
        String category,
        String photo
) { }
