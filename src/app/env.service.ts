import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUrl = 'http://ec2-34-229-95-172.compute-1.amazonaws.com/amatg3mapper/api/';

  constructor() {}

}
