package com.tasky.server.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.constants.ApiEndpoint;
import com.tasky.server.models.Project;
import com.tasky.server.services.ProjectsService;

@RestController
@RequestMapping(path = ApiEndpoint.PROJECTS)
public class ProjectsController {
  
  @Autowired
  private ProjectsService service;

  @GetMapping
  public List<Project> getProjects() {
    return this.service.getProjects();
  }

  @PostMapping
  public Project createProject(@RequestBody Project newProject) {
    return this.service.createProject(newProject);
  }

  @PutMapping(path = ApiEndpoint.ID_PARAM)
  public void updateProject(@PathVariable Long id, @RequestBody Project project) {
    project.setId(id);

    this.service.updateProject(project);
  }

  @DeleteMapping(path = ApiEndpoint.ID_PARAM)
  public void deleteProject(@PathVariable Long id) {
    this.service.deleteProject(id);
  }
}
