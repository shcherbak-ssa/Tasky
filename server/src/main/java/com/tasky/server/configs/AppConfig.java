package com.tasky.server.configs;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import com.tasky.server.models.Project;
import com.tasky.server.models.Section;
import com.tasky.server.models.helpers.Assets;
import com.tasky.server.models.helpers.ErrorResponse;
import com.tasky.server.models.helpers.ProjectMenuItem;
import com.tasky.server.models.helpers.ClientSection;

@Configurable
public class AppConfig {

  public static AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(AppConfig.class);

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Assets assets() {
    return new Assets();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ErrorResponse errorResponse() {
    return new ErrorResponse();
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Project projectWithIdOnly(Long id) {
    final Project project = new Project();
    project.setId(id);

    return project;
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ProjectMenuItem projectMenuItem(Project project) {
    final ProjectMenuItem menuItem = new ProjectMenuItem();

    menuItem.setId(project.getId());
    menuItem.setName(project.getName());
    menuItem.setColor(project.getColor());
    menuItem.setIsArchived(project.getIsArchived());

    return menuItem;
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public Section section(ClientSection clientSection) {
    final Project project = new Project();
    project.setId(clientSection.getProjectId());

    final Section section = new Section();
    section.setName(clientSection.getName());
    section.setProject(project);

    return section;
  }

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
  public ClientSection clientSection(Section section) {
    final ClientSection clientSection = new ClientSection();

    clientSection.setId(section.getId());
    clientSection.setName(section.getName());
    clientSection.setProjectId(section.getProject().getId());

    return clientSection;
  }

}
