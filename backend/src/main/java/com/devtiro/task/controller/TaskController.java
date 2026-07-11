package com.devtiro.task.controller;

import com.devtiro.task.domain.CreateTaskRequest;
import com.devtiro.task.domain.UpdateTaskRequest;
import com.devtiro.task.domain.dto.CreateTaskRequestDto;
import com.devtiro.task.domain.dto.TaskDto;
import com.devtiro.task.domain.dto.UpdateTaskRequestDto;
import com.devtiro.task.domain.entity.Task;
import com.devtiro.task.mapper.TaskMapper;
import com.devtiro.task.service.TaskService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/tasks")
public class TaskController {

  private final TaskService taskService;
  private final TaskMapper taskMapper;

  public TaskController(TaskService taskService, TaskMapper taskMapper) {
    this.taskService = taskService;
    this.taskMapper = taskMapper;
  }

  @PostMapping
  public ResponseEntity<TaskDto> createTask(
    @Valid @RequestBody CreateTaskRequestDto createTaskRequestDto
  ) {
    CreateTaskRequest createTaskRequest = taskMapper.fromDto(createTaskRequestDto);
    Task task = taskService.createTask(createTaskRequest);
    TaskDto createdTaskDto = taskMapper.toDto(task);
    return new ResponseEntity<>(createdTaskDto, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<TaskDto>> listTasks() {
    List<Task> tasks = taskService.listTasks();
    List<TaskDto> taskDtos = tasks.stream().map(taskMapper::toDto).toList();
    return ResponseEntity.ok(taskDtos);
  }

  @PutMapping(path = "/{taskId}")
  public ResponseEntity<TaskDto> updateTask(
    @PathVariable UUID taskId,
    @Valid @RequestBody UpdateTaskRequestDto updateTaskRequestDto
  ) {
    UpdateTaskRequest updateTaskRequest = taskMapper.fromDto(updateTaskRequestDto);
    Task task = taskService.updateTask(taskId, updateTaskRequest);
    TaskDto taskDto = taskMapper.toDto(task);
    return ResponseEntity.ok(taskDto);
  }

  @DeleteMapping(path = "/{taskId}")
  public ResponseEntity<Void> deleteTask(@PathVariable UUID taskId) {
    taskService.deleteTask(taskId);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

}
