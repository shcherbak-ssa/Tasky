package com.tasky.server;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.tasky.server.models.assets.AssetsColor;
import com.tasky.server.services.AssetsService;

@Component
@PropertySource("classpath:tasky.properties")
public class ApplicationStartupRunner implements CommandLineRunner {
  
  @Autowired
  private Environment env;

  @Autowired
  private AssetsService assetsService;

  protected final Log logger = LogFactory.getLog(getClass());

  @Override
  public void run(String... args) throws Exception {
    this.addConsoleSpace();
    this.logStartedMessage();

    this.loadAssetsToDatabase();
    this.logger.info("Load assets to database");
  }

  private void loadAssetsToDatabase() throws Exception {
    String colors = this.env.getProperty("tasky.assets.colors");

    if (colors == null) {
      // @TODO: add exception
      throw new Exception("Assets colors not defined");
    }

    List<AssetsColor> assetsColors = Arrays.asList(colors.split(","))
      .stream()
      .map((String color) -> new AssetsColor(color))
      .collect(Collectors.toList());
    
    // @TODO: add if not exist
    this.assetsService.addAssetsColors(assetsColors);
  }

  private void addConsoleSpace() {
    System.out.println("");
    System.out.println("##########################################################");
    System.out.println("");
  }

  private void logStartedMessage() {
    this.logger.info(String.format(
      "Application started on port %s",
      this.env.getProperty("server.port")
    ));
  }
}
