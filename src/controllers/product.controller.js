
const express = require("express");

const router = express.Router();

const Product1 = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");

const authorization = require("../middlewares/authorization");

router.post("", authenticate, async(req,res) =>
{
    try
    {
        const Product = await Product1.create(req.body);

        return res.status(201).send({Product : Product});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

router.patch("/:id", authenticate, authorization(["admin","seller"]), async(req,res) =>
{
    try
    {
        const Product = await Product1.findByIdAndUpdate(req.params.id, req.body, {new : true});

        return res.status(201).send({Product : Product});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

router.delete("/:id", authenticate, authorization(["admin","seller"]), async(req,res) =>
{
    try
    {
        const Product = await Product1.findByIdAndDelete(req.params.id);

        return res.status(202).send({Product : Product});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

router.get("", async(req,res) =>
{
    try
    {
        const Product = await Product1.find();

        return res.status(200).send({Product : Product});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
})

module.exports = router;