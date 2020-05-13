import  { Schema, model } from 'mongoose';


const NotificacaoSchema = new Schema({

        data:String,
        tipo:String,
        horario:String,
        nome:String,
        thumbnail_url:String,
        }  

);


export default model('Notificacao',NotificacaoSchema);