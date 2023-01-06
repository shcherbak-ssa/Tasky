package com.tasky.server;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import com.tasky.server.models.Assets;
import com.tasky.server.models.ErrorResponse;

@Configurable
public class ApplicationConfiguration {

  public static AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(ApplicationConfiguration.class);
  
  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Assets assets() {
    return new Assets();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ErrorResponse errorResponse() {
    return new ErrorResponse();
  }
}
