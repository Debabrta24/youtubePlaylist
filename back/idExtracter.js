// require('dotenv').config()
const axios = require("axios")
// const token = process.env.YT_V3_API_KEY
const token = "AIzaSyD4DsICpt_Oi_bYqwssNGSyHqufeIGeePs"

const yt_play_id = "PLn3Wz38keZOfEEJmNHNBlnHoepR8wv8gU"


const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${token}&playlistId=${yt_play_id}`
const url2 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${token}&playlistId=${yt_play_id}&pageToken=EAAaHlBUOkNESWlFRE5HTXpReVJVSkZPRFF5UmpKQk16UQ`
// console.log(url)

const getData = async (Play_id) => {
    let arr = []
    // console.log(Play_id)
    const response = await axios.get(url);
    await arr.push(...response.data.items.map((e) => e.contentDetails.videoId));
    if (response.data.nextPageToken) {
        // console.log(response.data.nextPageToken)
        const response2 = await axios.get(url2);
        await arr.push(...response2.data.items.map((e) => e.contentDetails.videoId));
        // console.log(arr)
        if (response2.data.nextPageToken) {
            return getData(response2.data.nextPageToken);
        }
    }
    const arr2= arr;
    return arr2;

}
// getData(yt_play_id).then(() => {
//     console.log(arr);
// })
module.exports= getData;