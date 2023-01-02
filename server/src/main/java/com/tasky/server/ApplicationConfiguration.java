package com.tasky.server;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import com.tasky.server.models.assets.Assets;

@Configurable
public class ApplicationConfiguration {

  public static AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(ApplicationConfiguration.class);
  
  @Bean
  @Scope(value = "prototype")
  public Assets createAssets() {
    return new Assets();
  }
}
