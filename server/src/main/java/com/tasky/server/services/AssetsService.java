package com.tasky.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.models.Assets;
import com.tasky.server.models.AssetsColor;
import com.tasky.server.models.AssetsProjectIcon;
import com.tasky.server.configs.AppConfig;
import com.tasky.server.database.AssetsColorsDatabase;
import com.tasky.server.database.AssetsProjectIconsDatabase;

@Service
public class AssetsService {

  @Autowired
  private AssetsColorsDatabase colorsDatabase;

  @Autowired
  private AssetsProjectIconsDatabase projectIconsDatabase;

  public Assets getAssets() {
    Assets assets = (Assets) AppConfig.context.getBean("assets");

    List<AssetsColor> colors = this.getColors();
    assets.setColors(colors);

    List<AssetsProjectIcon> projectIcons = this.getProjectIcons();
    assets.setProjectIcons(projectIcons);

    return assets;
  }

  public void addAssest(Assets assets) {
    this.colorsDatabase.saveAll(assets.getColors());
    this.projectIconsDatabase.saveAll(assets.getProjectIcons());
  }

  private List<AssetsColor> getColors() {
    return this.colorsDatabase.findAll();
  }

  private List<AssetsProjectIcon> getProjectIcons() {
    return this.projectIconsDatabase.findAll();
  }

}
