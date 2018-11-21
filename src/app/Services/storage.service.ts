import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor() { }

    setData(key: string, data: any) {
        localStorage.setItem(key, data);
    }

    getData(key: string): any {
        return localStorage.getItem(key);
    }

}
