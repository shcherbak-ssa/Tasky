package com.tasky.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.configs.AppConfig;
import com.tasky.server.database.SectionsDatabase;
import com.tasky.server.models.Project;
import com.tasky.server.models.Section;
import com.tasky.server.models.helpers.ClientSection;

@Service
public class SectionsService {

  @Autowired
  private SectionsDatabase database;

  public List<ClientSection> getSectionsByProjectId(Long projectId) {
    final Project project = (Project) AppConfig.context.getBean("projectWithIdOnly", projectId);
    final List<Section> foundSections = this.database.findAllByProject(project);

    return foundSections
      .stream()
      .map(this::getClientSection)
      .collect(Collectors.toList());
  }

  public ClientSection createSection(ClientSection clientSection) {
    final Section newSection = (Section) AppConfig.context.getBean("section", clientSection);
    final Section createdSection = this.database.save(newSection);

    return this.getClientSection(createdSection);
  }

  private ClientSection getClientSection(Section section) {
    return (ClientSection) AppConfig.context.getBean("clientSection", section);
  }

}
