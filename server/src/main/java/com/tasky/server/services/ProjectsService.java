package com.tasky.server.services;

import java.util.List;
import java.util.Optional;

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

  public Project createProject(Project newProject) {
    return this.database.save(newProject);
  }

  public void updateProject(Project projectToUpdate) {
    Optional<Project> currentProjectFromDB = this.database.findById(projectToUpdate.getId());

    if (currentProjectFromDB.isPresent()) {
      Project currentProject = currentProjectFromDB.get();
      Project updatedProject = currentProject.mergeWithUpdates(projectToUpdate);

      this.database.save(updatedProject);
    }

    // @TODO: implement not found
  }

  public void deleteProject(Long id) {
    this.database.deleteById(id);
  }
}
