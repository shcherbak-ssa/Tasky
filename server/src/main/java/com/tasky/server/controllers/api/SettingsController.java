package com.tasky.server.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.Settings;
import com.tasky.server.services.SettingsService;
import com.tasky.server.shared.constants.ApiEndpoints;

@RestController
public class SettingsController {

  @Autowired
  private SettingsService service;

  @GetMapping(path = ApiEndpoints.SETTINGS)
  public ResponseEntity<Settings> getSettings() {
    // @TODO: change logic
    Settings foundSettings = this.service.getSettings((long) 1);

    return new ResponseEntity<Settings>(foundSettings, HttpStatus.OK);
  }

  @PutMapping(path = ApiEndpoints.SETTINGS)
  public ResponseEntity<Void> updatesSettings(@RequestBody Settings settingsUpdates) {
    this.service.updateSettings(settingsUpdates);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  
}
