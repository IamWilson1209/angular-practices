import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent] /* 共享 */
})
export class SharedModule { }