package com.tasky.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.database.SectionsDatabase;
import com.tasky.server.models.Section;

@Service
public class SectionsService {

  @Autowired
  private SectionsDatabase database;

  public Section createSection(Section newSection) {
    return this.database.save(newSection);
  }

}
