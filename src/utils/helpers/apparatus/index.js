import io from 'socket.io-client';
const { REACT_APP_API_URL, REACT_APP_APPARATUS_SOCKET } = process.env;

var API_URL = REACT_APP_API_URL,
  SOCKET_URL = REACT_APP_APPARATUS_SOCKET;

function Apparatus(options) {
  if (typeof options === 'object') {
    /**
     *  Apparatus integration token
     *
     */

    if (!options.token) throw 'Error: Token not provided.';

    /**
     *  Debug mode switch
     *
     */

    DEBUG = options.debug;
  } else {
    throw 'Error: Options argument must be an object.';
  }

  this.token = options.token;

  this.emailUrl = options.email_url;

  this.socket_query = {
    jwt: this.token,
    type: 'login'
  };

  this._events = {
    user_logged_in: '',
    update_qr_code: 'updateQRCode',
    confirmed_login: 'confirmed_login',
    login: 'confirmedScan'
  };

  logger('object constructed');
}

Apparatus.prototype.connect = function() {
  this.socket = io.connect(SOCKET_URL, { query: this.socket_query, reconnect: true });

  return new Promise(
    function(res, rej) {
      this.socket.once('apparatusError', function(error) {
        logger('an error has occured while connecting to socket server');
        rej(new Error(error));
      });

      this.socket.once('connect', function(data) {
        logger('connected to socket as integration');
        res(data);
      });
    }.bind(this)
  );
};

Apparatus.MAGIC_LINK = 'magic_link';

Apparatus.prototype.disconnect = function() {
  logger('object disconnected from server');

  return new Promise(
    function(res, rej) {
      this.socket.once('disconnect', function(response) {
        res(response);
      });

      this.socket.disconnect();
    }.bind(this)
  );
};

Apparatus.prototype.on = function(event, handlerFunc) {
  logger(event + ' listener initialized');

  if (!this._events.hasOwnProperty(event)) throw 'Invalid Event ' + event;

  this.socket.on(this._events[event], handlerFunc);
};

export default Apparatus;

/** Helpers **/
var logger,
  DEBUG = true;

if (DEBUG)
  logger = function(msg) {
    console.log('%capparatus:', 'font-weight: bold; font-size: 11px; color: blue;', msg);
  };
else logger = function() {};
