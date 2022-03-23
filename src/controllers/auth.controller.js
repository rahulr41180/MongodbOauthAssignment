
const express = require("express");

const User1 = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").config();


const GenerateToken = (User) =>
{
    return jwt.sign({User}, process.env.JWT_SECRET_KEY);
}

const register = async(req,res) =>
{
    try
    {
        let User = await User1.findOne({email : req.body.email});
        console.log('User:', User)

        if(User)
        {
            console.log('User1:', User)

            return res.status(500).send({message : "Email already exists"});
        }

        User = await User1.create(req.body);

        const token = GenerateToken(User);



        // return res.status(200).send({User : User});
        return res.status(200).send({User : User, token : token});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
};

const login = async(req,res) =>
{
    try
    {
        const User = await User1.findOne({email : req.body.email});
        // console.log('User12:', User)

        if(!User)
        {
            return res.status(500).send("Wrong Email or Password");
        }

        const match = User.checkPassword(req.body.password);
        // console.log('match:', match)
        // console.log('PasswordMatch:', PasswordMatch)
        
        if(!match)
        {
            return res.status(500).send({message : "Wrong Email or Password"});
        }
        
        
        const token = GenerateToken(User);

        return res.status(201).send({User : User, token : token});
        // return res.status(201).send({User : User});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
}

module.exports = {register,login, GenerateToken};
// module.exports = {register,login};