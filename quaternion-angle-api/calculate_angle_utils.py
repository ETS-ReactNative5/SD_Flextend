import serial 
import struct
import math

## Static Variables ## 
START_BYTE = chr(0xf7) 
READ_FILT_TARED_QUAT_COMMAND = chr(0x00) 
READ_FILT_QUAT_COMMAND = chr(0x06) 
READ_NORTH_GRAVITY_COMMAND = chr(0x0c) 
SET_TARE_QUAT_COMMAND = chr(0x61) 

###########################################################################################################################

def commandWriteRead(serial_port, command, byte_size=0, data_format='', input_data=[]):
    """ Writes and reads data to and from a serial port given.
        Args:
            serial_port: A Serial object that is communicating with a 3-Space Sensor device. 
            command: A char string of one of the 3-Space Sensor device's commands.
            byte_size: The number of bytes to read from the serial port.
            data_format: The format for which struct is to pack or unpack data. 
            input_data: Data to be sent to the 3-Space Sensor device. 
    """
    data_str = ''     
    if len(input_data) > 0:         
        data_str = struct.pack(data_format, *input_data)         
        command_data = START_BYTE + command + data_str + createCheckSum(command + data_str) 

    try:         
        serial_port.write(command_data)     
    except Exception as ex:         
        print "There was an error writing command to the port", serial_port.name         
        raise ex          
        
    if byte_size > 0:         
        try:             
            data_str = serial_port.read(byte_size)         
        except Exception as ex:             
            print "There was an error reading from the port", serial_port.name             
            raise ex                  
        output_data = list(struct.unpack(data_format, data_str))         
        return output_data          
    return None 

###########################################################################################################################

def vectorDot(vec0, vec1):
    """ Performs the dot product on the two given vectors """
    x0, y0, z0 = vec0     
    x1, y1, z1 = vec1          
    
    return x0 * x1 + y0 * y1 + z0 * z1 

###########################################################################################################################

def vectorLength(vec):     
    """ Calculates the length of a vector given.                  
        Args:             
            vec: A vector.     
    """     
    return (vectorDot(vec, vec) ** 0.5)

###########################################################################################################################

def vectorNormalize(vec):
    """ Normalizes the given vector"""

    length = vectorLength(vec)     
    x, y, z = vec          

    return [x / length, y / length, z / length]

###########################################################################################################################

def vectorCross(vec0, vec1):     
    """ Performs the cross product on the two given vectors.                  
        Args:             
            vec0: A unit vector.             
            vec1: A unit vector.     
    """     
    x0, y0, z0 = vec0     
    x1, y1, z1 = vec1          
    
    return [y0 * z1 - z0 * y1, z0 * x1 - x0 * z1, x0 * y1 - y0 * x1] 

###########################################################################################################################

def calculateAngle(vec0, vec1, vec2=None): 
    """ Calculates the angle between the two given vectors using the dot product.
        Args: 
            vec0: A unit vector.
            vec1: A unit vector.
            vec2: A unit vector perpendicular to vec0 and vec1. 
    """

    ## The max and min is used to account for possible floating point error     
    dot_product = max(min(vectorDot(vec0, vec1), 1.0), -1.0)     
    angle = math.acos(dot_product) 

    if vec2 is not None:         
        axis = vectorNormalize(vectorCross(vec0, vec1))         
        angle = math.copysign(angle, vectorDot(vec2, axis))    
              
    return angle 

###########################################################################################################################

def createQuaternion(vec, angle):     
    """ Creates a quaternion from an axis and an angle.                  
        Args:             
            vec: A unit vector.             
            angle: An angle in radians.          
    """ 
    ## Quaternions represent half the angle in complex space so the angle must be halved     
    x, y, z = vec     
    tmp_quat = [0.0] * 4     
    tmp_quat[0] = x * math.sin(angle / 2.0)     
    tmp_quat[1] = y * math.sin(angle / 2.0)     
    tmp_quat[2] = z * math.sin(angle / 2.0)     
    tmp_quat[3] = math.cos(angle / 2.0) 

    ## Normalize the quaternion     
    qx, qy, qz, qw = tmp_quat     
    length = (qx * qx + qy * qy + qz * qz + qw * qw) ** 0.5          
    
    tmp_quat[0] /= length     
    tmp_quat[1] /= length     
    tmp_quat[2] /= length     
    tmp_quat[3] /= length          
    
    return tmp_quat 

###########################################################################################################################

def quaternionMultiplication(quat0, quat1):     
    """ Performs quaternion multiplication on the two given quaternions.                  
        Args:             
            quat0: A unit quaternion.             
            quat1: A unit quaternion.     
    """     
        
    x0, y0, z0, w0 = quat0 
    x1, y1, z1, w1 = quat1 

    x_cross, y_cross, z_cross = vectorCross([x0, y0, z0], [x1, y1, z1])     
    w_new = w0 * w1 - vectorDot([x0, y0, z0], [x1, y1, z1])     
    x_new = x1 * w0 + x0 * w1 + x_cross     
    y_new = y1 * w0 + y0 * w1 + y_cross     
    z_new = z1 * w0 + z0 * w1 + z_cross          
    
    return [x_new, y_new, z_new, w_new]

