package com.tasky.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.models.assets.Assets;
import com.tasky.server.models.assets.AssetsColor;
import com.tasky.server.ApplicationConfiguration;
import com.tasky.server.database.assets.AssetsColorsDatabase;

@Service
public class AssetsService {

  @Autowired
  private AssetsColorsDatabase colorsDatabase;

  public Assets getAssets() {
    Assets assets = (Assets) ApplicationConfiguration.context.getBean("createAssets");

    List<AssetsColor> colors = this.getColors();
    assets.setColors(colors);

    return assets;
  }

  public void addAssetsColors(List<AssetsColor> assetsColors) {
    this.colorsDatabase.saveAll(assetsColors);
  }

  private List<AssetsColor> getColors() {
    return this.colorsDatabase.findAll();
  }
}
