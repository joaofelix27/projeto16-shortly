import connection from "../db/postgres.js"

export async function signUp (req,res) {
    const {name,email,password}=req.body
    try{
        const {rows:findEmail}=  await connection.query(`SELECT * from users WHERE email='${email}'`)
        const findEmailLength=findEmail.length
        if(findEmailLength!==0){
            return res.sendStatus(409)
        }
        await connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,[name,email,password])
        res.sendStatus(201)
    } catch{
        res.sendStatus(500)
    }
}
export async function signIn (req,res){
    const {email,password}=req.body
    try{
        const {rows:findEmail}=  await connection.query(`SELECT * from users WHERE email='${email}'`)
        const findEmailLength=findEmail.length
        console.log(findEmailLength)
        const passwordFromDB= findEmail[0]?.password
        console.log(passwordFromDB)
        if(findEmailLength===0 || passwordFromDB!==password){
            return res.sendStatus(401)
        }
        res.sendStatus(200)
    } catch (e){
        res.status(500).send(e.message)
    }

}