###########################################################################################################################

def quaternionVectorMultiplication(quat, vec):     
    """ Rotates the given vector by the given quaternion.                  
        Args:             
            quat: A unit quaternion.             
            vec: A unit vector.     
    """
    ## Procedure: quat * vec_quat * -quat     
    qx, qy, qz, qw = quat     
    vx, vy, vz = vec     
    vw = 0.0     
    neg_qx = -qx     
    neg_qy = -qy     
    neg_qz = -qz     
    neg_qw = qw 

    ## First Multiply     
    x_cross, y_cross, z_cross = vectorCross([qx, qy, qz], vec)     
    w_new = qw * vw - vectorDot([qx, qy, qz], vec)     
    x_new = vx * qw + qx * vw + x_cross     
    y_new = vy * qw + qy * vw + y_cross     
    z_new = vz * qw + qz * vw + z_cross

    ## Second Multiply     
    x_cross, y_cross, z_cross = vectorCross([x_new, y_new, z_new], [neg_qx, neg_qy, neg_qz])     
    w = w_new * neg_qw - vectorDot([x_new, y_new, z_new], [neg_qx, neg_qy, neg_qz])     
    x = neg_qx * w_new + x_new * neg_qw + x_cross     
    y = neg_qy * w_new + y_new * neg_qw + y_cross     
    z = neg_qz * w_new + z_new * neg_qw + z_cross          
    
    return [x, y, z] 

###########################################################################################################################
def offsetQuaternion(serial_port, gravity=[-1.0, 0.0, 0.0], init_offset=None): 
    """ Calculates the offset of the 3-Space Sensor device on the human body. 
      Args: 
        serial_port: A Serial object that is communicating with a 3-Space Sensor device. 
        gravity: A unit vector that denotes the gravity direction the 3-Space Sensor device should be reading.
        init_offset: A unit quaternion the denotes a rotational offset for a 3-Space Sensor device
    """

    ## First, find what the device reads as the gravity direction using the read North Gravity command     
    ## The command returns 6 floats, the first 3 make the North vector and the last 3 make the Gravity     
    ## vector     
    north_gravity = commandWriteRead(serial_port, READ_NORTH_GRAVITY_COMMAND, byte_size=24, data_format='>ffffff')     #I BELIVE I CAN RAED THIS DIRECTLY BECAUSE THERE ARE ONLY 3 VALUES
    sensor_gravity = north_gravity[3:] 

    ## Second, read the current filtered orientation as a quaternion from the device using the read     
    ## Filtered Quaternion command     
    filt_data = commandWriteRead(serial_port, READ_FILT_QUAT_COMMAND, byte_size=16,data_format='>ffff') 

    ## Third, using the gravity vector given and the Gravity vector from the device,      
    ## calculate the angle between them and a vector perpendicular to them     
    angle = calculateAngle(sensor_gravity, gravity)     
    axis = vectorNormalize(vectorCross(sensor_gravity, gravity)) 

    ## Fourth, create a quaternion using the calculated axis and angle that will be used to offset the     
    ## filtered quaternion of the device so the gravity vectors will line up     
    ## Also apply the initial offset if any     
    offset = createQuaternion(axis, -angle)     
    if init_offset is not None:
        offset = quaternionMultiplication(offset, init_offset)     
    tare_data = quaternionMultiplication(filt_data, offset) #THIS PART IS IMPORTANT BECAUSE IT TELLS THE DEVICE THE ORIENTATION WE NEED IT TO BE IN

    ## Fifth, set the offset filtered quaternion as the tare orientation for the device      
    ## using the set Tare Quaternion command     
    commandWriteRead(serial_port, SET_TARE_QUAT_COMMAND, data_format='>ffff', input_data=tare_data) 

    ## The calculated offset quaternion is returned because it needs to be applied      
    ## to the filtered tared quaternion received from the device     
    return offset 

###########################################################################################################################

def calculateDeviceVector(serial_port, vec, offset):     
    """ Calculates a vector in a 3-Space Sensor device's reference frame.                  
        Args:             
            serial_port: A Serial object that is communicating with a 3-Space Sensor device.             
            vec: A unit vector.             
            offset: A unit quaternion that denotes the offset of the 3-Space Sensor device.     
    """ 
    ## Get the filtered tared orientation of the device     
    data = commandWriteRead(serial_port, READ_FILT_TARED_QUAT_COMMAND, byte_size=16, data_format='>ffff')

    ## Apply the offset for the device 
    quat = quaternionMultiplication(data, offset) 
    
    ## Calculate a vector for the device with its orientation 
    vector = quaternionVectorMultiplication(quat, vec) 
    
    return vector 