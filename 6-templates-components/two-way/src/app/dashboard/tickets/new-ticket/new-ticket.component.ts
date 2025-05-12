import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, OnInit, output, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { ControlComponent } from '../../../ui/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  // @Output() add = new EventEmitter();
  add = output<{ title: string, text: string }>();
  enteredTitle = '';
  enteredText = '';

  onSubmit() {
    console.log(this.enteredTitle)
    console.log(this.enteredText)

    this.add.emit({ title: this.enteredTitle, text: this.enteredText });

    this.enteredText = '';
    this.enteredTitle = '';
    this.form()?.nativeElement.reset();
  }

  ngOnInit() {
    console.log('After View Init!!');
    console.log(this.form()?.nativeElement)
  }

  ngAfterViewInit(): void {
    console.log('After View Init!!');
    console.log(this.form()?.nativeElement)
  }
}
