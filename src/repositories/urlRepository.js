import connection from "../db/postgres.js";

export function insertShortUrl(url,shortUrl,userId) {
  return connection.query(
    `INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3);`,
    [url, shortUrl, userId]
  );
}
export function getUrls(id) {
  return connection.query(`SELECT id,urls."shortUrl",url from urls WHERE id=$1;`,[id]);
}
export function getShortUrls(shortUrl) {
  return connection.query(`SELECT * from urls WHERE "shortUrl"=$1;`, [shortUrl]);
}
export function addVisitCount(visitCount,shortUrl) {
  return connection.query(
    `UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;`,[visitCount+1,shortUrl]
  );
}
export function getMyShortenUrl (userId){
  return connection.query(
    `SELECT users.id as id,users.name as name,COALESCE(SUM(urls."visitCount"),0) as "visitCount"
    , COALESCE(json_agg(json_build_object('id',urls.id,'shortUrl', urls."shortUrl",'url',urls.url,'visitCount',urls."visitCount")) FILTER (WHERE urls.id IS NOT NULL),'[]'::json) AS shortenedUrl
FROM users LEFT JOIN urls ON users.id=urls."userId" WHERE users.id=$1  GROUP BY users.id;`,[userId]);
}
//Colocar bin params
export function deleteUrls (id) {
    return connection.query(`DELETE FROM urls WHERE id=$1;`,[id]);
}