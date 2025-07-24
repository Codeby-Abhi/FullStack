const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECURITY, { expiresIn: "1h" });
}

exports.registerUser = async (req, res) => {

}
exports.loginUser = async (req, res) => {

}
exports.getUserInfo = async (req, res) => {

}