package com.tasky.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tasky.server.database.SettingsDatabase;
import com.tasky.server.models.Settings;
import com.tasky.server.shared.exceptions.ResourceNotFoundException;

@Service
public class SettingsService {
  
  @Autowired
  private SettingsDatabase database;

  public Settings getSettings(Long id) throws ResourceNotFoundException {
    Optional<Settings> foundSettings = this.database.findById(id);

    if (foundSettings.isPresent()) {
      return foundSettings.get();
    }

    throw new ResourceNotFoundException("Settings not found");
  }

  public Settings createSettings(Settings settingsToCreate) {
    return this.database.save(settingsToCreate);
  }

  public void updateSettings(Settings settingsUpdates) throws ResourceNotFoundException {
    Optional<Settings> settingsFromDB = this.database.findById(settingsUpdates.getId());

    if (settingsFromDB.isPresent()) {
      Settings settingsToUpdate = settingsFromDB.get();
      Settings updatedSettings = settingsToUpdate.mergeWithUpdates(settingsUpdates);

      this.database.save(updatedSettings);

      return;
    }

    throw new ResourceNotFoundException("Settings not found");
  }

}
