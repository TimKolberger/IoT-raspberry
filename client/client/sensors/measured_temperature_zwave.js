"use strict";

var baseSensor = require("./baseSensor");
var config = require("../config");
var logger = require("../logger");
var fhem = require("../fhemmanagement");

// ######################################################

class measured_temperature_zwave extends baseSensor
{
    constructor(options)
    {
        super("measured_temperature_zwave", "Measured Temp (Z-Wave)", options);
        this.read();

        this.refreshCounter = 0;
    }

    refresh()
    {
        var shouldTrigger = (this.refreshCounter % 10 === 0)
        this.refreshCounter++;
        if (!shouldTrigger) return;

        var t = this.options.thermostatName;
        var refreshattribute = "smStatus";

        fhem.refreshAttribute(t, refreshattribute, function(err, body)
        {
            if (err) {
                logger.error("zwave measured refresh: ", err);
            } else {
                //logger.info("zwave measured refresh: ", body);
            }
        });
    }

    read()
    {
        var that = this;
        that.refresh();

        var thermostatName = that.options.thermostatName;

        fhem.readValue(thermostatName, "temperature", function(err, body)
        {
            if (err) {
                logger.error(err);
            } else {
                var temp = parseFloat(body, 10);

                if (isNaN(temp)) {
                    logger.error("fhem zwave get measured temperature could not parse " + body);
                } else {
                    that.senddata(temp, that);
                }
            }

            setTimeout(function()
            {
                that.read();
            }, that.options.interval * 1000);
        });
    }
}

module.exports = measured_temperature_zwave;