package com.tasky.server.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.tasky.server.shared.constants.ProjectsConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = ProjectsConstants.DATABASE_TABLE_NAME)
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private String name;

  @Column
  private String description;

  @ManyToOne
  private AssetsColor color;

  @ManyToOne
  private AssetsProjectIcon icon;

  @Column
  private LocalDate dueDate;

  @Column
  private LocalDateTime createdAt;

  @Column
  private LocalDateTime updatedAt;

  Project() {}

  Project(String name, String description, AssetsColor color, AssetsProjectIcon icon,
    LocalDate dueDate, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.icon = icon;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

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

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public AssetsColor getColor() {
    return this.color;
  }

  public void setColor(AssetsColor color) {
    this.color = color;
  }

  public AssetsProjectIcon getIcon() {
    return this.icon;
  }

  public void setIcon(AssetsProjectIcon icon) {
    this.icon = icon;
  }

  public LocalDate getDueDate() {
    return dueDate;
  }

  public void setDueDate(LocalDate dueDate) {
    this.dueDate = dueDate;
  }

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Project mergeWithUpdates(Project projectUpdates) {
    Project updatedProject = new Project();

    updatedProject.setId(this.id);
    updatedProject.setCreatedAt(this.createdAt);
    updatedProject.setUpdatedAt(projectUpdates.updatedAt);

    updatedProject.setName(projectUpdates.name == null ? this.name : projectUpdates.name);
    updatedProject.setDescription(projectUpdates.description == null ? this.description : projectUpdates.description);
    updatedProject.setColor(projectUpdates.color == null ? this.color : projectUpdates.color);
    updatedProject.setIcon(projectUpdates.icon == null ? this.icon : projectUpdates.icon);
    updatedProject.setDueDate(projectUpdates.dueDate == null ? this.dueDate : projectUpdates.dueDate);

    return updatedProject;
  }

  @Override
  public String toString() {
    return "Project [id=" + id + ", name=" + name + ", description=" + description + ", color=" + color + ", icon="
        + icon + ", dueDate=" + dueDate + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
  }

}
