package com.devtiro.task.domain;

import com.devtiro.task.domain.entity.TaskPriority;
import java.time.LocalDate;

public record CreateTaskRequest(
  String title,
  String description,
  LocalDate dueDate,
  TaskPriority priority
) {

}
