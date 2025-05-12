import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent implements OnInit {
  // messages = input.required<string[]>();
  private messagesService = inject(MessagesService);
  private cdRef = inject(ChangeDetectorRef);
  private destroRef = inject(DestroyRef)

  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  messages: string[] = [];
  ngOnInit() {
    const sub = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    })
    this.destroRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
