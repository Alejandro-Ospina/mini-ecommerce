package com.e_commerce.mini.Services;

import com.e_commerce.mini.Entities.PaymentHistory;
import com.e_commerce.mini.Entities.Product;
import com.e_commerce.mini.Repositories.PaymentHistoryRepository;
import com.e_commerce.mini.Repositories.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentHistoryRepository paymentHistoryRepository;
    private final ProductRepository productRepository;

    public List<PaymentHistory> getAllPayments(){
        return paymentHistoryRepository.findAll();
    }

    @Transactional
    public PaymentHistory processPayment(PaymentHistory request) {

        if (request.getProducts() == null || request.getProducts().isEmpty()) {
            throw new IllegalArgumentException("No hay productos en la compra.");
        }

        Map<Long, Integer> quantities = request.getProductQuantities();
        if (quantities == null || quantities.isEmpty()) {
            throw new IllegalArgumentException("Las cantidades de los productos no fueron proporcionadas.");
        }

        double subtotal = 0.0;
        List<Product> updatedProducts = new ArrayList<>();

        for (Product product : request.getProducts()) {
            Long productId = product.getId();

            if (productId == null) {
                throw new IllegalArgumentException("El producto no tiene un ID válido.");
            }

            Product existing = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + productId));

            int quantity = quantities.getOrDefault(productId, 0);

            if (quantity <= 0) {
                throw new IllegalArgumentException("Cantidad inválida para el producto: " + existing.getName());
            }

            if (quantity > existing.getStock()) {
                throw new IllegalArgumentException("Stock insuficiente para el producto: " + existing.getName());
            }

            existing.setStock(existing.getStock() - quantity);
            productRepository.save(existing);
            updatedProducts.add(existing);

            subtotal += existing.getPrice() * quantity;
        }

        double tax = subtotal * 0.19;
        double total = subtotal + tax;

        request.setProducts(updatedProducts);
        request.setPurchaseDate(LocalDateTime.now());
        request.setSubtotal(subtotal);
        request.setTax(tax);
        request.setTotal(total);

        return paymentHistoryRepository.save(request);
    }
}
