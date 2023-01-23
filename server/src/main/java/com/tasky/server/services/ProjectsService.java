package com.tasky.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.database.ProjectsDatabase;
import com.tasky.server.models.Project;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

@Service
public class ProjectsService {
  
  @Autowired
  private ProjectsDatabase database;

  public Project getProjectById(Long id) throws ResourceNotFoundException {
    Optional<Project> foundProject = this.database.findById(id);

    if (foundProject.isPresent()) {
      return foundProject.get();
    }

    throw new ResourceNotFoundException("Project not found.");
  }

  public List<Project> getProjects() {
    return this.database.findAll();
  }

  public Project createProject(Project newProject) {
    return this.database.save(newProject);
  }

  public void updateProject(Project projectUpdates, boolean hasDueDate) throws ResourceNotFoundException {
    Optional<Project> projectFromDB = this.database.findById(projectUpdates.getId());

    if (projectFromDB.isPresent()) {
      Project projectToUpdate = projectFromDB.get();
      Project updatedProject = projectToUpdate.mergeWithUpdates(projectUpdates);

      if (hasDueDate) {
        updatedProject.setDueDate(projectUpdates.getDueDate());
      }

      this.database.save(updatedProject);

      return;
    }

    throw new ResourceNotFoundException("Project not found.");
  }

  public void deleteProject(Long id) {
    this.database.deleteById(id);
  }

}
