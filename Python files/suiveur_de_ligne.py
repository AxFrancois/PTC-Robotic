import RPi.GPIO as IO
import time
import serial
#import QrTest.py

#--------------UART init-------------------------------------
ser = serial.Serial(
        port='/dev/ttyAMA0',
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
)

#--------------GPIO init-------------------------------------
IO.setwarnings(False)
IO.setmode(IO.BCM)

IO.setup(2,IO.IN) #GPIO 2 -> Left IR out
IO.setup(3,IO.IN) #GPIO 3 -> Right IR out

# IO.setup(4,IO.OUT) #GPIO 4 -> Motor 1 terminal A
# IO.setup(22,IO.OUT) #GPIO 22 -> Motor 1 terminal B
# IO.setup(17,IO.OUT) #GPIO 17 -> Motor Left terminal A
# IO.setup(18,IO.OUT) #GPIO 18 -> Motor Left terminal B

#--------------Main------------------------------------------

while 1:

    if(IO.input(2)==True and IO.input(3)==True):    #move forward     
        print('sending Forward')
        data = 'F'
        ser.write(str(data).encode())
        time.sleep(0.5) 

    elif(IO.input(2)==False and IO.input(3)==True): #turn right  
        print('sending Right')
        data = 'R'
        ser.write(str(data).encode())
        time.sleep(0.5)  

    elif(IO.input(2)==True and IO.input(3)==False): #turn left
        print('sending Left')
        data = 'L'
        ser.write(str(data).encode())
        time.sleep(0.5)  

    else:                                           #stay still
        print('sending Stop')
        data = 'S'
        ser.write(str(data).encode())
        time.sleep(0.5)
    
    