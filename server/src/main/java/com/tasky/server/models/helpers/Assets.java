package com.tasky.server.models.helpers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.tasky.server.models.AssetsColor;
import com.tasky.server.models.AssetsProjectIcon;

@Component
public class Assets {

  private List<AssetsColor> colors;
  private List<AssetsProjectIcon> projectIcons;

  public Assets() {}

  public Assets(List<AssetsColor> colors, List<AssetsProjectIcon> projectIcons) {
    this.colors = colors;
    this.projectIcons = projectIcons;
  }

  public List<AssetsColor> getColors() {
    return this.colors;
  }

  public void setColors(List<AssetsColor> colors) {
    this.colors = colors;
  }

  public List<AssetsProjectIcon> getProjectIcons() {
    return this.projectIcons;
  }

  public void setProjectIcons(List<AssetsProjectIcon> projectIcons) {
    this.projectIcons = projectIcons;
  }

}
