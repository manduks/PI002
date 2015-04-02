var Cylon = require('cylon');

module.exports = function(app) {

  Cylon.robot({

    connection: { name: 'raspi', adaptor: 'raspi' },

    devices: {
      blue: { driver: 'led', pin: 11 },
      green: { driver: 'led', pin: 7 },
      //led: { driver: 'led', pin: 11 }
    },

    work: function (my) {
      app.route('/api/:led/:position').get(function(req, res, next) {
        var led = req.params.led;

        console.log(req.params);

        //every((1).second(), my.led.toggle);

        if(req.params.position == 'on') {
          if( led == 'blue' )    my.blue.turnOn();
          if( led == 'green' )   my.green.turnOn();
        }
        else {
          if( led == 'blue' )  my.blue.turnOff();
          if( led == 'green' )   my.green.turnOff();
        }

        res.sendStatus(200);
      });
    }

  }).start();

};
