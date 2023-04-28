/**
 * Arduino IoT Cloud JS SDK 
 * File Name=timeseries-prop-device.js
 * Description: Below code will list timeseries data of device properties via API
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



async function ShowDevice(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.DevicesV2Api()
    var DeviceID = 'ef63111f-72bb-4826-84bb-02093d4d85f1'; // {String} The id of the device
    var PropertyID = 'b9e0714f-2b9e-4641-aff0-440a795e51c2'; // {String} The id of the property
    var opts = {
        'limit': 56, // {Integer} The number of properties to select
        'start':'2023-04-12T00:00:00Z'
    };
    api.devicesV2Timeseries(DeviceID, PropertyID, opts).then(function(data) {
      console.log('Device Created successfully. Returned data: ' + util.inspect(data));
    }, function(error) {
      console.error(error);
    });
}

ShowDevice();