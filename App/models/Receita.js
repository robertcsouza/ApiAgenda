import  { Schema, model } from 'mongoose';


const ReceitaSchema = new Schema({
        data:String,
        receita:Number

        }  

);


export default model('Receita',ReceitaSchema);