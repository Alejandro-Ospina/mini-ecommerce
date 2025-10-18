package com.e_commerce.mini.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentHistory {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime purchaseDate;
    private Double subtotal;
    private Double total;
    private Double tax;

    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "payment_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @ElementCollection
    @CollectionTable(
            name = "payment_product_quantities",
            joinColumns = @JoinColumn(name = "payment_id")
    )
    @MapKeyColumn(name = "product_id") // antes era @MapKeyJoinColumn
    private Map<Long, Integer> productQuantities;
}
