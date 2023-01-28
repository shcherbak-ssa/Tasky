package com.tasky.server.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.tasky.server.database.ProjectsDatabase;
import com.tasky.server.models.Project;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

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
    List<Project> projects = this.database.findAll(ProjectsService.onlyActiveProjects());

    Thread removeDeletedProjects = new RemoveDeletedProjects(this.database);
    removeDeletedProjects.start();

    return projects;
  }

  public Project createProject(Project newProject) {
    return this.database.save(newProject);
  }

  public void updateProject(Project projectUpdates) throws ResourceNotFoundException {
    Optional<Project> projectFromDB = this.database.findById(projectUpdates.getId());

    if (projectFromDB.isPresent()) {
      Project projectToUpdate = projectFromDB.get();
      Project updatedProject = projectToUpdate.mergeWithUpdates(projectUpdates);

      this.database.save(updatedProject);

      return;
    }

    throw new ResourceNotFoundException("Project not found.");
  }

  public void deleteProject(Long id) {
    this.database.deleteById(id);
  }

  private class RemoveDeletedProjects extends Thread {

    private ProjectsDatabase database;

    public RemoveDeletedProjects(ProjectsDatabase database) {
      this.database = database;
    }

    @Override
    public void run() {
      List<Project> deletedProjects = this.database.findAll(ProjectsService.onlyDeletedProjects());

      if (deletedProjects.isEmpty()) {
        return;
      }

      List<Long> deletedProjectIds = deletedProjects.stream()
        .map((project) -> project.getId())
        .collect(Collectors.toList());

      this.database.deleteAllById(deletedProjectIds);
    }

  }

  private static Specification<Project> onlyActiveProjects() {
    return new Specification<Project>() {

      @Override
      public Predicate toPredicate(Root<Project> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        Path<Project> isDeletedPath = root.get("isDeleted");

        return builder.or(
          builder.isNull(isDeletedPath),
          builder.equal(isDeletedPath, false)
        );
      }

    };
  }

  private static Specification<Project> onlyDeletedProjects() {
    return new Specification<Project>() {

      @Override
      public Predicate toPredicate(Root<Project> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        Path<Project> isDeletedPath = root.get("isDeleted");

        return builder.equal(isDeletedPath, true);
      }

    };
  }

}
