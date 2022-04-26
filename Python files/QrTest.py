import cv2
from pyzbar.pyzbar import decode
import time

#-------cv2 init-----------------------------------

cap = cv2.VideoCapture(0)
cap.set(3,640) #largeur de la fenêtre
cap.set(4,480) #hauteur

#-------main---------------------------------------

used_codes=[]
camera = True

while camera == True:
    success, frame = cap.read()
    
    for code in decode(frame):
        #print('printing data')
        print(code.data.decode('utf-8'))
        if (code.data.decode('utf-8')) not in used_codes:
            used_codes.append(code.data.decode('utf-8'))
        #time.sleep(5)
        camera = False
        
    cv2.imshow('Testing', frame)
    cv2.waitKey(1)

#-------end----------------------------------------
cap.release()
cv2.destroyAllWindows()




