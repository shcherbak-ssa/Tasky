package com.tasky.server.shared.exceptions;

public class ResourceNotFoundException extends RuntimeException {

  private String message;

  public ResourceNotFoundException() {}

  public ResourceNotFoundException(String message) {
    super(message);
    this.message = message;
  }

}
