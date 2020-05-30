import  { Schema, model } from 'mongoose';


const AgendamentoSchema = new Schema({
        thumbnail_url:String,
        data:String,
        tipo:String,
        horario:String,
        nome:String,
        email:String,    
        user_id:String,
        aberto:Boolean,
        
        usuario:{
                type: Schema.Types.ObjectId,
                ref:'User'
        }

        }  

);


export default model('Agendamento',AgendamentoSchema);