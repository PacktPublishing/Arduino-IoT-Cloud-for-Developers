/**
 * Arduino IoT Cloud JS SDK 
 * File Name=update-thing.js
 * Description: Below code will update a thing via API on the bases of ID
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



async function UpdateThing(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.ThingsV2Api()
    var id = 'd99e244d-f245-4e27-9ead-717e52ac5a96'; // {String} The id of the thing
    var thingUpdate = {
        'name':'Sense the Env Thing Via API Update',
        'timezone':'Asia/Karachi',
        'device_id':'e88b84a7-7ad7-4c2b-b79c-ab426e47dc67'
    }; 
    var opts = {
      'force': true // {Boolean} If true, detach device from the other thing, and attach to this thing
    };
    api.thingsV2Update(id,thingUpdate, opts).then(function(data) {
      console.log('Thing Updated successfully. Returned data: ' + util.inspect(data));
    }, function(error) {
      console.error(error);
    });
}


UpdateThing();