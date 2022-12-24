package com.tasky.server.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.constants.ApiPath;
import com.tasky.server.models.Project;
import com.tasky.server.services.ProjectsService;

@RestController
@RequestMapping(path = ApiPath.PROJECTS)
public class ProjectsController {
  @Autowired
  private ProjectsService service;

  @GetMapping
  public List<Project> getProjects() {
    return this.service.getProjects();
  }
}
