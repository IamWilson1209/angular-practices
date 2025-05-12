import { ChangeDetectorRef, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages$ = new BehaviorSubject<string[]>([]);

  // private messages = signal<string[]>([]);
  private messages: string[] = [];

  get allMessages() {
    return [...this.messages];
  }
  // allMessages = this.messages.asReadonly();

  addMessage(message: string) {
    // this.messages.update((prevMessages) => [...prevMessages, message]);
    this.messages = [...this.messages, message];
    this.messages$.next([...this.messages]);
  }
}