package com.tasky.server;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import com.tasky.server.models.Assets;
import com.tasky.server.models.ErrorResponse;
import com.tasky.server.models.Project;
import com.tasky.server.models.ProjectMenuItem;
import com.tasky.server.models.Section;
import com.tasky.server.models.helpers.SectionToCreate;

@Configurable
public class ApplicationConfiguration {

  public static AnnotationConfigApplicationContext context
    = new AnnotationConfigApplicationContext(ApplicationConfiguration.class);

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
  public Section section(SectionToCreate sectionToCreate) {
    final Project project = new Project();
    project.setId(sectionToCreate.getProjectId());

    final Section section = new Section();
    section.setName(sectionToCreate.getName());
    section.setProject(project);

    return section;
  }

}
