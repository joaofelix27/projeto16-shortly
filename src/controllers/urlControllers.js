import connection from "../db/postgres.js"
import { nanoid } from 'nanoid'

export async function urlsPost (req,res) {
    const {url}=req.body
    const shortUrl = nanoid();
    try{
        await connection.query(`INSERT INTO urls (url,"shortUrl") VALUES ($1,$2)`,[url,shortUrl])
        res.status(201).json({shortUrl: shortUrl})
    } catch{
        res.sendStatus(500)
    }
}
export async function getUrlsById (req,res) {
    const {url}=req.body
    const shortUrl = nanoid();
    try{
        await connection.query(`INSERT INTO urls (url,"shortUrl") VALUES ($1,$2)`,[url,shortUrl])
        res.status(201).json({shortUrl: shortUrl})
    } catch{
        res.sendStatus(500)
    }
}