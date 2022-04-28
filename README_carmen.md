# SD_Flextend

Senior Design Project: Cross-Platform Mobile Application 
Boston University Department of Electrical and Computer Engineering
Authors: Jack Halberian, Carmen Hurtado, Thomas Scrivanich

## Project Description

The goals of this project were to:
- Design a self-administered electrical device to measure the range of motion of a user’s knee.
- Create a mobile cross-platform application that will automate user progress tracking and goal setting. 
- Develop a system that has an exceptional user experience for patients of any age or background.  

The electrical component includes an Arduino Nano IoT, 2 MPU6050 units, a buzzer, a 9V battery. Read more [Here](LINK TO HW README).

On the software side, we build a cross-platform mobile application powered by React Native. The backend database service is [Google Firebase](https://console.firebase.google.com/u/0/project/flextend-c4648/overview). The appication communicates with the elctrical device via Bluetooth BLE on the Arduino nano IoT. 
The application allows the user to see measurement results instantly and save the data for progress vieweing later. It also allows for reminder and goal setting.  

### System diagram and flow chart 

Below is an image of the flow of the application. Dashed arrows indicate the data flow direction. Solid arrows indicate screen navigation. Screens are labeled. The main points to notice are that the Bluetooth conection to the arduino is only active when the user is inside the Measuring Screen, and that the connection to Firebase is through WiFi. 

![Flow Diagram](/images/flow-diagram.png)

## Backend DataBase 
TODO: talk about structure of the database
TODO: add images or diagram of what the collection and fields look like

## Deployment 
TODO: Add react installation and how to run th eproject 

### iOS Specific

### Android Specific
### React Native Dependencies 
All dependencies that need to be installed for this project are listed in the *requirements.txt* file and can be installed using `npm install --save -r requirements`

## Overview of Modules 
The project main components are separated under the *Components* folder.

### app.js

This module is the index component of the mobile application. Navigation stack containers are set up and handled here. There are two main screen stacks: one that is visible only when a user has logged in, and the other that is visible when the user is logged out.

### LoginScreen
### RegistrationScreen
### IntroSliderScreen
This component includes four slides that appear when a new user registers to the mobile application. These slides show the user the main features of our application. 

### HomeScreen 
### LiveMeasureScreen
### BLEScreen
### DeviceScreen
### PreviousResultsScreen
### ProfileScreen

This component includes a variety of functions for the user. The screen itself is comprised of a profile picture (or placeholder when is not set) and four buttons. The user can:
- Pick and set a profile picture from their phone. This is then stored in Firestore under an identifier for the user. If the user changes the image, this stored file is updated and older pictures are not saved. 
- Set their body metrics. Here the user can add their age and if they have had knee surgery. This values are used in relation with the knee flexion and extension data to create a report. 
- Set goals. The user can write what goals they want to achieve when using the app for progress tracking. The goals are stored in Firebase and displaye on the home screen as a checklist component. 
- Set and edit reminders. The user can set up calendar events reminders to use the application. This utilizes a 3rd party module that connects to the mobile phone's calendar (apple calendar or google calendar) and the user can customize the frequency, times, and notifications.
- See progress charts. The user can see their past measurements of knee flexion and extension in a bar graph format and see how it has changed through time. 

### ReportScreen
### ProgressScreen

TODO: COMMENT CODE AND CLEAN UP FUNCTIONS AND IMPORT THAT WERE NOT USED 






