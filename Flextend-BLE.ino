/*
  LED

  This example creates a BLE peripheral with service that contains a
  characteristic to control an LED.

  The circuit:
  - Arduino MKR WiFi 1010, Arduino Uno WiFi Rev2 board, Arduino Nano 33 IoT,
    Arduino Nano 33 BLE, or Arduino Nano 33 BLE Sense board.

  You can use a generic BLE central app, like LightBlue (iOS and Android) or
  nRF Connect (Android), to interact with the services and characteristics
  created in this sketch.

  This example code is in the public domain.
*/

#include <ArduinoBLE.h>
#include <Wire.h>

BLEService flextendService("19B10000-E8F2-537E-4F6C-D104768A1214"); // BLE LED Service

// BLE LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEStringCharacteristic flexionCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLENotify, 10);
BLEStringCharacteristic extensionCharacteristic("C5CA3B17-A86F-44DB-AD39-D248FB05D0BD", BLERead | BLENotify, 10);
BLEStringCharacteristic measureCharacteristic("ADFD6F66-2A72-42DD-B1D6-7B27832FA025", BLERead | BLEWriteWithoutResponse | BLEWrite, 20);
BLEStringCharacteristic calibrationCharacteristic("77B25143-5A38-4B8A-AAA0-BF28E09C4B18", BLERead | BLEWriteWithoutResponse | BLEWrite, 20);

//const int ledPin = LED_BUILTIN; // pin to use for the LED

const int MPU_addr1 = 0x68;
const int MPU_addr2 = 0x69;


int findMin(int data[] , int s)
{
  int min_val = data[0]; // assume 1 element in array
  for (int i = 1; i < s; i++)
  {
    if (data[i] <= min_val)
    {
      min_val = data[i];
    }
  }
  return min_val;
}

int findMax(int data[] , int s)
{
  int max_val = data[0]; // assume 1 element in array
  for (int i = 1; i < s; i++)
  {
    if (data[i] >= max_val)
    {
      max_val = data[i];
    }
  }
  return max_val;
}

