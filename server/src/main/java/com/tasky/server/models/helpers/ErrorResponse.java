package com.tasky.server.models.helpers;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class ErrorResponse {

  private String message;
  private Map<String, String> errors;

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Map<String, String> getErrors() {
    return this.errors;
  }

  public void setErrors(Map<String, String> errors) {
    this.errors = errors;
  }

}
