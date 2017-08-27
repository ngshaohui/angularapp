// TODO snazzymaps

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'planner-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title: string;
  lat: number;
  lng: number;

  constructor() { }

  ngOnInit() {
    this.title = 'My first AGM project';
    this.lat = 51.678418;
    this.lng = 7.809007;
  }

}
