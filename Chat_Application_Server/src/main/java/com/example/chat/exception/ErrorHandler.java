package com.example.chat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<AppError> handleBadRequestException(Exception exception) {

        AppError appError = new AppError(HttpStatus.BAD_REQUEST.value(), exception.getMessage());

        return new ResponseEntity<>(appError, HttpStatus.BAD_REQUEST);
    }
}
