// color foo
var lightctrl = require('./lightctrl.js');
var modes     = lightctrl.modes;
var client    = new lightctrl.DmxClient("10.1.20.164");

var c1_blue  = {red:0, green:0, blue:255};
var c1_green = {red:0, green:255, blue:0};
var c1_red   = {red:255, green:0, blue:0};
var c1_white = {red:255, green:255, blue:255};

var left   = new lightctrl.Device(client, 78, modes['1_segment']);
var middle = new lightctrl.Device(client, 67, modes['1_segment']);
var right  = new lightctrl.Device(client, 56, modes['1_segment']);

var colors = [c1_blue, c1_green, c1_red];
var len = colors.length;
var cyclewait = 250;
var counter = 0;
var cycleColors = function(){
    left.setVals(colors[(counter+0)%len]);
    middle.setVals(colors[(counter+1)%len]);
    right.setVals(colors[(counter+2)%len]);
    client.channelsCommit();
    counter++;
    setTimeout(cycleColors, cyclewait);
};
cycleColors();
