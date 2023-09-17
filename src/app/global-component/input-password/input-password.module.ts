
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputPasswordComponent } from './input-password.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputPasswordComponent],
  exports: [InputPasswordComponent],
  bootstrap: [InputPasswordComponent]
})
export class InputPasswordModule { }
