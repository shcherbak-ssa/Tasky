package com.tasky.server.models.helpers;

import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Component
public class SectionToCreate {

  @NotBlank
  private String name;

  @NotNull
  private Long projectId;

  public SectionToCreate() {}

  public SectionToCreate(String name, Long projectId) {
    this.name = name;
    this.projectId = projectId;
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
