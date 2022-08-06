import connection from "../db/postgres.js";

export function insertShortUrl(url,shortUrl,userId) {
  return connection.query(
    `INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3);`,
    [url, shortUrl, userId]
  );
}
export function getUrls(id) {
  return connection.query(`SELECT * from urls WHERE id=$1;`,[id]);
}
export function getShortUrls(shortUrl) {
  return connection.query(`SELECT * from urls WHERE "shortUrl"=$1;`, [shortUrl]);
}
export function addVisitCount(visitCount,shortUrl) {
  return connection.query(
    `UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;`,[visitCount+1,shortUrl]
  );
}
export function deleteUrls (id) {
    return connection.query(`DELETE FROM urls WHERE id=$1;`,[id]);
}