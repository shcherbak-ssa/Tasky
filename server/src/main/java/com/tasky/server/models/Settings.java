package com.tasky.server.models;

import java.time.LocalDateTime;

import com.tasky.server.shared.constants.SettingsConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = SettingsConstants.DATABASE_TABLE_NAME)
public class Settings {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private String projectsView;

  @Column
  private LocalDateTime updatedAt;

  public Settings() {}

  public Settings(String projectsView, LocalDateTime updatedAt) {
    this.projectsView = projectsView;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getProjectsView() {
    return this.projectsView;
  }

  public void setProjectsView(String projectsView) {
    this.projectsView = projectsView;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Settings mergeWithUpdates(Settings settingsUpdates) {
    Settings updatedSettings = new Settings();

    updatedSettings.setId(this.id);
    updatedSettings.setUpdatedAt(settingsUpdates.updatedAt);
    
    updatedSettings.setProjectsView(settingsUpdates.projectsView == null ? this.projectsView : settingsUpdates.projectsView);

    return updatedSettings;
  }

  @Override
  public String toString() {
    return "Settings [id=" + id + ", projectsView=" + projectsView + ", updatedAt=" + updatedAt + "]";
  }

}
