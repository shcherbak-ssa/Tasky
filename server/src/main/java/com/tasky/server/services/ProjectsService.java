package com.tasky.server.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.tasky.server.configs.AppConfig;
import com.tasky.server.database.ProjectsDatabase;
import com.tasky.server.models.Project;
import com.tasky.server.models.ProjectMenuItem;
import com.tasky.server.shared.constants.ProjectsConstants;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class ProjectsService {

  private Map<Long, Timer> timers = new HashMap<>();

  @Autowired
  private ProjectsDatabase database;

  public Project getProjectById(Long id) throws ResourceNotFoundException {
    final Optional<Project> foundProject = this.database.findById(id);

    if (foundProject.isPresent()) {
      return foundProject.get();
    }

    throw new ResourceNotFoundException("Project not found.");
  }

  public List<Project> getProjects() {
    return this.database.findAll(ProjectsService.onlyActiveProjects());
  }

  public List<ProjectMenuItem> getProjectMenuItem() {
    List<Project> projects = this.getProjects();

    return projects
      .stream()
      .map((project) -> (ProjectMenuItem) AppConfig.context.getBean("projectMenuItem", project))
      .collect(Collectors.toList());
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
      this.handleDeletedProject(projectUpdates);

      return;
    }

    throw new ResourceNotFoundException("Project not found.");
  }

  public void deleteProject(Long id) {
    this.database.deleteById(id);

    this.removeTimer(id);
  }

  private void handleDeletedProject(Project projectUpdates) {
    Boolean isDeleted = projectUpdates.getIsDeleted();
    Long projectId = projectUpdates.getId();

    if (isDeleted == null) {
      return;
    }

    if (isDeleted) {
      Timer timer = new Timer();
      TimerTask task = new RemoveDeletedProjectTask(projectId, this);

      this.timers.put(projectId, timer);

      timer.schedule(task, ProjectsConstants.REMOVE_DELETED_PROJECT_TASK_DELAY);
    } else {
      this.removeTimer(projectId);
    }
  }

  private void removeTimer(Long projectId) {
    Timer timer = this.timers.remove(projectId);

    if (timer != null) {
      timer.cancel();
    }
  }

  private class RemoveDeletedProjectTask extends TimerTask {

    private Long projectId;
    private ProjectsService service;

    public RemoveDeletedProjectTask(Long projectId, ProjectsService service) {
      this.projectId = projectId;
      this.service = service;
    }

    @Override
    public void run() {
      this.service.deleteProject(this.projectId);
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

}
