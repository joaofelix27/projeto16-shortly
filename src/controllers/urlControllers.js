import { nanoid } from "nanoid";
import { addVisitCount, deleteUrls, getMyShortenUrl, getShortUrls, getUrls, insertShortUrl } from "../repositories/urlRepository.js";

export async function urlsPost(req, res) {
  const { url } = req.body;
  const shortUrl = nanoid();
  const userId=req.userId
  try {
    await insertShortUrl (url,shortUrl,userId)
    res.status(201).json({ shortUrl: shortUrl });
  } catch(e) {
    res.status(500).send(e.message);
  }
}
export async function getUrlsById(req, res) {
  const { id } = req.params;
  try {
    const { rows: findUrl } = await getUrls(id)
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
    const { rows: findUrl } = await getShortUrls(shortUrl)
    const findUrlLength = findUrl.length;
    if (findUrlLength === 1) {
      const visitCount = findUrl[0]?.visitCount;
      await addVisitCount(visitCount,shortUrl)
      return res.redirect(findUrl[0]?.url);
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
    const { rows: findUrl } = await getUrls(id)
    const findUrlLength = findUrl.length;
    if (findUrlLength === 1) {
      const userIdDb = findUrl[0]?.userId;
      if (userId === userIdDb) {
        await deleteUrls(id)
        return res.sendStatus(204);
      } else {
        return res.status(401).json({userIdDb,userId});
      }
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export async function getMineShortenUrl(req, res) {
  const userId=req?.userId
  try {
    const { rows: findUrl } = await getMyShortenUrl(userId)
    const findUrlLength = findUrl.length;
    if (findUrlLength === 1) {
      return res.status(200).send(findUrl[0])
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
  