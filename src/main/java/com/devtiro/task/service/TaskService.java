package com.devtiro.task.service;

import com.devtiro.task.domain.CreateTaskRequest;
import com.devtiro.task.domain.UpdateTaskRequest;
import com.devtiro.task.domain.entity.Task;
import java.util.List;
import java.util.UUID;

public interface TaskService {

  Task createTask(CreateTaskRequest request);

  List<Task> listTasks();

  Task updateTask(UUID taskId, UpdateTaskRequest request);

  void deleteTask(UUID taskId);

}
