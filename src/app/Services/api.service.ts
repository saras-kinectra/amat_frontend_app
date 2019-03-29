import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { String, StringBuilder } from 'typescript-string-operations';

import { environment } from '../../environments/environment';
import { EnvService } from '../env.service';

@Injectable()
export class ApiService {
   
    // public static BASE_URL: string = "ec2-18-209-103-144.compute-1.amazonaws.com:3000/";
    /* 13-12-2018*/
    // public static BASE_URL: string = "http://ec2-18-209-103-144.compute-1.amazonaws.com:3000/";
    /* 14-12-2018*/
    //public static BASE_URL: string = "http://ec2-34-229-95-172.compute-1.amazonaws.com/amatg3mapper/api/";   

    //'Authorization': 'Basic OWFlMGYzMmY2NjRkNWYxOGFiMjExZmE2NTlkYzIzNjc6ODZlNmVjYzA3NWNiNmZhYjc0NDE4NjhjZDhmZTllMmM='


    public httpHeaders = new HttpHeaders({

        'Content-Type': 'application/json',
        // 'Authorization': 'bearer' + ' ' + localStorage.getItem('accessToken')
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        // 'Authorization': 'Basic ' + btoa(environment.apiBasicAuthUsername+':'+environment.apiBasicAuthPassword)
    });


    //GET METHODS
    private GET_PLATFORMS: string = environment.apiUrl + "Platforms";

    private GET_USER_INFO: string = environment.apiUrl + "me";

    public GET_CHAMBERS_BY_PLATFORM_ID: string = environment.apiUrl + "Platforms/{0}/Chambers";


    //POST METHODS
    public FIND_PRODUCTS_FOR_CHAMBERS: string = environment.apiUrl + "Chambers/FindProductsForChambers";

    public FIND_COMPATABILITY_INFO_FOR_CHAMBERS: string = environment.apiUrl + "Chambers/FindCompatibilityInfoForChambers";

    public ADD_OPPORTUNITIES: string = environment.apiUrl + "Opportunities";

    constructor(private httpClient: HttpClient, private env : EnvService) { 


        // this.GET_PLATFORMS = this.env.apiUrl + "Platforms";
        // this.GET_CHAMBERS_BY_PLATFORM_ID = this.env.apiUrl + "Platforms/{0}/Chambers";
        // this.FIND_PRODUCTS_FOR_CHAMBERS = this.env.apiUrl + "Chambers/FindProductsForChambers";
        // this.FIND_COMPATABILITY_INFO_FOR_CHAMBERS = this.env.apiUrl + "Chambers/FindCompatibilityInfoForChambers";
        // this.ADD_OPPORTUNITIES = this.env.apiUrl + "Opportunities";
    }

    getPlatforms() {

        console.log("ApiService getPlatforms");
        return this.httpClient.get(this.GET_PLATFORMS, { headers: this.httpHeaders });
    }

    getUserInfo(){

        return this.httpClient.get(this.GET_USER_INFO, { headers: this.httpHeaders });
    }

    getChambersByPlatformID(platformID: string) {

        console.log("ApiService getChambersByPlatformID platformID: " + platformID);

        var getChambersByPlatformIDURL = String.Format(this.GET_CHAMBERS_BY_PLATFORM_ID, platformID);
        console.log("ApiService getChambersByPlatformID getChambersByPlatformIDURL: " + getChambersByPlatformIDURL);

        return this.httpClient.get(getChambersByPlatformIDURL, { headers: this.httpHeaders });
    }

    findCompatibilityInfoForChamberIds(chamberIDs: any[], platFormID) {

        console.log("ApiService findCompatibilityInfoForChamberIds messages: ", chamberIDs);

        const bodyParams = {

            "platformId": platFormID,
            "chamberIds": chamberIDs
            // "includeRndTypeMatches": isRnDSelected
        }

        console.log("ApiService findCompatibilityInfoForChamberIds bodyParams: ", JSON.stringify(bodyParams));

        return this.httpClient.post(this.FIND_COMPATABILITY_INFO_FOR_CHAMBERS, JSON.stringify(bodyParams), { headers: this.httpHeaders });
    }

    findProductsForChambers(platFormID, chamberIDs: any[]) {

        console.log("ApiService getChambersByPlatformID");
        console.log("ApiService getChambersByPlatformID messages: ", chamberIDs);

        const bodyParams = {

            'platformId' : platFormID, 
            'chamberIds': chamberIDs,
        }

        console.log("ApiService getChambersByPlatformID bodyParams: ", JSON.stringify(bodyParams));

        return this.httpClient.post(this.FIND_PRODUCTS_FOR_CHAMBERS, JSON.stringify(bodyParams), { headers: this.httpHeaders });
    }

    addOpportunities(opID: string, opportunityProduct: any) {

        console.log("ApiService addOpportunities");
        
        console.log("ApiService addOpportunities opID: " + opID);
        console.log("ApiService addOpportunities opportunityProduct: " + JSON.stringify(opportunityProduct));

        const bodyParams = {

            'op_id' : opID, 
            'product_name': opportunityProduct.product_name,
            'product_code' : opportunityProduct.product_code, 
            'nearest_product_config_name': opportunityProduct.nearest_product_config_name,
            'platform_name' : opportunityProduct.platform_name, 
            'configuration': opportunityProduct.configuration,
        };

        console.log("ApiService addOpportunities bodyParams: " + JSON.stringify(bodyParams));

        return this.httpClient.post(this.ADD_OPPORTUNITIES, bodyParams, { headers: this.httpHeaders });
    }
}