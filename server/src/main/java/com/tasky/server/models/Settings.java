package com.tasky.server.models;

import java.time.LocalDateTime;

import com.tasky.server.shared.annotations.EqualTo;
import com.tasky.server.shared.constants.DatabaseConstants;
import com.tasky.server.shared.constants.SettingsConstants;
import com.tasky.server.shared.validations.ValidationGroups.ToUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = DatabaseConstants.Table.SETTINGS)
public class Settings {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  @EqualTo(
    messagePrefix = "Projects view setting",
    values = { SettingsConstants.PROJECTS_VIEW_LIST, SettingsConstants.PROJECTS_VIEW_TILES }
  )
  private String projectsView;

  @Column
  @NotNull(message = "Cannot be empty", groups = ToUpdate.class)
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

  public Settings mergeWithUpdates(Settings updates) {
    Settings updatedSettings = new Settings();

    updatedSettings.setId(this.id);
    updatedSettings.setUpdatedAt(updates.updatedAt);

    updatedSettings.setProjectsView(updates.projectsView == null ? this.projectsView : updates.projectsView);

    return updatedSettings;
  }

  @Override
  public String toString() {
    return "Settings [id=" + id + ", projectsView=" + projectsView + ", updatedAt=" + updatedAt + "]";
  }

}
