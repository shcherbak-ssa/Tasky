package com.tasky.server.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.Project;
import com.tasky.server.services.ProjectsService;
import com.tasky.server.shared.constants.ApiEndpoints;
import com.tasky.server.shared.validations.ValidationGroups.ToCreate;
import com.tasky.server.shared.validations.ValidationGroups.ToUpdate;

@RestController
@Validated
public class ProjectsController {

  @Autowired
  private ProjectsService service;

  @GetMapping(path = ApiEndpoints.PROJECTS_ID)
  @ResponseStatus(HttpStatus.OK)
  public Project getProjectById(@PathVariable Long id) {
    return this.service.getProjectById(id);
  }

  @GetMapping(path = ApiEndpoints.PROJECTS)
  @ResponseStatus(HttpStatus.OK)
  public List<Project> getProjects() {
    return this.service.getProjects();
  }

  @PostMapping(path = ApiEndpoints.PROJECTS)
  @ResponseStatus(HttpStatus.CREATED)
  public Project createProject(@RequestBody @Validated(ToCreate.class) Project projectToCreate) {
    return this.service.createProject(projectToCreate);
  }

  @PutMapping(path = ApiEndpoints.PROJECTS_ID)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateProject(
    @PathVariable Long id,
    @RequestBody @Validated(ToUpdate.class) Project projectUpdates
  ) {
    projectUpdates.setId(id);

    this.service.updateProject(projectUpdates);
  }

  @DeleteMapping(path = ApiEndpoints.PROJECTS_ID)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteProject(@PathVariable Long id) {
    this.service.deleteProject(id);
  }

}
