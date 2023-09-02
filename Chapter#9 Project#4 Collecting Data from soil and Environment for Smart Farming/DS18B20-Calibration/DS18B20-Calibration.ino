#include <OneWire.h>
#include <DallasTemperature.h>

OneWire ds18x20[] = {32,33,25,26};
const int oneWireCount = sizeof(ds18x20)/sizeof(OneWire);
DallasTemperature sensor[oneWireCount];

float TempArray[4];

void setup() {
  
  Serial.begin(9600);      // Initialize serial 
 
  // Start up the library on all defined bus-wires
  DeviceAddress deviceAddress;
  for (int i = 0; i < oneWireCount; i++) {;
    sensor[i].setOneWire(&ds18x20[i]);
    sensor[i].begin();
    if (sensor[i].getAddress(deviceAddress, 0)) sensor[i].setResolution(deviceAddress, 12);
  }

  
}

void loop() {
  Serial.print("Requesting temperatures...");
  for (int i = 0; i < oneWireCount; i++) {
    sensor[i].requestTemperatures();
    TempArray[i]=sensor[i].getTempCByIndex(0);
    delay(1000); //1 Second Delay 
  }
  Serial.println("DONE");

  
   for (int i = 0; i < 4; i++) {
      Serial.print("Temperature#"+String(i+1)+"  ");
      Serial.print(TempArray[i]);
      Serial.print("\t");
      Serial.println("");
   }

   delay(5000);
  
}
