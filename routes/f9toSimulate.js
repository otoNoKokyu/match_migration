 const pLimit = require('p-limit')
const matchModel = require("../model/match")
const axios = require("axios")

function _buldNetcall(uniqueGameIds, season, leagueId) {
    const arr = []
    const limit = pLimit(10)
    for (let i = 0; i < uniqueGameIds.length; i += 1) {
        const config = {
            method: "post",
            url: `http://ec2-100-26-109-112.compute-1.amazonaws.com:6001/v1/feeds`,
            headers: {
                "x-meta-feed-type": "F9",
                "x-meta-competition-id": leagueId,
                "x-meta-season-id": season,
                "x-meta-game-id": uniqueGameIds[i],
                "x-feed-id": uniqueGameIds[i]
            }
        }

        arr.push(limit(() => axios(config)))
    }
    return arr
}

module.exports = {
    f9toSimu: async (req, res) => {
        try {
            const { season, leagueId } = req.body
            const matchData = await matchModel.find({ season, leagueId })
            if (!matchData.length) return res.status(409).json({ message: `first pull f1 feed for ${season} season` })
            const gameIdArr = matchData.map(elem => elem.gameRef)
            const uniqueGameIds = [...new Set(gameIdArr)]
            const bulkPromise = _buldNetcall(uniqueGameIds, season, leagueId)

            // Only three promises are run at once (as defined above)
            await Promise.all(bulkPromise);
            // console.log(result)
            
            return res.status(200).json({ error: false, message: "updated" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: true, message: "internal server error" })
        }



    }

}