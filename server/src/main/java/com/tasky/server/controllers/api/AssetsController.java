package com.tasky.server.controllers.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasky.server.constants.ApiPath;
import com.tasky.server.models.assets.Assets;
import com.tasky.server.services.AssetsService;

@RestController
@RequestMapping(path = ApiPath.ASSETS)
public class AssetsController {
  
  @Autowired
  private AssetsService service;

  @GetMapping
  public Assets getAssets() {
    return this.service.getAssets();
  }
}
