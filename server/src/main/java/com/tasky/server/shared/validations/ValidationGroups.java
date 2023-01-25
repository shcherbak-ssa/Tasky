package com.tasky.server.shared.validations;

import jakarta.validation.groups.Default;

public interface ValidationGroups {

  public interface ToCreate extends Default {}

  public interface ToUpdate extends Default {}

  public interface Optional extends Default {}

}
