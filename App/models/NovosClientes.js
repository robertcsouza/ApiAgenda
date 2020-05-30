import  { Schema, model } from 'mongoose';



const NovosClientesSchema = new Schema({
        data:String,
        count:Number

        }  

);


export default model('NovosClientes',NovosClientesSchema);