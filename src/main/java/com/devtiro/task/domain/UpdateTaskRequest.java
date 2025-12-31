package com.devtiro.task.domain;

import com.devtiro.task.domain.entity.TaskPriority;
import com.devtiro.task.domain.entity.TaskStatus;
import java.time.LocalDate;

public record UpdateTaskRequest(
  String title,
  String description,
  LocalDate dueDate,
  TaskStatus status,
  TaskPriority priority
) {

}
