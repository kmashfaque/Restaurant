import bcrypt from 'bcrypt'
import shortid from 'shortid'
import User from '../models/user.model.js'

export const Signup = (req, res) => {
    User.findOne({email: req.body.email}).exec( async (error, user) => {
        if(user){
            res.status(400).json({
                message: 'User already exist!'
            });
        }
            const { firstName, lastName, email, password } = req.body;

            const hash_password = await bcrypt.hash(password, 10)

            const _user = new User({
                firstName,
                lastName,
                email,
                password: hash_password,
                userName: firstName + '-' + shortid.generate()
            });

            _user.save((error, data) => {
                if(error){
                    console.log(error);
                    res.status(400).json({
                        message: 'Something went wrong!'
                    })
                }
                if(data){
                    res.status(201).json({
                        message: 'User created successfully!',
                        data: data
                    })
                }
            })
            if(error){
                return res.status(400).json({
                    message: 'error'
                })
            }
        
    })
}

export const signin = (req, res)=>{
    User.findOne({email: req.body.email}).exec((error, user)=>{
        if(error) return res.status(400).json({message: 'Son=mething went error!'})
        if(user && user.authenticate(req.body.password)){
            res.status(200).json({
                message: 'Signed in',
                data: user
            })
        }
    })
}