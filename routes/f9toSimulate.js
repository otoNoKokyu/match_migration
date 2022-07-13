const { PromisePool } = require('@supercharge/promise-pool')
const matchModel = require("../model/match")
const axios = require("axios")

function _buldNetcall(uniqueGameIds, season , leagueId ){
    const arr =[]
    for(let i = 0; i<uniqueGameIds.length; i+=1){
        const config = {
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
         arr.push(axios(config))
    }
    return arr
}

module.exports = {
    f9toSimu: async(req,res)=>{
        try{
            const { season , leagueId } = req.body
            const matchData = await matchModel.find({ season, leagueId })
            if (!matchData.length) return res.status(409).json({message: `first pull f1 feed for ${season} season`})
            const gameIdArr = matchData.map(elem=>elem.gameRef)
            const uniqueGameIds = [...new Set(gameIdArr)]
            const bulkPromise= _buldNetcall(uniqueGameIds, season , leagueId )

            const { results, errors } = await PromisePool
            .for(bulkPromise)
            .withConcurrency(10)
            .process((ress)=>ress)

            return res.status(200).json({error: false, message:"updated",results, errors})
            
        }catch(err){
            console.log(err)
            return res.status(500).json({error: true, message:"internal server error"})
        }


               
    }

}