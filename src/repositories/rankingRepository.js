import connection from "../db/postgres.js";

export default  function getRanking (){
   return connection.query(`SELECT users.id as id, name, COUNT(urls."userId") as "linksCount", COALESCE(SUM(urls."visitCount"),0) as "visitCount" FROM users LEFT JOIN urls ON urls."userId"=users.id GROUP BY users.id,urls."userId" ORDER BY "visitCount" DESC LIMIT 10 `)
}


