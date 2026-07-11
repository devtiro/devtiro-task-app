package com.devtiro.task.mapper;

import com.devtiro.task.domain.CreateTaskRequest;
import com.devtiro.task.domain.UpdateTaskRequest;
import com.devtiro.task.domain.dto.CreateTaskRequestDto;
import com.devtiro.task.domain.dto.TaskDto;
import com.devtiro.task.domain.dto.UpdateTaskRequestDto;
import com.devtiro.task.domain.entity.Task;

public interface TaskMapper {

  CreateTaskRequest fromDto(CreateTaskRequestDto dto);

  UpdateTaskRequest fromDto(UpdateTaskRequestDto dto);

  TaskDto toDto(Task task);

}
