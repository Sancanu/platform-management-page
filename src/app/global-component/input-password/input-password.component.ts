import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {
  @Output() onChange = new EventEmitter<string>();
  @Input() data: string ="";
  @Input() placerholder: string="";
  @Input() className: string ="";
  type: string = "password";
  show: boolean = false;
  icon: string = "linio-44";

  constructor() { 
  }

  ngOnInit(): void { }

  onToggleShow() {
    this.show = !this.show;
    this.type = this.show ? "text" : "password";
    this.icon = this.show ? "linio-58" : "linio-44"
  }

  onInputSelect(value:any) {
    this.onChange.emit(value.target.value);
  }
}
