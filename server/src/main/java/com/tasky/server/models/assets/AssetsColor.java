package com.tasky.server.models.assets;

import com.tasky.server.constants.Assets;
import com.tasky.server.constants.DatabaseTable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = DatabaseTable.ASSETS_COLORS)
public class AssetsColor {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(length = Assets.ASSETS_COLOR_LENGTH, nullable = false)
  private String color;

  public AssetsColor() {}

  public AssetsColor(String color) {
    this.color = color;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getColor() {
    return this.color;
  }

  public void setColor(String color) {
    this.color = color;
  }
}
