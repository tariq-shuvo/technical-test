const jwt = require('jsonwebtoken');
const config = require('config');
// Load Admin Model
const Admin = require('../models/Admin')

module.exports = async (req, res, next) => {
    // Get header token
    const token = req.header('x-admin-auth-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }

    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecrect'));

        req.admin = decode.admin;

        let adminInfo = await Admin.findById(decode.admin.id)

        if(adminInfo==null){
            return res.status(401).json({
                msg: 'Authorization not valid'
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            msg: 'Authorization not valid'
        });
    }

}