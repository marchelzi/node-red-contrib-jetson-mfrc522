from time import sleep
import sys
from Jetson_MFRC522 import SimpleMFRC522
import RPi.GPIO as GPIO
import json
reader = SimpleMFRC522()

if len(sys.argv) > 0:

    reader = SimpleMFRC522()

    while True:
        try:
            uuid, text = reader.read()
            print(
                json.dumps(
                    {
                        "uuid": uuid,
                        "text": text,
                    }
                )
            )
            sleep(int(sys.argv[1]))
        except (EOFError, SystemExit, KeyboardInterrupt):
            GPIO.cleanup()
            sys.exit(0)

else:
    print("Bad arguments - please provide a sleep time")
