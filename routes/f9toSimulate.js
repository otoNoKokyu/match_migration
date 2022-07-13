const matchModel = require("../model/match")
const axios = require("axios")

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
module.exports = {
    f9toSimu: async(req,res)=>{
        try{
            const { season , leagueId } = req.body
            const matchData = await matchModel.find({ season,leagueId })
            if (!matchData.length) return res.status(409).json({message: `first pull f1 feed for ${season} season`})
            const gameIdArr = matchData.map(elem=>elem.gameRef)
            const uniqueGameIds = [...new Set(gameIdArr)]
            let config
            for(let i = 0;i<uniqueGameIds;i+=1){
                await sleep(10000)
                config = {
                    method: "post",
                    url: `http://localhost:6000/v1/feeds`,
                    headers: {
                    "x-meta-feed-type": "F9",
                    "x-meta-competition-id":leagueId,
                    "x-meta-season-id":season,
                    "x-meta-game-id" : uniqueGameIds[i],
                    "x-feed-id": uniqueGameIds[i]
                    }
                }
                await axios(config)
                console.log(`hit for ${uniqueGameIds[i]}`)
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({error: true, message:"internal server error"})
        }


               
    }

}