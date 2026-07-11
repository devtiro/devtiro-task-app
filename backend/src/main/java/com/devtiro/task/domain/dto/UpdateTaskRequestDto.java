package com.devtiro.task.domain.dto;

import com.devtiro.task.domain.entity.TaskPriority;
import com.devtiro.task.domain.entity.TaskStatus;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import org.hibernate.validator.constraints.Length;

public record UpdateTaskRequestDto(
  @NotBlank(message = ERROR_MESSAGE_TITLE_LENGTH)
  @Length(max = 255, message = ERROR_MESSAGE_TITLE_LENGTH)
  String title,
  @Length(max = 1000, message = ERROR_MESSAGE_DESCRIPTION_LENGTH)
  @Nullable
  String description,
  @FutureOrPresent(message = ERROR_MESSAGE_DUE_DATE_FUTURE)
  @Nullable
  LocalDate dueDate,
  @NotNull(message = ERROR_MESSAGE_PRIORITY)
  TaskPriority priority,
  @NotNull(message = ERROR_MESSAGE_STATUS)
  TaskStatus status
) {

  private static final String ERROR_MESSAGE_TITLE_LENGTH =
    "Title must be between 1 and 255 characters";

  private static final String ERROR_MESSAGE_DESCRIPTION_LENGTH =
    "Description must be less than 1000 characters";

  private static final String ERROR_MESSAGE_DUE_DATE_FUTURE =
    "Due date must be in the future";

  private static final String ERROR_MESSAGE_PRIORITY =
    "Task priority must be provided";

  private static final String ERROR_MESSAGE_STATUS =
    "Task status must be provided";
}
