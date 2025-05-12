import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule]
})
export class LoginComponent {
  private form = viewChild<NgForm>('form');
  private destroyRef = inject(DestroyRef)

  constructor() {
    afterNextRender(() => {
      /* 取得目前儲存的鍵值對 */
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        /* 要讓form先初始化，所以先等1豪秒 */
        setTimeout(() => {
          this.form()?.controls['email'].setValue(savedEmail)
        }, 1)
      }

      /* 改變儲存在瀏覽器的鍵值對 */
      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
      })

      this.destroyRef.onDestroy(() => subscription?.unsubscribe())
    })
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    formData.form.reset();
  }
}
