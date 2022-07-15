const matchModel = require("../model/match")
const axios = require("axios")

async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
module.exports = {
    f1toSimu: async(req,res)=>{
        try{
            const { season , leagueId } = req.body
            // const matchData = await matchModel.find({ season,leagueId })
            // if (matchData.length) return res.status(409).json({message: `migration already done for ${season} for league: ${leagueId}`})


                config = {
                    method: "post",
                    url: `http://localhost:6000/v1/feeds`,
                    headers: {
                    "x-meta-feed-type": "F1",
                    "x-meta-competition-id":leagueId,
                    "x-meta-season-id":season,
                    }
                }
                axios(config)
                return res.status(200).json({error: false})
        }catch(err){
            console.log(err)
            return res.status(500).json({error: true, message:"internal server error"})
        }


               
    }

}