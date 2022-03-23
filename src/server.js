
const app = require("./index");

const Connectdb = require("./configs/db");

app.listen(6600, async() =>
{
    try
    {
        await Connectdb();

        console.log("listening on port 6600");
    }
    catch(error)
    {
        console.log("error :", error);
    }
})