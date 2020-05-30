import express from 'express';
import serverSocket from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

class App{

    constructor(){
        this.server = express();
        //mudar para o padrao ecs6
        this.app = require('http').createServer(this.server)
        this.serverIO = serverSocket(this.app);

        this.serverIO.on('connection',(socket)=>{
            console.log('conectado');
            console.log(socket.id);

        });

        this.serverIO.on('disconnect',(socket)=>{
            console.log('desconectado');
            console.log(socket.id);

        });
        mongoose.connect('mongodb://localhost:27017/agenda',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });


        this.middlewares();
        this.routes();

    }

    middlewares(){
        this.server.use(cors())
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname,'..','uploads'))
        );

        this.server.use(express.json());
    }

    routes(){

        this.server.use(routes);

    }

}


export default new App();