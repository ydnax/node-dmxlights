var artnet = require('artnet-node');

var Client = function(ip, port){
    this.ip      = ip;
    this.port    = port || 6454;
    this.client  = new artnet.Client.ArtNetClient(this.ip, this.port);
    this.client.UNIVERSE = [1,0];
    this.dmx_dta = new Array(512);
};
Client.prototype.setChannel = function(channel, value){
    this.dmx_dta[channel-1] = value;
};
Client.prototype.flush = function(){
    this.client.send(this.dmx_dta);
};
module.exports.DmxClient = Client;

var modes = {
    '3_segment' : {
        mode    : 41,
        shutter : 1,
        red_l   : 2,
        green_l : 3,
        blue_l  : 4,
        red_m   : 5,
        green_m : 6,
        blue_m  : 7,
        red_r   : 8,
        green_r : 9,
        blue_r  : 10
    },
    '1_segment' : {
        mode    : 81,
        shutter : 1,
        red     : 2,
        green   : 3,
        blue    : 4
    }
};
module.exports.modes = modes;

var Device = function(client, channel, mode){
    this.client  = client;
    this.channel = channel;
    this.mode    = mode;
};
Device.prototype.setMode = function(mode){
    this.mode = mode;
};
Device.prototype.setVals = function(values, flush){
    if(this.mode!=-1)
        this.client.setChannel(this.channel, this.mode.mode);
    for(key in values){
        if(this.mode[key]==undefined){
            console.log("key %s not known in current mode.", key);
            continue
        }
        this.client.setChannel(this.channel + this.mode[key], values[key]);
    }
    if(flush)
        this.client.flush();
};
module.exports.Device = Device;
module.exports.Colors = require('./colors.js');