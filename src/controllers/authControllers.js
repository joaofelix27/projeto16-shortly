import connection from "../db/postgrees.js"

export async function signUp (req,res) {
    const {name,email,password}=req.body
    try{
        const {rows:findEmail}=  await connection.query(`SELECT * from users WHERE email=${email}`)
        const findEmailLength=findEmail.length
        if(findEmailLength!==0){
            return res.sendStatus(409)
        }
        await connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`),[name,email,password]
        res.sendStatus(201)
    } catch{
        res.sendStatus(500)
    }


}