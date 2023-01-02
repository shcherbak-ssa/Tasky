package com.tasky.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.database.ProjectsDatabase;
import com.tasky.server.models.Project;

@Service
public class ProjectsService {
  
  @Autowired
  private ProjectsDatabase database;

  public List<Project> getProjects() {
    return this.database.findAll();
  }
}
