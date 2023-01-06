package com.tasky.server.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.Assets;
import com.tasky.server.services.AssetsService;
import com.tasky.server.shared.constants.ApiEndpoints;

@RestController
public class AssetsController {
  
  @Autowired
  private AssetsService service;

  @GetMapping(path = ApiEndpoints.ASSETS)
  public ResponseEntity<Assets> getAssets() {
    Assets assets = this.service.getAssets();

    return new ResponseEntity<Assets>(assets, HttpStatus.OK);
  }
}
