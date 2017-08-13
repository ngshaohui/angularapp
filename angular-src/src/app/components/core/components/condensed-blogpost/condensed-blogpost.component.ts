import { Component, Input, OnInit } from '@angular/core';

import { Blogpost } from '../../models/blogpost';

@Component({
  selector: 'app-condensed-blogpost',
  templateUrl: './condensed-blogpost.component.html',
  styleUrls: ['./condensed-blogpost.component.scss']
})
export class CondensedBlogpostComponent implements OnInit {

  @Input()
  blogpost: Blogpost;

  constructor() { }

  ngOnInit() {
  }

}
