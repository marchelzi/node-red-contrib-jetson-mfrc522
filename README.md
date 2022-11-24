
[DEVELOPMENT]

A [Node-Red][1] node that allows you to read NFC tags with an RC522 card reader.
Tested the node on a Jetson Nano.

You need to connect to RC522 card reader to the following pins:

```
RFID module	Jetson
SDA	Pin 24
SCK	Pin 23
MOSI	Pin 19
MISO	Pin 21
GND	Pin 6
RST	Pin 22
3.3V	Pin 1
```


[1]:	https://nodered.org
