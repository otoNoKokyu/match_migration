
const axios = require("axios")
// const seasons = [2017,2018,2019,2020,2021]
// const leagues = [21,22,23,24,8,5,4]
// // const optaF9Uri = `http://omo.akamai.opta.net?user=rftadmin&psw=AkKtr0N&game_id=${}&competition=${}&season_id=${}&feed_type=${}&json`
// // const optaF1Uri = `http://omo.akamai.opta.net/competition.php?feed_type=f1&competition=${leagueId}&season_id=${seasonId}&user=rftadmin&psw=AkKtr0N&json=1`



// async function gameIDParser(seasons,leagues){
//   let resObj = {}
//   for(let i=0;i<seasons.length;i+=1){
//     console.log(seasons[i])

//     for(let j =0;j<leagues.length;j+=1){
//       let url =  `http://omo.akamai.opta.net/competition.php?feed_type=f1&competition=${leagues[j]}&season_id=${seasons[i]}&user=rftadmin&psw=AkKtr0N&json=1`
//       console.log(leagues[j])
//       const res = await axios({
//         method: 'get',
//         url: url,
//         maxContentLength: 10000000000000000000,
//         maxBodyLength: 10000000000000000000
//       })
//       const  {SoccerFeed}  = res.data
//       if (!SoccerFeed) continue
//       const { SoccerDocument } = SoccerFeed
//       const { MatchData } = SoccerDocument
//       for(let k = 0;k<MatchData.length; k+=1){
//         const gID = MatchData[k]["@attributes"].uID
//         let modGid = gID.split("g")[1]
//         if(seasons[i] == undefined){
//           continue
//         }
//         if(resObj[seasons[i]]){
//           resObj[seasons[i]].push(modGid)
//         }
//         else{
//           resObj[seasons[i]] = []
//         }

    
//       }
      
//     }
//   }
//   return resObj
// }


// gameIDParser(seasons,leagues).then(res=>{
//   let newObj = {}
//   for(let i in res){

//       newObj[i] = new Set(res[i])

//   }
//   console.log(newObj)
// }).catch(err=>{
//   console.log(err)
// })


const url = "http://localhost:5000"

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function loop(){

  for(let i = 0;i<10;i+=1){
    await sleep(3000)
    await axios.post(url)
    console.log('hit')

  }
}
loop().then(res=>console.log(res))