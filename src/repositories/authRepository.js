import connection from "../db/postgres.js";


export function getUsers (email) {
    return connection.query(`SELECT * from users WHERE email=$1;`,[email])
}

export function insertUsers (email,name,encryptedPassword){
    return connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3);`,[name,email,encryptedPassword])
}
