package com.tasky.server.shared.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class LocalResourceLoader {
  
  public <T> T loadJSONResource(String filePathname, Class<T> resourceClass) throws IOException  {
    ClassPathResource resource = new ClassPathResource(filePathname);
    InputStream resourceInputStream = resource.getInputStream();

    try (BufferedReader reader = new BufferedReader(new InputStreamReader(resourceInputStream))) {
      String resourceContent = reader.lines().collect(Collectors.joining(""));
      ObjectMapper objectMapper = new ObjectMapper();

      return objectMapper.readValue(resourceContent, resourceClass);
    }
  }

}
