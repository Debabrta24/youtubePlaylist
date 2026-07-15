const axios = require("axios");
const getData = require("./idExtracter");

const token = process.env.YT_V3_API_KEY
// const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${token}`


const timeData = async (data) => {
    // console.log(data)
    let arr = []
    let chunks = []
    const res = data
    for (let i = 0; i < res.length; i += 50) {
        chunks.push(res.slice(i, i + 50));
    }

    // console.log(chunks);
    let i = 0;
    while (chunks[i]) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${chunks[i]}&key=${token}`
        const result = await axios.get(url)
        // console.log(result.data.items)
        await arr.push(...result.data.items.map((e) => e.contentDetails.duration));
        // console.log(i+url)
        i++;
    }

    // console.log(arr)
  
    return arr;


}
// data();
module.exports = timeData;