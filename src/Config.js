
export const config = {
    auth: {
        clientId: "d463d9b4-2fff-4c42-9426-9bb8225c3b1a",
        authority: "https://login.microsoftonline.com/7d129d3f-ab94-4d72-8385-e96e9d52bb56",
        // redirectUri: "https://blue-bay-005c6630f.2.azurestaticapps.net",
        // redirectUri:"https://wonderful-beach-0fdfad40f.2.azurestaticapps.net"
        redirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

export const authenticationParameters = {
    scopes: [
        'user.read'
    ]
}
export const spot_index_mandatory_fields = ["MANDT", "ZSOURCEFEED", "ZSYMBOL", "ZBATE", "ZEFFDATE", "ZEFFTIME", "ZCREATE_DATE", "ZCREATE_TIME", "ZNETPRICE", "CORRECTED", "LATEST", "STATUS", "MDC_DESCR", "CURRENCY", "UOM", "CONVERT_FACTOR", "ZPRODUCT", "PRODUCT_GRADE", "DLVRY_REGION", "CONTRACT_TYPE", "HOLIDAY_SCHED", "QUOSRC", "QUOTYP", "QUOTNO", "INDEX_CODE"]

    
