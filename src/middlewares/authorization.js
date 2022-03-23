
const authorization = (permittedRoles) =>
{
    return (req,res,next) =>
    {
        console.log('permittedRoles:', permittedRoles)
        console.log("req.User2", req.User2);

        const UserRole = req.User2;
        console.log('UserRole:', UserRole);
        isPermitted = false;
        permittedRoles.map(role =>
        {
            console.log('UserRole.role:', UserRole.role)
            if(UserRole.role.includes(role))
            {
                // console.log('role:', role)
                isPermitted = true;
            }
        })

        if(isPermitted)
        {
            return next();
        }
        else
        {
            return res.status(500).send({message : "You are not authorized to perform this operation"});
        }

        // return next();
    }
}



module.exports = authorization;