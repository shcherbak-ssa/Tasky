package com.tasky.server.models;

import java.time.LocalDateTime;
import java.util.List;

import com.tasky.server.shared.constants.AppConstants;
import com.tasky.server.shared.validations.ValidationGroups.ToCreate;
import com.tasky.server.shared.validations.ValidationGroups.ToUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = AppConstants.Table.PROJECTS)
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  @NotNull(message = "\"name\" is required", groups = ToCreate.class)
  @Size(min = 1, message = "\"name\" is required", groups = ToUpdate.class)
  private String name;

  @Column
  private String description;

  @ManyToOne
  @NotNull(message = "\"color\" is required", groups = ToCreate.class)
  private AssetsColor color;

  @ManyToOne
  @NotNull(message = "\"icon\" is required", groups = ToCreate.class)
  private AssetsProjectIcon icon;

  @Column
  private Boolean hasDueDate;

  @Column
  private LocalDateTime dueDate;

  @Column
  private Boolean isArchived;

  @Column
  private LocalDateTime archivedAt;

  @Column
  @Null(message = "Must be empty", groups = ToUpdate.class)
  @NotNull(message = "Cannot be empty", groups = ToCreate.class)
  private LocalDateTime createdAt;

  @Column
  @Null(message = "Must be empty", groups = ToCreate.class)
  @NotNull(message = "Cannot be empty", groups = ToUpdate.class)
  private LocalDateTime updatedAt;

  @Column
  private Boolean isDeleted;

  public Project() {}

  public Project(
    String name,
    String description,
    AssetsColor color,
    AssetsProjectIcon icon,
    Boolean hasDueDate,
    LocalDateTime dueDate,
    Boolean isArchived,
    LocalDateTime archivedAt,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    Boolean isDeleted,
    List<Section> sections
  ) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.icon = icon;
    this.hasDueDate = hasDueDate;
    this.dueDate = dueDate;
    this.isArchived = isArchived;
    this.archivedAt = archivedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
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
    this.name = name.trim();
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    if (description != null) {
      description = description.trim();
    }

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

  public LocalDateTime getDueDate() {
    return this.dueDate;
  }

  public void setDueDate(LocalDateTime dueDate) {
    this.dueDate = dueDate;
  }

  public Boolean getHasDueDate() {
    return this.hasDueDate;
  }

  public void setHasDueDate(Boolean hasDueDate) {
    this.hasDueDate = hasDueDate;
  }

  public Boolean getIsArchived() {
    return this.isArchived;
  }

  public void setIsArchived(Boolean isArchived) {
    this.isArchived = isArchived;
  }

  public LocalDateTime getArchivedAt() {
    return this.archivedAt;
  }

  public void setArchivedAt(LocalDateTime archivedAt) {
    this.archivedAt = archivedAt;
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

  public Boolean getIsDeleted() {
    return this.isDeleted;
  }

  public void setIsDeleted(Boolean isDeleted) {
    this.isDeleted = isDeleted;
  }

  public Project mergeWithUpdates(Project updates) {
    Project updatedProject = new Project();

    updatedProject.setId(this.id);
    updatedProject.setCreatedAt(this.createdAt);
    updatedProject.setDueDate(this.dueDate);
    updatedProject.setArchivedAt(this.archivedAt);
    updatedProject.setUpdatedAt(updates.updatedAt);

    updatedProject.setName(updates.name == null ? this.name : updates.name);
    updatedProject.setDescription(updates.description == null ? this.description : updates.description);
    updatedProject.setColor(updates.color == null ? this.color : updates.color);
    updatedProject.setIcon(updates.icon == null ? this.icon : updates.icon);
    updatedProject.setHasDueDate(updates.hasDueDate == null ? this.hasDueDate : updates.hasDueDate);
    updatedProject.setIsArchived(updates.isArchived == null ? this.isArchived : updates.isArchived);
    updatedProject.setIsDeleted(updates.isDeleted == null ? this.isDeleted : updates.isDeleted);

    if (updates.hasDueDate != null) {
      updatedProject.setDueDate(updates.hasDueDate ? updates.dueDate : null);
    }

    if (updates.isArchived != null) {
      updatedProject.setArchivedAt(updates.isArchived ? updates.archivedAt : null);
    }

    return updatedProject;
  }

  @Override
  public String toString() {
    return "Project [id=" + id + ", name=" + name + ", description=" + description + ", color=" + color + ", icon="
      + icon + ", hasDueDate=" + hasDueDate + ", dueDate=" + dueDate + ", isArchived=" + isArchived + ", archivedAt="
      + archivedAt + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", isDeleted=" + isDeleted + "]";
  }

}
