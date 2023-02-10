package com.tasky.server.models.helpers;

import org.springframework.stereotype.Component;

import com.tasky.server.models.AssetsColor;

@Component
public class ProjectMenuItem {

  private Long id;
  private String name;
  private AssetsColor color;
  private Boolean isArchived;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public AssetsColor getColor() {
    return this.color;
  }

  public void setColor(AssetsColor color) {
    this.color = color;
  }

  public Boolean getIsArchived() {
    return this.isArchived;
  }

  public void setIsArchived(Boolean isArchived) {
    this.isArchived = isArchived;
  }

}
