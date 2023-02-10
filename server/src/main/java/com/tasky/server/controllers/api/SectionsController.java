package com.tasky.server.controllers.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.helpers.ClientSection;
import com.tasky.server.services.SectionsService;
import com.tasky.server.shared.constants.AppConstants;
import com.tasky.server.shared.constants.SectionsConstants;

@RestController
@Validated
public class SectionsController {

  @Autowired
  private SectionsService service;

  @GetMapping(
    path = AppConstants.ApiEndpoint.SECTIONS,
    params = { SectionsConstants.GET_SECTIONS_PROJECT_ID_PARAM }
  )
  @ResponseStatus(HttpStatus.OK)
  public List<ClientSection> getSections(@RequestParam Long projectId) {
    return this.service.getSectionsByProjectId(projectId);
  }

  @PostMapping(path = AppConstants.ApiEndpoint.SECTIONS)
  @ResponseStatus(HttpStatus.CREATED)
  public ClientSection createSection(@RequestBody @Validated ClientSection sectionToCreate) {
    return this.service.createSection(sectionToCreate);
  }

}
