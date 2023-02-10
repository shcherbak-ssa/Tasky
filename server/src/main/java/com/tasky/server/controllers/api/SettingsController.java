package com.tasky.server.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.Settings;
import com.tasky.server.services.SettingsService;
import com.tasky.server.shared.constants.AppConstants;
import com.tasky.server.shared.validations.ValidationGroups.ToUpdate;

@RestController
@Validated
public class SettingsController {

  @Autowired
  private SettingsService service;

  @GetMapping(path = AppConstants.ApiEndpoint.SETTINGS)
  @ResponseStatus(HttpStatus.OK)
  public Settings getSettings() {
    // @TODO: change logic
    return this.service.getSettings((long) 1);
  }

  @PutMapping(path = AppConstants.ApiEndpoint.SETTINGS)
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updatesSettings(@RequestBody @Validated(ToUpdate.class) Settings settingsUpdates) {
    this.service.updateSettings(settingsUpdates);
  }

}
