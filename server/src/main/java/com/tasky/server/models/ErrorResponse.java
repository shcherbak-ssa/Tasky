package com.tasky.server.models;

import org.springframework.stereotype.Component;

@Component
public class ErrorResponse {
  
  private String message;

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

}
