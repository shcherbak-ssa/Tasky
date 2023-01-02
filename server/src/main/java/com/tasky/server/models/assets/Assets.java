package com.tasky.server.models.assets;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class Assets {
  private List<AssetsColor> colors;

  public List<AssetsColor> getColors() {
    return this.colors;
  }

  public void setColors(List<AssetsColor> colors) {
    this.colors = colors;
  }
}
