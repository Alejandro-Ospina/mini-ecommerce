package com.e_commerce.mini.Controllers;

import com.e_commerce.mini.Entities.PaymentHistory;
import com.e_commerce.mini.Services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/api/payments")
@CrossOrigin (origins = "*")
@RequiredArgsConstructor
public class PaymentHistoryController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody PaymentHistory paymentHistory) throws IllegalAccessException {
        try{
            var purchase = paymentService.processPayment(paymentHistory);
            return ResponseEntity.ok(purchase);
        }catch (IllegalArgumentException ex){
            throw new IllegalAccessException(ex.getMessage());
        }
    }
}
