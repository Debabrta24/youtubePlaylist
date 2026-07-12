const data = require("./timeIdextractor");

function toSeconds(duration) {
    let second = 0
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = Number(match[1] || 0);
    const minutes = Number(match[2] || 0);
    const seconds = Number(match[3] || 0);
    second += hours * 3600 + minutes * 60 + seconds
    // console.log(second)
    return hours * 3600 + minutes * 60 + seconds;
}

const timevalue = async (timeidData) => {
    let totaltime = 0;
    // const data2 = await data()
    // console.log(timeidData)
    timeidData.forEach(duration => {
        totaltime += toSeconds(duration);
    });
    return totaltime;

}
module.exports = timevalue;

