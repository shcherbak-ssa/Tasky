package com.tasky.server.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasky.server.models.AssetsProjectIcon;

public interface AssetsProjectIconsDatabase extends JpaRepository<AssetsProjectIcon, Long> {}
