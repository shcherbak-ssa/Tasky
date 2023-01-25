package com.tasky.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tasky.server.ApplicationConfiguration;
import com.tasky.server.models.ErrorResponse;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ExceptionsController {

  @ExceptionHandler(value = ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleResourceNotFoundError(ResourceNotFoundException exception) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(exception.getMessage());

    return errorResponse;
  }

  @ExceptionHandler(value = Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ErrorResponse handleInternalError(Exception exception) {
    ErrorResponse errorResponse = this.createErrorResponse();
    errorResponse.setMessage(exception.getMessage());

    return errorResponse;
  }

  private ErrorResponse createErrorResponse() {
    return (ErrorResponse) ApplicationConfiguration.context.getBean("errorResponse");
  }

}
