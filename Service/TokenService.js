const jwt = require('jsonwebtoken');

exports.createToken = (Product) => {
    const secretKey = process.env.JWT_SECRET; 
    return jwt.sign(Product, secretKey, { expiresIn: '1h' }); 
};
