import  { Schema, model } from 'mongoose';


const CountSchema = new Schema({

        count:Number,
        
        }  

);


export default model('Count',CountSchema);