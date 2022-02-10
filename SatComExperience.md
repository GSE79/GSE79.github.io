### SatCom Antenna Control System for [GX Operation](https://www.inmarsat.com/en/solutions-services/global-xpress.html)
for [Comtech CSI](https://comtechsystems.com/)
- Full Linux Embedded Platform with
  - SNMP, Apache, and SSH
  - Serial, TCP, UDP, IIC, and SPI devices
  - Built from [ccOS](https://github.com/InMechaSol/ccOS#ccos-extends-ccnoos)
- User Interfaces
  - Feature Rich Web User Interface in HTML, CSS, and Javascript
  - Console Menu Interface served via Local LCD/Keypad and SSH
- Operator Interfaces
  - .NET Calibration Tools for External Devices
  - .NET Token Based Authentication Tool for Production Configuration
- Development Operations
  - Enterprise Solution based on [InMechaSol's EcoSystem Approach](https://github.com/InMechaSol/IMS#an-enterprise-solution)  
  
### Antenna Reference Unit for [Dual Terminal System](https://www.envistacom.com/wp-content/uploads/Phoenix-Case-Study.pdf)
for [Envistacom](https://www.envistacom.com/)
- Distributed System for Control of RF Communication Performance
  - Mixed system of [Atmel processors](https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/32-bit-mcus/sam-32-bit-mcus/sam-d) on custom PCBs
  - Single [NVIDIA Compute Module](https://developer.nvidia.com/embedded/jetson-modules) with Linux
    - Proxied access to all internal PCBs (Atmel processors)
  - SNMP and SSH
  - Serial, IIC, and SPI devices
  - Built from [IMS_Packets_Core](https://inmechasol.com/IMS_Packets_Core/index.html)
- User Interfaces
  - Console Menu Interface served via Local LCD/Keypad
  - [CodeMettle GUI](https://www.codemettle.com/) via SNMP v3
- Operator Interfaces
  - Developer Debug Interfaces served via Direct USB connection to internal PCBs
  - WIN32 Simulation Framework
- Development Operations
  - Custom cross-platform system utilizing nested git submodules, arduino libraries, and WIN32 test environment  

### Antenna Motion Controller for [O3B Operation](https://o3bmpower.ses.com/)
for [AvL Technologies](https://www.avltech.com/)
- Full Linux Embedded Platform with
  - SNMP, Apache, and SSH
  - Serial, TCP, UDP, IIC, and SPI devices
  - Built to Run on [AAQ Hardware](https://www.avltech.com/technology/6)
- User Interfaces
  - Feature Rich Web User Interface in HTML, CSS, and Javascript
- Operator Interfaces
  - SSH Debug Console
- Development Operations
  - Simple Git Repositories and GCC build tools  

### Ground Station Motion Control Sub-System
for [ViaSat](https://www.viasat.com/products/satellite-antennas/)
- A [Bosch Rexroth](https://www.boschrexroth.com/en/us/) implementation
  - Multi-Axis, Dual-Drive, Torque Biased, Antenna Motion Control System 
  - Real-Time UDP Command API driven by Linux Antenna Controller System
  - Motion Performance and Control Tuning to Scale with Antenna Sizes 
