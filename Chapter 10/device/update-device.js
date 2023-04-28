/**
 * Arduino IoT Cloud JS SDK 
 * File Name=update-device.js
 * Description: Below code will update a device via API
 */

//6e3d308c-dfb2-49ad-aa61-998227f214ab
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



async function UpdateDevice(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.DevicesV2Api();
    var DeviceID="e88b84a7-7ad7-4c2b-b79c-ab426e47dc67";
    var DeviceProperties = {
        'name':'Sense Home WeMos D1 Mini Series',
        'connection_type':'wifi',
        'fqbn':'esp8266:esp8266:d1_mini',
        'type':'login_and_secretkey_wifi'
        
    };  
    var options = {
        
    };
    api.devicesV2Update(DeviceID,DeviceProperties, options).then(function(data) {
      console.log('Device Updated successfully. Returned data: ' + util.inspect(data));
    }, function(error) {
      console.error(error);
    });
}

UpdateDevice();