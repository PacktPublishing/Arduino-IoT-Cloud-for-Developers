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

async function ThingProperty(){

    // Configure OAuth2 access token for authorization: oauth2
    var client = IotApi.ApiClient.instance;
    var oauth2 = client.authentications['oauth2'];
    oauth2.accessToken = await getToken();

    var api = new IotApi.PropertiesV2Api()
    var id = "ef63111f-72bb-4826-84bb-02093d4d85f1"; // {String} The id of the thing
    var pid = "79decda8-ba31-4e62-b0b1-23e71e677013"; // {String} The id of the property
    var opts = {
    'showDeleted': false // {Boolean} If true, shows the soft deleted properties
    };
    api.propertiesV2Show(id, pid, opts).then(function(data) {
    console.log('API called successfully. Last Value of Property=' + data.last_value);
    }, function(error) {
    console.error(error);
    });
}
ThingProperty();