import connection from "../db/postgres.js";
import { nanoid } from "nanoid";

export async function urlsPost(req, res) {
  const { url } = req.body;
  const shortUrl = nanoid();
  const userId=req.userId
  try {
    await connection.query(`INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3)`, [
      url,
      shortUrl,userId
    ]);
    res.status(201).json({ shortUrl: shortUrl });
  } catch(e) {
    res.status(500).send(e.message);
  }
}
export async function getUrlsById(req, res) {
  const { id } = req.params;
  try {
    const { rows: findUrl } = await connection.query(
      `SELECT * from urls WHERE Id='${id}'`
    );
    const findUrlLength = findUrl.length;
    if (findUrlLength === 1) {
      return res.status(200).send(findUrl[0]);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export async function getUrlByShortenUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const { rows: findUrl } = await connection.query(
      `SELECT * from urls WHERE "shortUrl"='${shortUrl}'`
    );
    const findUrlLength = findUrl.length;
    if (findUrlLength === 1) {
      const visitCount = findUrl[0].visitCount;
      await connection.query(
        `UPDATE urls SET "visitCount"=${
          visitCount + 1
        }  WHERE "shortUrl"='${shortUrl}'`
      );
      return res.redirect(findUrl[0].url);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export async function deleteUrlById(req, res) {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const { rows: findUrl } = await connection.query(
      `SELECT * from urls WHERE Id='${id}'`
    );
    const findUrlLength = findUrl.length;
    if (findUrlLength === 1) {
      const userIdDb = findUrl[0]?.userId;
      if (userId === userIdDb) {
        await connection.query(`DELETE FROM urls WHERE id=${id};`);
        return res.sendStatus(204);
      } else {
        return res.sendStatus(401);
      }
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
