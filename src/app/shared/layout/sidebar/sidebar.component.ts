import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  @Input() menuShow: boolean = false;
  @Output() menu = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  
  ejecutarMenu() {
    this.menu.emit();
  }

}
