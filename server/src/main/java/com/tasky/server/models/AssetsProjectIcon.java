package com.tasky.server.models;

import com.tasky.server.shared.constants.AssetsConstants;
import com.tasky.server.shared.constants.DatabaseConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = DatabaseConstants.Table.ASSETS_PROJECT_ICONS)
public class AssetsProjectIcon {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(length = AssetsConstants.PROJECT_ICON_LENGTH, nullable = false)
  private String family;

  @Column(length = AssetsConstants.PROJECT_ICON_LENGTH, nullable = false)
  private String name;

  public AssetsProjectIcon() {}

  public AssetsProjectIcon(String family, String name) {
    this.family = family;
    this.name = name;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFamily() {
    return this.family;
  }

  public void setFamily(String family) {
    this.family = family;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

}

