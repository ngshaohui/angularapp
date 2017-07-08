import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  sidebarVisible: boolean;
  sidebarState: string;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sidebarVisible = true;
    this.sidebarState = "collapse";
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    console.log(`toggle sidebar visibility to ${this.sidebarVisible}`)
  }

  toggleSidebarState(): void {
    if (this.sidebarState === "expand") {
      this.sidebarState = "collapse";
    } else {
      this.sidebarState = "expand";
    }
    console.log(`toggle sidebar state to ${this.sidebarState}`)
  }

}
