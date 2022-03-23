
const express = require("express");

const app = express();

app.use(express.json());

const UserController = require("./controllers/user.controller");

const {register, login, GenerateToken} = require("./controllers/auth.controller");
// const {register, login} = require("./controllers/auth.controller");



const ProductController = require("./controllers/product.controller");

const passport = require("./configs/google.oauth");

app.use("/users", UserController);

app.post("/register", register);

app.post("/login", login);

app.use("/products", ProductController);

app.get("/auth/google",
    passport.authenticate("google", {scope : ["profile", "email"]})
);

app.get("/auth/google/callback",
    passport.authenticate("google", {failureRedirect : "/login", session : false}),

    function(req,res)
    {
        const token = GenerateToken(req.user);

        return res.status(200).send({User : req.user, token : token});
    }
)

module.exports = app;