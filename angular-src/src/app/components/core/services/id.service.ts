import { Injectable } from '@angular/core';

const shortid = require('shortid');

@Injectable()
export class IdService {

  constructor() { }

  generateUniqueId(): string {
    return shortid.generate();
  }

}