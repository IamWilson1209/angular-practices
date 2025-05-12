import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivate, CanDeactivateFn, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = signal(false);
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted.set(true);
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, /* 確保使用者不可以用瀏覽器的返回見返回上一頁 */
    });
  }
}


export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted()) {
    return true;
  }
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    return window.confirm("Do you really want to leave, you will lose data!!")
  }
  return true;
}