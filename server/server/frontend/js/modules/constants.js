'use strict';

var constants = angular.module('IoTConstants', []);

constants.provider('constant', function()
{
    var config =
    {
        serverUrl: 'https://d1303.de:3000',
        camRecordingDuration: 4,
        chartTypeTranslations: {
            "temperature": "Temperature (°C)",
            "cputemp": "CPU Temperature (°C)",
            "mem": "Memory Usage (%)",
            "load": "CPU Load",
            "humidity": "Humidity (%)",
            "distance": "Distance (cm)",
            "lightintensity": "Light Intensity",
            "light": "Light State",
            "soundvol": "Sound Volume",
            "sound": "Sound State",
            "movement1": "Movement (sensor 1)",
            "movement2": "Movement (sensor 2)",
            "poti": "Potentiometer",
            "reachability": "Smartphone Reachability",
            "measured_temperature_homematic": "Measured Temp (Homematic)",
            "desired_temperature_homematic": "Desired Temp (Homematic)",
            "desired_temperature_zwave": "Desired Temp (Z-Wave)",
            "measured_temperature_zwave": "Measured Temp (Z-Wave)",
            "battery_thermostat_zwave": "Battery Thermostat (Z-Wave)",
            "diskfree": "Free Disk (MB)",
            "watt": "Power consumption (Watt)",
            "meter": "Energy Meter (kwh)",
            "lux" : "Light intensity Z-Wave (Lux)",
            "battery_motionsensor_zwave": "Battery Motion Sensor (Z-Wave)",
            "movement_zwave": "Detected Movement (Z-Wave)",
            "altitude" : "Altitude (Meter)",
            "pressure": "Pressure (Pa)",
            "barometric_temp": "Temperature (Barometric)",
            "outside_temp": "Outside Temperature (°C)",
            "movement_temperature": "Temperature Movement Sensor"
        }
    };

    this.$get = function()
    {
        return {
            set: function(name, value)
            {
                config[name] = value;
            },
            get: function(name)
            {
                return config[name];
            }
        }
    };
});