#include <Adafruit_NeoPixel.h>

#define LED_PIN    D3

// How many NeoPixels are attached to the Arduino?
#define LED_COUNT 16

// Declare our NeoPixel strip object:
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {

  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(50); // Set BRIGHTNESS to about 1/5 (max = 255)
}

// loop() function -- runs repeatedly as long as board is on ---------------
void loop() {

  for(int i=0; i<LED_COUNT+1; i++){
    strip.setBrightness(50);
    strip.setPixelColor(i, strip.Color(127+i, 127, 127)); //  Set pixel's color (in RAM)
    strip.show();    
    delay(200);
  }

    for(int i=0; i<LED_COUNT+1; i++){
    strip.setBrightness(0);
    strip.setPixelColor(i, strip.Color(0, 0, 0)); //  Set pixel's color (in RAM)
    strip.show();    
  }
  
}
