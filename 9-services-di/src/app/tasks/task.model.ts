import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

/* 創建custom DI but not Service */

type TaskStatusOptionsType = { value: 'open' | 'in-progress' | 'done', taskStatus: TaskStatus, text: string }[]

export const TASK_STATUS_OPTION = new InjectionToken<TaskStatusOptionsType>('task-status-options')

export const TaskStatusOptions: TaskStatusOptionsType = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed'
  }
]

export const taskStatusOptionsProvider: Provider = { provide: TASK_STATUS_OPTION, useValue: TaskStatusOptions }