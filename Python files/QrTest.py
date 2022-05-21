import cv2
from pyzbar.pyzbar import decode
import time


def CodeReader():
    cap = cv2.VideoCapture(0)
    cap.set(3,640) #largeur de la fenêtre
    cap.set(4,480) #hauteur

    used_codes=[]
    camera = True

    while camera == True:
        success, frame = cap.read()

        for code in decode(frame):
            #print('printing data')
            res = code.data.decode('utf-8')
            #print(res)
            if (code.data.decode('utf-8')) not in used_codes:
                used_codes.append(code.data.decode('utf-8'))
            #time.sleep(5)
            camera = False

        #cv2.imshow('Testing', frame)
        #cv2.waitKey(1)
    cap.release()
    cv2.destroyAllWindows()
    return(res)

#CodeReader()



