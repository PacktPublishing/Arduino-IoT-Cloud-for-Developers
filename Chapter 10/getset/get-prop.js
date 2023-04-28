/**
 * Arduino IoT Cloud JS SDK 
 * File Name=get-prop.js
 * Description: Below code will get the last value of cloud variables via API on the bases of Thing & Property ID
 */

var IotApi = require('@arduino/arduino-iot-client');
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

async function GetProperty(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = IotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new IotApi.PropertiesV2Api()
    var thingid = "8aee742e-4492-423d-9f19-79fec856b917"; // {String} The id of the thing
    var propertyid = "182d7319-5c36-4988-a5b8-ace2df7bd08a"; // {String} The id of the property
    var opts = {
    'showDeleted': false // {Boolean} If true, shows the soft deleted properties
    };
    api.propertiesV2Show(thingid, propertyid, opts).then(function(data) {
    console.log('Last Value of Property=' + data.last_value);
    }, function(error) {
    console.error(error);
    });
}
GetProperty();