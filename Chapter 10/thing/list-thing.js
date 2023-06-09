/**
 * Arduino IoT Cloud JS SDK 
 * File Name=list-thing.js
 * Description: Below code will list all thing via API on the bases of different options
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



async function ListThing(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.ThingsV2Api()
    var opts = {
        'acrossUserIds': false
    };
    api.thingsV2List(opts).then(function(data) {
        for(var i=0;i<data.length;i++){
            console.log("Thing ID:"+data[i].id+" Thing Name:"+data[i].name);
        }
      }, function(error) {
        console.error(error);
      });
}

ListThing();