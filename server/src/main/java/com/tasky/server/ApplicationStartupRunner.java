package com.tasky.server;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.tasky.server.models.Assets;
import com.tasky.server.models.Settings;
import com.tasky.server.services.AssetsService;
import com.tasky.server.services.SettingsService;
import com.tasky.server.shared.constants.SettingsConstants;
import com.tasky.server.shared.utils.LocalResourceLoader;

@Component
public class ApplicationStartupRunner implements CommandLineRunner {
  
  @Autowired
  private Environment env;

  @Autowired
  LocalResourceLoader localResourceLoader;

  @Autowired
  private AssetsService assetsService;

  // @TODO: remove
  @Autowired
  private SettingsService settingsService;

  protected final Log logger = LogFactory.getLog(getClass());

  @Override
  public void run(String... args) throws Exception {
    this.addConsoleSpace();
    this.logStartedMessage();

    this.loadAssetsToDatabase();
    this.logger.info("Load assets to database");

    // @TODO: remove
    Settings settings = new Settings(SettingsConstants.PROJECTS_VIEW_TILES);
    this.settingsService.createSettings(settings);
    this.logger.info("Create settings");
  }

  private void loadAssetsToDatabase() throws Exception {
    Assets assets = this.localResourceLoader.loadJSONResource("tasky/assets.json", Assets.class);

    // @TODO: add if not exist
    this.assetsService.addAssest(assets);
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