void setup() {
  Wire.begin();
  Wire.beginTransmission(MPU_addr1);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
//  Serial.begin(9600);

  Wire.begin();
  Wire.beginTransmission(MPU_addr2);
  Wire.write(0x6B);  // PWR_MGMT_1 register
  Wire.write(0);     // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);
//  Serial.begin(9600);
//  while (!Serial);

  // set LED pin to output mode
  //  pinMode(ledPin, OUTPUT);

  // begin initialization
  if (!BLE.begin()) {
//    Serial.println("starting BLE failed!");

    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setDeviceName("Flextend");
  BLE.setLocalName("Flextend");
  BLE.setAdvertisedService(flextendService);

  // add the characteristic to the service
  flextendService.addCharacteristic(flexionCharacteristic);
  flextendService.addCharacteristic(extensionCharacteristic);
  flextendService.addCharacteristic(measureCharacteristic);
  flextendService.addCharacteristic(calibrationCharacteristic);

  // add service
  BLE.addService(flextendService);

  // set the initial value for the characeristic:
  //  String message(i);
  //  degreesCharacteristic.writeValue(message);
  String measuring("NOTMEASURING");
  String calibrating("NOTCALIBRATING");
  measureCharacteristic.writeValue(measuring);
  calibrationCharacteristic.writeValue(calibrating);

  // start advertising
  BLE.advertise();

//  Serial.println("Flextend BLE Peripheral");
}

void loop() {
  // listen for BLE peripherals to connect:
  BLEDevice central = BLE.central();

  // if a central is connected to peripheral:
  if (central) {
//    Serial.print("Connected to central: ");
    // print the central's MAC address:
//    Serial.println(central.address());

    // while the central is still connected to peripheral:
    while (central.connected()) {
      bool isMeasuring = false;
      bool isCalibrating = false;

      int16_t AcX1, AcY1, AcZ1, AcX2, AcY2, AcZ2;


      int count;
      int minVal = 265;
      int maxVal = 402;

      double raw1, raw2, x1, x2, Angle, OFF1, OFF2, sum1, sum2;

      int degrees_array[2000]; // assume no more than 2000 entries are measured
      for (int i = 0; i < 2000; i++)
      {
        degrees_array[i] = 0;
      }
      int i = 0;

      if (calibrationCharacteristic.value() == "CALIBRATING")
      {
        isCalibrating = true;
      }
      else if (calibrationCharacteristic.value() == "NOTCALIBRATING")
      {
        isCalibrating = false;
      }

      if (isCalibrating)
      {
        float v1[20], v2[20], t1, t2;
        //Calibration Code
        if (central.connected())
        {
//          Serial.println("CONNECTED");
        }
        
//        Serial.println("Calibrating");
        count = 0;

        while (count < 20) {

          Wire.beginTransmission(MPU_addr1);
          Wire.write(0x3B);
          Wire.endTransmission(false);
          Wire.requestFrom(MPU_addr1, 14, true);
          AcX1 = Wire.read() << 8 | Wire.read();
          AcY1 = Wire.read() << 8 | Wire.read();
          AcZ1 = Wire.read() << 8 | Wire.read();
          int xAng1 = map(AcX1, minVal, maxVal, -90, 90);
          int yAng1 = map(AcY1, minVal, maxVal, -90, 90);
          int zAng1 = map(AcZ1, minVal, maxVal, -90, 90);


          t1 = RAD_TO_DEG * (atan2(-yAng1, -zAng1) + PI);

          if (t1 < 180) {

            v1[count] = t1 + 360;
          }

          else {

            v1[count] = t1;
          }


          Wire.beginTransmission(MPU_addr2);
          Wire.write(0x3B);
          Wire.endTransmission(false);
          Wire.requestFrom(MPU_addr2, 14, true);
          AcX2 = Wire.read() << 8 | Wire.read();
          AcY2 = Wire.read() << 8 | Wire.read();
          AcZ2 = Wire.read() << 8 | Wire.read();
          int xAng2 = map(AcX2, minVal, maxVal, -90, 90);
          int yAng2 = map(AcY2, minVal, maxVal, -90, 90);
          int zAng2 = map(AcZ2, minVal, maxVal, -90, 90);

          t2 = RAD_TO_DEG * (atan2(-yAng2, -zAng2) + PI);

          if (t2 < 180) {

            v2[count] = t2 + 360;
          }

          else {

            v2[count] = t2;
          }
          count++;
        }

        sum1 = 0;
        sum2 = 0;

        for (int i = 0; i < 20; i++) {
          sum1 += v1[i];
          sum2 += v2[i];
        }
  
        OFF1 = 360 - (sum1 / 20);
        OFF2 = 360 - (sum2 / 20);
//        Serial.println(OFF1);
//        Serial.println(OFF2);
        String calibrating("NOTCALIBRATING");
        calibrationCharacteristic.writeValue(calibrating);
        isCalibrating = false;
      }

      if (measureCharacteristic.value() == "MEASURING")
      {
        isMeasuring = true;
      }
      else if (measureCharacteristic.value() == "NOTMEASURING")
      {
        isMeasuring = false;
      }
      while (isMeasuring) // begin measuring degrees
      {

        int count;
        int minVal = 265;
        int maxVal = 402;

        double raw1, raw2, x1, x2, Angle, OFF1, OFF2, sum1, sum2;

        
        if (central.connected())
        {
//          Serial.println("CONNECTED");
        }
        if (measureCharacteristic.written())
        {
//          Serial.println("WRITTEN");
        }
        if (measureCharacteristic.value() == "NOTMEASURING")
        {
//          Serial.println("Done Measuring");
//          for (int i = 0; i < 2000; i++)
//          {
//            Serial.println(i);
//            Serial.println(degrees_array[i]);
//          }
          int min_val = findMin(degrees_array, i);
          int max_val = findMax(degrees_array, i);
          String min_string(min_val);
          String max_string(max_val);
//          Serial.println(min_string);
//          Serial.println(max_string);
          flexionCharacteristic.writeValue(min_string);
          extensionCharacteristic.writeValue(max_string);
          isMeasuring = false;
          i = 0;
          for (int i = 0; i < 2000; i++)
          {
            degrees_array[i] = 0;
          }
        }
        Wire.beginTransmission(MPU_addr1);
        Wire.write(0x3B);
        Wire.endTransmission(false);
        Wire.requestFrom(MPU_addr1, 14, true);
        AcX1 = Wire.read() << 8 | Wire.read();
        AcY1 = Wire.read() << 8 | Wire.read();
        AcZ1 = Wire.read() << 8 | Wire.read();
        int xAng1 = map(AcX1, minVal, maxVal, -90, 90);
        int yAng1 = map(AcY1, minVal, maxVal, -90, 90);
        int zAng1 = map(AcZ1, minVal, maxVal, -90, 90);

        raw1 = RAD_TO_DEG * (atan2(-yAng1, -zAng1) + PI);

        if (raw1 > 180) {
          x1 = (raw1 - 360) + OFF1;
        }

        else {
          x1 = raw1 + OFF1;
        }


        Wire.beginTransmission(MPU_addr2);
        Wire.write(0x3B);
        Wire.endTransmission(false);
        Wire.requestFrom(MPU_addr2, 14, true);
        AcX2 = Wire.read() << 8 | Wire.read();
        AcY2 = Wire.read() << 8 | Wire.read();
        AcZ2 = Wire.read() << 8 | Wire.read();
        int xAng2 = map(AcX2, minVal, maxVal, -90, 90);
        int yAng2 = map(AcY2, minVal, maxVal, -90, 90);
        int zAng2 = map(AcZ2, minVal, maxVal, -90, 90);

        raw2 = RAD_TO_DEG * (atan2(-yAng2, -zAng2) + PI);

        if (raw2 > 180) {
          x2 = (raw2 - 360) + OFF2;
        }

        else {
          x2 = raw2 + OFF2;
        }

        if ((x1 > 0 && x2 > 0) || (x1 < 0 && x2 < 0)) {
          Angle = abs (180 - abs(abs(x1) - abs(x2)));
        }

        else {
          Angle = abs ( 180 - abs(abs(x1) + abs(x2)) );
        }
        degrees_array[i] = Angle;
//        Serial.println(degrees_array[i]);
        i++;
        delay(200);
      }
    }
    // when the central disconnects, print it out:
//    Serial.print(F("Disconnected from central: "));
//    Serial.println(central.address());
  }
}
