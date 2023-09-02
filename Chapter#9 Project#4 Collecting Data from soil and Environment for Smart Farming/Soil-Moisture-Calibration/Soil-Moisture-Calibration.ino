#include <Adafruit_ADS1X15.h>

//Adafruit_ADS1115 ads;  /* Use this for the 16-bit version */
Adafruit_ADS1015 ads;     /* Use this for the 12-bit version */

int AirValue[]={957,967,962,976};
int WaterValue[]={387,400,407,400};

void setup(void)
{
  Serial.begin(9600);
  Serial.println("Hello!");

  Serial.println("Getting single-ended readings from AIN0..3");
  Serial.println("ADC Range: +/- 6.144V (1 bit = 3mV/ADS1015, 0.1875mV/ADS1115)");

  if (!ads.begin()) {
    Serial.println("Failed to initialize ADS.");
    while (1);
  }
}

void loop(void)
{
  int16_t adc0, adc1, adc2, adc3;
  float volts0, volts1, volts2, volts3;

  adc0 = getSoilMositure(0);
  volts0 = ads.computeVolts(adc0);
  delay(1000);
  adc1 = getSoilMositure(1);
  volts1 = ads.computeVolts(adc1);
  delay(1000);

  adc2 = getSoilMositure(2);
  volts2 = ads.computeVolts(adc2);
  delay(1000);

  adc3 = getSoilMositure(3);
  volts3 = ads.computeVolts(adc3);
  delay(1000);
  
  Serial.print("AIN0: "); Serial.print(adc0); Serial.print("  "); Serial.print(volts0); Serial.print("V");Serial.print("  "); Serial.print(map(adc0, WaterValue[0] ,AirValue[0], 100, 0));Serial.println("%");
  Serial.print("AIN1: "); Serial.print(adc1); Serial.print("  "); Serial.print(volts1); Serial.print("V");Serial.print("  "); Serial.print(map(adc1, WaterValue[1],AirValue[1], 100, 0));Serial.println("%");
  Serial.print("AIN2: "); Serial.print(adc2); Serial.print("  "); Serial.print(volts2); Serial.print("V");Serial.print("  "); Serial.print(map(adc2, WaterValue[2] ,AirValue[2], 100, 0));Serial.println("%");
  Serial.print("AIN3: "); Serial.print(adc3); Serial.print("  "); Serial.print(volts3); Serial.print("V");Serial.print("  "); Serial.print(map(adc3, WaterValue[3] ,AirValue[3], 100, 0));Serial.println("%");
}

float getSoilMositure(int Pin){

  float SoilMositure=0;
  
    //loop 10 times for averaging
  for(int j = 0; j < 5; j++){
    //SoilMositure+= analogRead(Pin);
    SoilMositure+= ads.readADC_SingleEnded(Pin);
    delay(1000);
  }

  //divide by 10 to get the average
  SoilMositure /= 5;
  

  return SoilMositure;
 }
