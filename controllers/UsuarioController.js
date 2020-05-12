import User from '../models/User';


class UsuarioController{

    async show(req,res){

        const  user_id  = req.user_id;

        const user = await User.find();

        if(!user){
            res.status(400).json({error:'usuario nao encontrado'
            });
        }


        res.json(user);

    }

    async update(req,res){

        const  user_id  = req.user_id;
        const { nome , email, senha, nascimento} = req.body;
        const { filename } = req.file;      

       const  user = await User.findOneAndUpdate({_id:user_id},
            {
                thumbnail: filename,
                nome,
                email,
                senha,
                nascimento,
            },{
                new:false
            });

        return res.json({ok:'atualizado com sucesso'})
    }

}


export default new UsuarioController();