import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { String, StringBuilder } from 'typescript-string-operations';

import { environment } from '../../environments/environment';
import { EnvService } from '../env.service';

@Injectable()
export class ApiService {

    public httpHeaders = new HttpHeaders({

        'Content-Type': 'application/json',
    });

    //GET METHODS
    private GET_PLATFORMS: string = environment.apiUrl + "Platforms";
    private GET_USER_INFO: string = environment.apiUrl + "me";

    public GET_CHAMBERS_BY_PLATFORM_ID: string = environment.apiUrl + "Platforms/{0}/Chambers";


    //POST METHODS
    public FIND_PRODUCTS_FOR_CHAMBERS: string = environment.apiUrl + "Chambers/FindProductsForChambers";

    public FIND_COMPATABILITY_INFO_FOR_CHAMBERS: string = environment.apiUrl + "Chambers/FindCompatibilityInfoForChambers";

    public ADD_OPPORTUNITIES: string = environment.apiUrl + "Opportunities";

    constructor(private httpClient: HttpClient, private env : EnvService) { }

    getPlatforms() {

        return this.httpClient.get(this.GET_PLATFORMS, { headers: this.httpHeaders });
    }

    getUserInfo(){

        return this.httpClient.get(this.GET_USER_INFO, { headers: this.httpHeaders });
    }

    getChambersByPlatformID(platformID: string) {

        var getChambersByPlatformIDURL = String.Format(this.GET_CHAMBERS_BY_PLATFORM_ID, platformID);
        return this.httpClient.get(getChambersByPlatformIDURL, { headers: this.httpHeaders });
    }

    findCompatibilityInfoForChamberIds(chamberIDs: any[], platFormID) {

        const bodyParams = {
            "platformId": platFormID,
            "chamberIds": chamberIDs
        }
        return this.httpClient.post(this.FIND_COMPATABILITY_INFO_FOR_CHAMBERS, JSON.stringify(bodyParams), { headers: this.httpHeaders });
    }

    findProductsForChambers(platFormID, chamberIDs: any[]) {

        const bodyParams = {
            'platformId' : platFormID, 
            'chamberIds': chamberIDs,
        }
        return this.httpClient.post(this.FIND_PRODUCTS_FOR_CHAMBERS, JSON.stringify(bodyParams), { headers: this.httpHeaders });
    }

    addOpportunities(opID: string, opportunityProduct: any) {

        const bodyParams = {
            'op_id' : opID, 
            'product_name': opportunityProduct.product_name,
            'product_code' : opportunityProduct.product_code, 
            'nearest_product_config_name': opportunityProduct.nearest_product_config_name,
            'platform_name' : opportunityProduct.platform_name, 
            'configuration': opportunityProduct.configuration,
        };
        return this.httpClient.post(this.ADD_OPPORTUNITIES, bodyParams, { headers: this.httpHeaders });
    }
}