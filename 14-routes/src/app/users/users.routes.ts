import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix', /* 代表user/:userId只要前面match，就會導向user/:userId/tasks */
  },
  {
    path: 'tasks', // users/<uid>/tasks
    component: TasksComponent,
    title: 'tasks hi'
  },
  {
    path: 'tasks/new', // users/<uid>/tasks/new
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage]
  }
]