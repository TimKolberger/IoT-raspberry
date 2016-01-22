var fs = require("fs");
var logger = require('../logger');
const INTERVAL = 5000;

var readTemp = function(cb)
{
    return fs.readFile("/sys/class/thermal/thermal_zone0/temp", function(err, data)
    {
        if (err)
            return cb(err);

        data = parseFloat(data, 10) / 1000;

        return cb(null, data);
    });
};

var sendTempLoop = function(ondata)
{
    readTemp(function(err, temp)
    {
        if (!err)
            ondata(temp);

        setTimeout(function()
        {
            sendTempLoop(ondata);
        }, INTERVAL);
    });
}

exports.watch = function(ondata, onclose)
{
    logger.info("watching cpu temperature");

    sendTempLoop(ondata);
};
