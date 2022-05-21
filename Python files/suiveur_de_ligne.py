import RPi.GPIO as IO
import time
import serial
import CodeReader from QrTest

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

#--------------Main------------------------------------------
tourne = False
reader = True
while 1:

    if(IO.input(2)==True and IO.input(3)==True):    #move forward     
        tourne = False
        reader = True
        print('sending Forward')
        data = 'F0000000'
        ser.write(str(data).encode())
        time.sleep(0.1) 

    elif(IO.input(2)==False and IO.input(3)==True): #turn right  
        tourne = True
        reader = True
        print('sending Right')
        data = 'R0000000'
        data2 = data
        ser.write(str(data).encode())
        time.sleep(0.1)  

    elif(IO.input(2)==True and IO.input(3)==False): #turn left
        tourne = True
        reader = True
        print('sending Left')
        data = 'L0000000'
        data2 = data
        ser.write(str(data).encode())
        time.sleep(0.1)  

    else:                                           #stay still
        if (tourne == False and reader == True):
                print('sending Stop')
                data = 'S0000000'
                res = CodeReader()
                ser.write(str(data).encode())
                time.sleep(0.1)
                ser.write(str(res).encode())
                time.sleep(0.1)
        if (tourne == False and reader == False):
                print('sending Stop but no QR')
                data = 'S0000000'
                ser.write(str(data).encode())
                time.sleep(0.1)
        else :
                print('Jump')
                ser.write(str(data2).encode())
                time.sleep(0.1)
    
    
