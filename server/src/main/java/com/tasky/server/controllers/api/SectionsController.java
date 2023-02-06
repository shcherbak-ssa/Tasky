package com.tasky.server.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.ApplicationConfiguration;
import com.tasky.server.models.Section;
import com.tasky.server.models.helpers.SectionToCreate;
import com.tasky.server.services.SectionsService;
import com.tasky.server.shared.constants.ApiEndpoints;

@RestController
@Validated
public class SectionsController {

  @Autowired
  private SectionsService service;

  @PostMapping(path = ApiEndpoints.SECTIONS)
  @ResponseStatus(HttpStatus.CREATED)
  public Section createSection(@RequestBody @Validated SectionToCreate sectionToCreate) {
    final Section newSection = (Section) ApplicationConfiguration.context.getBean("section", sectionToCreate);

    return this.service.createSection(newSection);
  }

}
