import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser"
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { SharedModule } from "./ui/shared.module";
import { TasksModule } from "./tasks/tasks.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
  ], /* Module */
  bootstrap: [AppComponent],
  imports: [BrowserModule, FormsModule, SharedModule, TasksModule] /* Standalone components */
})
export class AppModule { }