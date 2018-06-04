const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')
const ip_addr = '127.0.0.1';
const port    =  '8888';

var server = restify.createServer();

server.use(require('restify-plugins').queryParser());


const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*']
})

server.pre(cors.preflight);
server.use(cors.actual);

var PATH = '/device';
server.get({path : PATH} , getDeviceReading);
server.patch({path : PATH +'/:readingName'} , patchDeviceReading);

const deviceReadings = [
    {
        name: 'acceleration_x',
        unit: 'm/s2',
        value: 25.993848858558,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'acceleration_y',
        unit: 'm/s2',
        value: -128.993848858558,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: false
    },
    {
        name: 'acceleration_z',
        unit: 'm/s2',
        value: -0.53,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'rotation_alpha',
        unit: 'deg',
        value: 356.63,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: false
    },
    {
        name: 'rotation_beta',
        unit: 'deg',
        value: -18.14,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'rotation_gamma',
        unit: 'deg',
        value: -11.19,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'orientation',
        unit: 'deg',
        value: 0,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'latitude',
        unit: '',
        value: 52.49,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'rotation_rate_alpha',
        unit: 'deg/s',
        value: 0.04,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'rotation_rate_beta',
        unit: 'deg/s',
        value: 0.06,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    },
    {
        name: 'rotation_rate_gamma',
        unit: 'deg/s',
        value: 0,
        timestamp: new Date().getTime() - Math.floor(Math.random() * 100000),
        active: true
    }
];

function getDeviceReading(req, res , next){
    // res.setHeader('Access-Control-Allow-Origin','*');
    res.send(200, {
        data: deviceReadings
    });
}

function patchDeviceReading(req, res, next) {
    if (!req.params.readingName || !req.query.active) {
        res.send(400);
    }
    try {
        const timeout = Math.floor(Math.random() * 5000);
        const failRate = Math.floor(Math.random() * 100);
        if (failRate > 60) {
            res.send(400, 'device state patch failed');
            return null;
        }
        const targetIndex = deviceReadings.findIndex(el => el.name === req.params.readingName);
        deviceReadings[targetIndex].active = req.query.active === "true";
        setTimeout(() => { res.send(200, 'OK') }, timeout);
    } catch(e) {
        console.log(e);
        res.send(400, e);
    };
}

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});

