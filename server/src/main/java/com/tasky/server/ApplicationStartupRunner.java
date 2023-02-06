package com.tasky.server;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.tasky.server.models.Assets;
import com.tasky.server.models.AssetsColor;
import com.tasky.server.models.AssetsProjectIcon;
import com.tasky.server.models.Project;
import com.tasky.server.models.Settings;
import com.tasky.server.services.AssetsService;
import com.tasky.server.services.ProjectsService;
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

  @Autowired
  private ProjectsService projectsService;

  // @TODO: remove
  @Autowired
  private SettingsService settingsService;

  @Override
  public void run(String... args) throws Exception {
    this.addConsoleSpace();
    this.logStartedMessage();

    this.loadAssetsToDatabase();
    this.log("# Load assets to database");

    // @TODO: remove
    Settings settings = new Settings(SettingsConstants.PROJECTS_VIEW_LIST, LocalDateTime.now());
    this.settingsService.createSettings(settings);
    this.log("# Add settings");

    // @TODO: remove
    AssetsColor color = new AssetsColor();
    color.setId((long) 8);

    AssetsProjectIcon icon = new AssetsProjectIcon();
    icon.setId((long) 4);

    Project project = new Project();
    project.setName("Tasky");
    project.setDescription("The project goal is to get Java Spring practice.");
    project.setColor(color);
    project.setIcon(icon);
    project.setCreatedAt(LocalDateTime.now());

    projectsService.createProject(project);

    this.log("\n");
  }

  private void loadAssetsToDatabase() throws Exception {
    Assets assets = this.localResourceLoader.loadJSONResource("tasky/assets.json", Assets.class);

    // @TODO: add if not exist
    this.assetsService.addAssest(assets);
  }

  private void addConsoleSpace() {
    this.log("\n");
    this.log("##########################################################");
    this.log("\n");
  }

  private void logStartedMessage() {
    this.log(String.format("# Application started on port %s", this.env.getProperty("server.port")));
  }

  private void log(String message) {
    System.out.println(message);
  }

}
