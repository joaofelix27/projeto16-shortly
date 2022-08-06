import getRanking from "../repositories/rankingRepository.js";

export async function getMyRanking (req, res){
    try{
      const {rows:findRanking}= await getRanking()
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