import connection from "../db/postgres.js"
import bcrypt from "bcrypt";
import dotenvsafe from "dotenv-safe"
import jsonwebtoken from 'jsonwebtoken'
dotenvsafe.config();

export async function signUp (req,res) {
    const {name,email,password}=req.body
    const encryptedPassword = bcrypt.hashSync(password, 10);
    try{
        const {rows:findEmail}=  await connection.query(`SELECT * from users WHERE email='${email}'`)
        const findEmailLength=findEmail.length
        if(findEmailLength!==0){
            return res.sendStatus(409)
        }
        await connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,[name,email,encryptedPassword])
        res.sendStatus(201)
    } catch{
        res.sendStatus(500)
    }
}
export async function signIn (req,res){
    const {email,password}=req.body
    let verifyPassword=false
    try{
        const {rows:findEmail}=  await connection.query(`SELECT * from users WHERE email='${email}'`)
        const findEmailLength=findEmail.length
        const passwordFromDB= findEmail[0]?.password
        const id=findEmail[0]?.id
        if(passwordFromDB){
        verifyPassword = bcrypt.compareSync(password, passwordFromDB);
        }
        if(findEmailLength===0 || !verifyPassword){
            return res.sendStatus(401)
        }
        const token = jsonwebtoken.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
          });
        res.status(200).json({ auth: true, token: token });
    } catch (e){
        res.status(500).send(e.message)
    }

}