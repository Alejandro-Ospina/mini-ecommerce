package com.e_commerce.mini.Entities;

import com.e_commerce.mini.Enums.Categories;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column (length = 1000)
    private String description;
    private Double price;
    private Integer stock;

    @Enumerated (EnumType.STRING)
    private Categories category;

    @Column(length = 1000)
    private String photo;

    public Product(String name, String description, Double price, Integer stock, Categories category, String photo) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.photo = photo;
    }
}
