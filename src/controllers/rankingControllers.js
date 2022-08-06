import connection from "../db/postgres.js";

export async function getMyRanking (req, res){
    try{
      const {rows:findRanking}= await connection.query(`SELECT users.id as id, name, COUNT(urls."userId") as "linksCount", COALESCE(SUM(urls."visitCount"),0) as "visitCount" FROM users LEFT JOIN urls ON urls."userId"=users.id GROUP BY users.id,urls."userId" ORDER BY "visitCount" DESC LIMIT 4 `)
      const findRankingLength= findRanking.length
      if(findRankingLength>1){
        res.status(200).send(findRanking)
      } else{
        res.sendStatus(404)
      }
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }