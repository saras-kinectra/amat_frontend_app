import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { String, StringBuilder } from 'typescript-string-operations';

@Injectable()
export class ApiService {
   
    // public static BASE_URL: string = "ec2-18-209-103-144.compute-1.amazonaws.com:3000/";
    /* 13-12-2018*/
    // public static BASE_URL: string = "http://ec2-18-209-103-144.compute-1.amazonaws.com:3000/";
    /* 14-12-2018*/
    public static BASE_URL: string = "http://ec2-34-229-95-172.compute-1.amazonaws.com/amatg3mapper/api/";   

    public httpHeaders = new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': 'Basic OWFlMGYzMmY2NjRkNWYxOGFiMjExZmE2NTlkYzIzNjc6ODZlNmVjYzA3NWNiNmZhYjc0NDE4NjhjZDhmZTllMmM='
    });


    //GET METHODS
    private GET_PLATFORMS: string = ApiService.BASE_URL + "Platforms";

    public GET_CHAMBERS_BY_PLATFORM_ID: string = ApiService.BASE_URL + "Platforms/{0}/Chambers";


    //POST METHODS
    public FIND_PRODUCTS_FOR_CHAMBERS: string = ApiService.BASE_URL + "Chambers/FindProductsForChambers";

    public FIND_COMPATABILITY_INFO_FOR_CHAMBERS: string = ApiService.BASE_URL + "Chambers/FindCompatibilityInfoForChambers";

    public ADD_OPPORTUNITIES: string = ApiService.BASE_URL + "Opportunities";


    constructor(private httpClient: HttpClient, private storageService: StorageService) { }

    getPlatforms() {

        console.log("ApiService getPlatforms");

        return this.httpClient.get(this.GET_PLATFORMS, { headers: this.httpHeaders });
    }

    getChambersByPlatformID(platformID: string) {

        console.log("ApiService getChambersByPlatformID");

        console.log("ApiService getChambersByPlatformID platformID: " + platformID);

        var getChambersByPlatformIDURL = String.Format(this.GET_CHAMBERS_BY_PLATFORM_ID, platformID);
        console.log("ApiService getChambersByPlatformID getChambersByPlatformIDURL: " + getChambersByPlatformIDURL);

        return this.httpClient.get(getChambersByPlatformIDURL, { headers: this.httpHeaders });
    }

    findCompatibilityInfoForChamberIds(chamberIDs: any[], platFormID) {

        console.log("ApiService findCompatibilityInfoForChamberIds");
        console.log("ApiService platForm_ID");

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