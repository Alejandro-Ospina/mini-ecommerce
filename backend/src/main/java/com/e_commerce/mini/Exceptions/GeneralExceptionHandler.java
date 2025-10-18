package com.e_commerce.mini.Exceptions;

import com.e_commerce.mini.DTOs.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GeneralExceptionHandler {

    @ExceptionHandler (Exception.class)
    public ResponseEntity<?> handleException(Exception ex){
        return ResponseEntity.internalServerError().body(
                new ResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage())
        );
    }

    public ResponseEntity<?> handleBadRequest(MethodArgumentNotValidException ex){
        return ResponseEntity.badRequest().body(
                ex.getFieldErrors().stream().map(ResponseDto::new)
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex){
        return ResponseEntity.badRequest().body(new ResponseDto(HttpStatus.BAD_REQUEST.value(), ex.getMessage()));
    }
}
