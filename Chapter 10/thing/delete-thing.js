/**
 * Arduino IoT Cloud JS SDK 
 * File Name=delete-thing.js
 * Description: Below code will delete a thing via API on the bases of ID
 */

var AIotApi = require('@arduino/arduino-iot-client');
var rp = require('request-promise');

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



async function DeleteThing(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.ThingsV2Api()
    var id = 'ac9fc5fd-a946-406e-983d-715dcc2571b6'; // {String} The id of the thing
    var opts = {
      'force': true // {Boolean} If true, detach device from the other thing, and attach to this thing
    };
    api.thingsV2Delete(id, opts).then(function(data) {
      console.log('Thing Deleted successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
}


DeleteThing();