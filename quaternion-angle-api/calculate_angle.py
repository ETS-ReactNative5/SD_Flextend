'''
IMPORTANT THINGS TO NOTE:
    This code is built for a specific sensor that already has a built-in function for many of the calculations
    To adapt this code for our use, we are going to need to keep track of values in variables and use them as we go.
    Not exactky sure if that makes sense and will work!
'''

import time 
import calculate_angle_utils 

## Change the COM port names as needed 
## First device 
serial_port0 = threespace.openPort("COM10") 

## Second device 
serial_port1 = threespace.openPort("COM11") 
print "To quit, hold down \"Ctrl\" key and press \"C\" key" 
print "---------------------------------------------------" 
print "Get into the starting position." 
time.sleep(3) 
print "Please hold for 10 seconds to compensate for device positioning." 
time.sleep(5) 

## Calculate the rotational offset of the compensation for the the first device 
offset0 = calculate_angle_utils.offsetQuaternion(serial_port0) 

## Calculate the rotational offset of the compensation for the the second device 
offset1 = calculate_angle_utils.offsetQuaternion(serial_port1) 

time.sleep(2) 

while True: 
    ## Calculate the forward vector of the first device 
    ## The initial forward vector to use depends on the orientation and axis direction of the device 
    ## The resultant vector must be heading up the arm 
    forward0 = calculate_angle_utils.calculateDeviceVector(serial_port0, [0.0, 0.0, 1.0], offset0) 
    
    ## Calculate the forward vector of the second device 
    ## The initial forward vector to use depends on the orientation and axis direction of the device 
    ## The resultant vector must be heading up the arm 
    forward1 = calculate_angle_utils.calculateDeviceVector(serial_port1, [0.0, 0.0, 1.0], offset1) 
    
    ## Calculate a vector perpendicular to the forward vectors and parallel to the axis  
    ## of rotation to use for determining the sign of the angle 
    ## Using the first device's orientation will give the best results
     ## The initial vector to use depends on the initial forward vector 
     up0 = calculate_angle_utils.calculateDeviceVector(serial_port0, [0.0, 1.0, 0.0], offset0) 
     
     ## Calculate the angle between the two devices 
     angle = calculate_angle_utils.calculateAngle(forward1, forward0, up0) 
     ## Print as radians and degrees 
    #  print "Hinge" 
    #  print "Radians: %0.4f\tDegrees: %0.4f" % (angle, threespace.math.degrees(angle)) 
    #  print "============================================" 

## Close the serial ports 
threespace.closePort(serial_port0) 
threespace.closePort(serial_port1) 