import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() menu = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  
  ejecutarMenu() {
    this.menu.emit();
  }

}
