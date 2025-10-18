package com.e_commerce.mini.DTOs;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;

public record ResponseDto(int code, String message) {
    public ResponseDto(FieldError error){
        this(HttpStatus.BAD_REQUEST.value(),
                error.getField() + ": " + error.getDefaultMessage());
    }
}
