// red segment bouncing
var lightctrl = require('./lightctrl.js');
var modes     = lightctrl.modes;
var client    = new lightctrl.DmxClient("10.1.20.164");

var c3_red_l = {
    red_l   : 255,
    green_l : 0,
    blue_l  : 0,
    red_m   : 0,
    green_m : 0,
    blue_m  : 0,
    red_r   : 0,
    green_r : 0,
    blue_r  : 0};
var c3_red_m = {
    red_l   : 0,
    green_l : 0,
    blue_l  : 0,
    red_m   : 255,
    green_m : 0,
    blue_m  : 0,
    red_r   : 0,
    green_r : 0,
    blue_r  : 0};
var c3_red_r = {
    red_l   : 0,
    green_l : 0,
    blue_l  : 0,
    red_m   : 0,
    green_m : 0,
    blue_m  : 0,
    red_r   : 255,
    green_r : 0,
    blue_r  : 0};
var c3_black = {
    red_l   : 0,
    green_l : 0,
    blue_l  : 0,
    red_m   : 0,
    green_m : 0,
    blue_m  : 0,
    red_r   : 0,
    green_r : 0,
    blue_r  : 0};


var left   = new lightctrl.Device(client, 78, modes['3_segment']);
var middle = new lightctrl.Device(client, 67, modes['3_segment']);
var right  = new lightctrl.Device(client, 56, modes['3_segment']);

var colors = [c3_red_l, c3_red_m, c3_red_r];
var lights = [left, middle, right];
var frames = [  [left, c3_red_l],   [left, c3_red_m],   [left, c3_red_r],
                [middle, c3_red_l], [middle, c3_red_m], [middle, c3_red_r],
                [right, c3_red_l],  [right, c3_red_m],  [right, c3_red_r],
                                    [right, c3_red_m],  [right, c3_red_l],
                [middle, c3_red_r], [middle, c3_red_m], [middle, c3_red_l],
                [left, c3_red_r],   [left, c3_red_m]
                ];
var len = frames.length;
var cyclewait = 250;
var pos = 0;
var cycleColors = function(){
    frames[pos%len][0].setVals(c3_black);
    pos++;
    frames[pos%len][0].setVals(frames[pos%len][1]);
    client.channelsCommit();
    setTimeout(cycleColors, cyclewait);
};
cycleColors();