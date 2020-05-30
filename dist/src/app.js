"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

class App{

    constructor(){
        this.server = _express2.default.call(void 0, );
        //mudar para o padrao ecs6
        this.app = require('http').createServer(this.server)
        this.serverIO = _socketio2.default.call(void 0, this.app);

        this.serverIO.on('connection',(socket)=>{
            console.log('conectado');
            console.log(socket.id);

        });

        this.serverIO.on('disconnect',(socket)=>{
            console.log('desconectado');
            console.log(socket.id);

        });
        _mongoose2.default.connect('mongodb://localhost:27017/agenda',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });


        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.server.use(_cors2.default.call(void 0, ))
        this.server.use(
            '/files',
            _express2.default.static(_path2.default.resolve(__dirname,'..','uploads'))
        );

        this.server.use(_express2.default.json());
    }

    routes(){

        this.server.use(_routes2.default);

    }

}


exports. default = new App();