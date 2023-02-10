package com.tasky.server.database;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasky.server.models.Project;
import com.tasky.server.models.Section;

public interface SectionsDatabase extends JpaRepository<Section, Long> {

  List<Section> findAllByProject(Project project);

}
