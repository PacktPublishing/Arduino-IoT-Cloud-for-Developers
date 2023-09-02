/**
 * Arduino IoT Cloud JS SDK 
 * File Name=delete-device.js
 * Description: Below code will delete a device via API
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



async function DeleteDevice(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.DevicesV2Api();
    var DeviceID="84065d08-5cc1-4fbb-a950-7d29e6cd9ef0";
    var options = {
    };
    api.devicesV2Delete(DeviceID, options).then(function(data) {
      console.log('Device Deleted successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
}

DeleteDevice();