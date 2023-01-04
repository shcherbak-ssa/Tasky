package com.tasky.server.models;

import com.tasky.server.constants.DatabaseTable;
import com.tasky.server.models.assets.AssetsColor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = DatabaseTable.PROJECTS)
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  private String name;

  @Column
  private String description;

  @OneToOne
  private AssetsColor color;

  Project() {}

  Project(
    String name,
    String description,
    AssetsColor color
  ) {
    this.name = name;
    this.description = description;
    this.color = color;
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

  public Project mergeWithUpdates(Project projectToUpdate) {
    Project updatedProject = new Project();

    updatedProject.setId(this.id);
    updatedProject.setName(projectToUpdate.name == null ? this.name : projectToUpdate.name);
    updatedProject.setDescription(projectToUpdate.description == null ? this.description : projectToUpdate.description);
    updatedProject.setColor(projectToUpdate.color == null ? this.color : projectToUpdate.color);

    return updatedProject;
  }
}
