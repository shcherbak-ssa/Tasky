package com.tasky.server.models;

import com.tasky.server.shared.constants.AppConstants;
import com.tasky.server.shared.constants.SectionsConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = AppConstants.Table.SECTIONS)
public class Section {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column
  @NotNull(message = "\"name\" is required")
  private String name;

  @ManyToOne
  @JoinTable(
    name = AppConstants.Table.PROJECT_SECTIONS,
    joinColumns = @JoinColumn(name = SectionsConstants.JOIN_TABLE_COLUMN),
    inverseJoinColumns = @JoinColumn(name = SectionsConstants.JOIN_TABLE_INVERSE_COLUMN)
  )
  private Project project;

  public Section() {}

  public Section(Long id, String name, Project project) {
    this.id = id;
    this.name = name;
    this.project = project;
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

  public Project getProject() {
    return this.project;
  }

  public void setProject(Project project) {
    this.project = project;
  }

  @Override
  public String toString() {
    return "Section [id=" + id + ", name=" + name + ", project=" + project + "]";
  }

}
