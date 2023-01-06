package com.tasky.server.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.Project;
import com.tasky.server.services.ProjectsService;
import com.tasky.server.shared.constants.ApiEndpoints;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

@RestController
public class ProjectsController {
  
  @Autowired
  private ProjectsService service;

  @GetMapping(path = ApiEndpoints.PROJECTS_ID)
  public ResponseEntity<Project> getProjectById(@PathVariable Long id) throws ResourceNotFoundException {
    Project foundProject = this.service.getProjectById(id);

    return new ResponseEntity<Project>(foundProject, HttpStatus.OK);
  }

  @GetMapping(path = ApiEndpoints.PROJECTS)
  public ResponseEntity<List<Project>> getProjects() {
    List<Project> projects = this.service.getProjects();

    return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
  }

  @PostMapping(path = ApiEndpoints.PROJECTS)
  public ResponseEntity<Project> createProject(@RequestBody Project projectToCreate) {
    Project createdProject = this.service.createProject(projectToCreate);

    return new ResponseEntity<Project>(createdProject, HttpStatus.CREATED);
  }

  @PutMapping(path = ApiEndpoints.PROJECTS_ID)
  public ResponseEntity<Void> updateProject(@PathVariable Long id, @RequestBody Project projectUpdates) throws ResourceNotFoundException {
    projectUpdates.setId(id);
    
    this.service.updateProject(projectUpdates);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping(path = ApiEndpoints.PROJECTS_ID)
  public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
    this.service.deleteProject(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
