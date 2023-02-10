package com.tasky.server.models;

import com.tasky.server.shared.constants.AppConstants;
import com.tasky.server.shared.constants.AssetsConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = AppConstants.Table.ASSETS_COLORS)
public class AssetsColor {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(length = AssetsConstants.COLOR_LENGTH, nullable = false)
  private String bgColor;

  @Column(length = AssetsConstants.COLOR_LENGTH, nullable = false)
  private String textColor;

  public AssetsColor() {}

  public AssetsColor(String bgColor, String textColor) {
    this.bgColor = bgColor;
    this.textColor = textColor;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getBgColor() {
    return this.bgColor;
  }

  public void setBgColor(String color) {
    this.bgColor = color;
  }

  public String getTextColor() {
    return this.textColor;
  }

  public void setTextColor(String textColor) {
    this.textColor = textColor;
  }

}
