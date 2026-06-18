const axios = require("axios")
let ids;
//from this function we get all video id 
const getAllid = async () => {
  const response = await axios({
    method: 'get',
    url: `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=500&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=AIzaSyD4DsICpt_Oi_bYqwssNGSyHqufeIGeePs&playlistId=PLn3Wz38keZOfEEJmNHNBlnHoepR8wv8gU&si=UOYXq4CDGMClJaHJ&playnext=1&si=N5infBJ7d_8sIymf`,
    responseType: 'json',
  });

  ids = response.data.items.map(
    item => item.contentDetails.videoId
  );
  return ids
  // // under this function we are are callig 1000+ function in single time 
  //   const totalTime = await Promise.all(
  //     ids.map(id =>
  //       axios.get(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&id=${id}&key=AIzaSyD4DsICpt_Oi_bYqwssNGSyHqufeIGeePs&fields=items/contentDetails/duration`
  //       )
  //     )
  //   )
  //   return totalTime.map(
  //     item => item.data.items[0].contentDetails.duration
  //   );

  //   //alternative plus bst methode mcall in singe time 
  const totalTime = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids.join(",")}&key=AIzaSyD4DsICpt_Oi_bYqwssNGSyHqufeIGeePs&fields`
  );

  return totalTime.data.items.map(
    item => item.contentDetails.duration
  );
}

// const main = async () => {


//   const durations = await getAllid();

//   let totalSeconds = 0;

//   for (const duration of durations) {
//     const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);

//     const minutes = Number(match[1] || 0);
//     const seconds = Number(match[2] || 0);

//     totalSeconds += minutes * 60 + seconds;
//   }
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   console.log(`${hours}h ${minutes}m ${seconds}s`);
//   // console.log(totalSeconds);
// }
// main();
module.exports = getAllid;