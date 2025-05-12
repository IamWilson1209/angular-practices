import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./app/tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./app/users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./app/not-found/not-found.component";
import { routes as userRoutes } from './app/users/users.routes';
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const canAccess = Math.random();
  if (canAccess < 1) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent
    // redirectTo: '/users/u1',
    // pathMatch: 'full' /* 代表''一定要完全match，前、後不可以有東西，就會導向/user/:userId */
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!'
    },
    resolve: {
      userName_: resolveUserName
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]