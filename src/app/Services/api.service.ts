import { Model } from './../models/model';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

    baseUrl: string = "http://65.19.149.190/smartwatch/api";
    ;
    constructor(private httpClient: HttpClient, private storageService: StorageService) {

      

    }

    getId(model: Model) {


        console.log("service", model.id);
        const headers = new HttpHeaders({

            'Content-Type': 'application/json',
        //  'access_token': 'bearer LAVSARVWjHzqY8gCAhTx-AHekpcIRAH41z_SwM7cIPAWDNnbOsWeteiRra8p7WzwIcY_O9l9TpsqprCHRK4WMOFX4Ev_ArRU1mBB7-hqaEtIAuD2AOmAmSzaXOntIIqk80Pup1jCZ_HjpWHgzgZN8B2-jCWPBOy7tOV3ANrK__rt2Vx_AuDt6egMlc15P8RQU_zEwRsXaC1oINil3d0lAH4tOkVAqmT4OxP71WIn9CpMfl4iNspFMbVlaj8HO4PNJxUG-IKhVTdcK-Sm0Z1JTqW9PTgthuLJ-W2RE6QQl1nw7UXCh4gjGgAKhNA8g-jdH8L9xwY0aYvdNw8XgCb3n3AnqTDwepRW79wYFStGynzcZ1JF8TxOdqUoktvEXsmomVuQmuxL7NlmJIO6qWZV7TYHqY-bhoTIh3uU58kNGmG7JpPEVxFRb9DYSK1QqYPBqWk0RfopntKicFjpzFnw6UAc_ipjgwzwVKIXnNu8VPv_LjOqttPBNgjFl6C5l3jM'
        
    });

        return this.httpClient.get(this.baseUrl + '/Product/GetProductSizesByProductType/' + model.id,
            { headers: headers });

    }


}
