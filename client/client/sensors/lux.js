"use strict";

var baseSensor = require("./baseSensor");
var config = require("../config");
var logger = require("../logger");
var fhem = require("../fhemmanagement");
const INTERVAL = 5000;

// ######################################################

class lux extends baseSensor
{
    constructor(options)
    {
        super("lux", options);
        this.read();
    }

    read()
    {
        var that = this;

        var motionSensorName = this.options.motionSensorName;
        var requestObject = '{ReadingsVal("' + motionSensorName + '","luminance","")}';
        var url = "fhem?cmd=" + requestObject + "&XHR=1";

        fhem.get(url, function(err, body)
        {
            if (err) {
                logger.error(err);
            } else {
                var lux = body.match(/(\d+)\sLux/);

                if (!lux) {
                    logger.error("fhem zwave get lux could not parse " + body);
                } else {
                    lux = lux[1];
                    that.senddata(lux, that);
                }
            }

            setTimeout(function()
            {
                that.read();
            }, INTERVAL);
        });
    }
}

module.exports = lux;