package com.tasky.server.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasky.server.models.Settings;

public interface SettingsDatabase extends JpaRepository<Settings, Long> {}
