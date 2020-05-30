import  { Schema, model } from 'mongoose';



const CancelamentoSchema = new Schema({
        data:String,
        count:Number

        }  

);


export default model('Cancelamento',CancelamentoSchema);