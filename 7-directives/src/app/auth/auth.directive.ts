import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        /* 呈現的ref改成建構的ref */
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        /* 清除呈現的ref */
        this.viewContainerRef.clear();
      }
    })
  }

}
