/**
 * Arduino IoT Cloud JS SDK 
 * File Name=delete-property.js
 * Description: Below code will delete the property for thing via API on the bases of thing id
 */

var AIotApi = require('@arduino/arduino-iot-client');
var rp = require('request-promise');
var util = require("util");
async function getToken() {
    var options = {
        method: 'POST',
        url: 'https://api2.arduino.cc/iot/v1/clients/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        json: true,
        form: {
            grant_type: 'client_credentials',
            client_id: 'YV0nrlEO6VRtWAc9xA3pWtxrYaMrjSJL',
            client_secret: 'ql4zjAEKoKIoWVRyRvHH6R141Ja7HKO7EaruZYaFjlRiLMrxgfu7QD4wdSTGGaMO',
            audience: 'https://api2.arduino.cc/iot'
        }
    };

    try {
        const response = await rp(options);
        return response['access_token'];
    }
    catch (error) {
        console.error("Failed getting an access token: " + error)
    }
}



async function DeleteProperty(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.PropertiesV2Api()
    var thing_id="d99e244d-f245-4e27-9ead-717e52ac5a96";
    var property_id="c4dc8f92-b62f-44df-9455-74cdd08041bc";
    var options = {
        'force':true
    };
    api.propertiesV2Delete(thing_id,property_id, options).then(function(data) {
        console.log('Property Deleted successfully. Returned data: ' +data);
      }, function(error) {
        console.error(error);
      });
}

DeleteProperty();