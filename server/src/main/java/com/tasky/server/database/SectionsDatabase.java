package com.tasky.server.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasky.server.models.Section;

public interface SectionsDatabase extends JpaRepository<Section, Long> {}
