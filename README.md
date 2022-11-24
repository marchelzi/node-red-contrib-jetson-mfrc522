
A [Node-Red][1] node that allows you to read NFC tags with an RC522 card reader.
Tested the node on a Jetson Nano.

Requirements
------------
- [Python3][2]
- [Jetson.GPIO][3]
- [Jetson-MFRC522][4]
------------
Enable SPI
------------
- Next, configure the Jetso for SPI, use the command
```
    sudo /opt/nvidia/jetson-io/jetson-io.py
```
-Select Configure Jetson 40pin Header
-Then, Select Configure Header pins manually
-Select spi1 and then select exit
-Select Save pin changes
-Select Save and reboot to reconfigure pins
- Last, use the following command to enable spidev
```
sudo modprobe spidev
```
-----
WIRING
---
You need to connect to RC522 card reader to the following pins:

```
|      | PIN |
|------|-----|
| SDA  | 24  |
| SCK  | 23  |
| MOSI | 19  |
| MISO | 21  |
| GND  | 6   |
| RST  | 22  |
| 3.3V | 1   |
```
NOTES
----
Currently this project only support reading tags on SPI bus 0.0. Also, the node only supports reading tags, not writing tags.

[1]:	https://nodered.org
[2]:	https://www.python.org
[3]:    https://github.com/NVIDIA/jetson-gpio
[4]:    https://github.com/SantaCRC/Jetson-MFRC522
