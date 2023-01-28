package com.tasky.server.shared.validations;

import java.util.Arrays;
import java.util.List;

import com.tasky.server.shared.annotations.EqualTo;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EqualToValidator implements ConstraintValidator<EqualTo, String> {

  private List<String> values;
  private String message;

  @Override
  public void initialize(EqualTo annotation) {
    ConstraintValidator.super.initialize(annotation);

    String[] values = annotation.values();
    String messagePrefix = annotation.messagePrefix();
    String message = annotation.message();

    if (!messagePrefix.isEmpty()) {
      message = messagePrefix + ": " + message;
    }

    this.message = message + Arrays.toString(values);
    this.values = Arrays.asList(values);
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    boolean isContains = this.values.contains(value.trim());

    if (!isContains) {
      context.disableDefaultConstraintViolation();

      context
        .buildConstraintViolationWithTemplate(this.message)
        .addConstraintViolation();
    }

    return isContains;
  }

}
