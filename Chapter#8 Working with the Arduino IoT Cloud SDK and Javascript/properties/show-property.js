/**
 * Arduino IoT Cloud JS SDK 
 * File Name=show-property.js
 * Description: Below code will display the properties of specific cloud variable via API on the bases of thing id & cloud variable id
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



async function ShowProperty(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = AIotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new AIotApi.PropertiesV2Api()
    var thing_id="6b6cd076-5859-4a6d-9b4e-18879893c6cb";
    var property_id="b357a513-ad2b-4e1f-a76b-6dac078e36d5";
    var opts = {
      'showDeleted': true // {Boolean} If true, shows the soft deleted properties
    };
    api.propertiesV2Show(thing_id, property_id, opts).then(function(data) {
      console.log('API called successfully. Returned data: ' + util.inspect(data));
    }, function(error) {
      console.error(error);
    });
}

ShowProperty();