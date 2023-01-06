package com.tasky.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.tasky.server.ApplicationConfiguration;
import com.tasky.server.models.ErrorResponse;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ExceptionsController {
  
  @ExceptionHandler(value = ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException exception) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(exception.getMessage());
    
    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(value = Exception.class)
  public ResponseEntity<ErrorResponse> handleInternalError(Exception exception) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(exception.getMessage());

    return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private ErrorResponse createErrorResponse() {
    return (ErrorResponse) ApplicationConfiguration.context.getBean("errorResponse");
  }

}
