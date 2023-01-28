package com.tasky.server.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.tasky.server.models.Project;

public interface ProjectsDatabase extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {}
