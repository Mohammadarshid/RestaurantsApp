const JWT = require("jsonwebtoken");
const decode = require("jsonwebtoken/decode");

module.exports = async (req, res, next) => {
  try {
    // get token from header
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorize User " });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "please Provide auth Token",
      error,
    });
  }
};
