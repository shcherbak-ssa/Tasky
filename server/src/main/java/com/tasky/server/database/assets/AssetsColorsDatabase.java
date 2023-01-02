package com.tasky.server.database.assets;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasky.server.models.assets.AssetsColor;

public interface AssetsColorsDatabase extends JpaRepository<AssetsColor, Long> {}
