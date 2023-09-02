/**
 * Arduino IoT Cloud JS SDK 
 * File Name=show-thing.js
 * Description: Below code will show complete details of thing via API on the bases of thing id
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



async function ShowThing(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.ThingsV2Api()
    var thingid='ef63111f-72bb-4826-84bb-02093d4d85f1';
    var opts = {
        //'showDeleted': false
    };
    api.thingsV2Show(thingid, opts).then(function(data) {
        console.log('API called successfully. Returned data: ' +util.inspect(data));
      }, function(error) {
        console.error(error);
      });
}

ShowThing();