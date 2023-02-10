package com.tasky.server.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.UnsatisfiedServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.tasky.server.configs.AppConfig;
import com.tasky.server.models.helpers.ErrorResponse;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class ExceptionsController {

  @ExceptionHandler(value = ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(value = UnsatisfiedServletRequestParameterException.class)
  public ResponseEntity<ErrorResponse> handleInvalidParameterException(
    UnsatisfiedServletRequestParameterException exception
  ) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage("Invalid request parameters.");

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = ConstraintViolationException.class)
  public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException exception) {
    String[] message = { "" };

    exception.getConstraintViolations().forEach((violation) -> {
      message[0] = violation.getMessageTemplate();
    });

    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(message[0]);

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new HashMap<>();

    exception.getBindingResult().getFieldErrors().forEach((error) -> {
      errors.put(error.getField(), error.getDefaultMessage());
    });

    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage("Validation error");
    errorResponse.setErrors(errors);

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = Exception.class)
  public ResponseEntity<ErrorResponse> handleException(Exception exception) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private ErrorResponse createErrorResponse() {
    return (ErrorResponse) AppConfig.context.getBean("errorResponse");
  }

}
