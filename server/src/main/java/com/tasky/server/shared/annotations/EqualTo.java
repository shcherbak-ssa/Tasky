package com.tasky.server.shared.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.tasky.server.shared.validations.EqualToValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EqualToValidator.class)
@Documented
public @interface EqualTo {

  String message() default "Invalid value. Expected ";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  String messagePrefix() default "";

  String[] values() default {};

}
