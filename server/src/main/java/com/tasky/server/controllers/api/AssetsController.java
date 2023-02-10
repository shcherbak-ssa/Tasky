package com.tasky.server.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.models.helpers.Assets;
import com.tasky.server.services.AssetsService;
import com.tasky.server.shared.constants.AppConstants;

@RestController
public class AssetsController {

  @Autowired
  private AssetsService service;

  @GetMapping(path = AppConstants.ApiEndpoint.ASSETS)
  @ResponseStatus(HttpStatus.OK)
  public Assets getAssets() {
    return this.service.getAssets();
  }

}
