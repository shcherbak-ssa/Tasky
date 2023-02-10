package com.tasky.server.models.helpers;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Component
public class ClientSection {

  private Long id;

  @NotBlank
  private String name;

  @NotNull
  private Long projectId;

  public ClientSection() {}

  public ClientSection(Long id, String name, Long projectId) {
    this.id = id;
    this.name = name;
    this.projectId = projectId;
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

  public Long getProjectId() {
    return this.projectId;
  }

  public void setProjectId(Long projectId) {
    this.projectId = projectId;
  }

  @Override
  public String toString() {
    return "SectionToCreate [name=" + name + ", projectId=" + projectId + "]";
  }

}
