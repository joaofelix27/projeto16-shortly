import connection from "../db/postgres.js";
import dotenvsafe from "dotenv-safe";
import jsonwebtoken from "jsonwebtoken";
dotenvsafe.config();

export default async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  // Verify if the token is valid
  jsonwebtoken.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .json({ auth: false, message: "Failed to authenticate token." });
    }
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    console.log(req.userId)
    //Qual a diferença de salvar no res.locals?
    next();
  });
}
