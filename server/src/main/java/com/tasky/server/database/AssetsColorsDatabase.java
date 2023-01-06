package com.tasky.server.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasky.server.models.AssetsColor;

public interface AssetsColorsDatabase extends JpaRepository<AssetsColor, Long> {}
