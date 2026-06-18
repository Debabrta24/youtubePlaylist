import React, { useState } from "react";
import env from "dotenv"
import axios from "axios";


const Main = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wholePlaylist, setWholePlaylist] = useState(true);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      if (wholePlaylist) {
        const res = await axios.post(import.meta.env.VITE_WHOLE_PLAYLIST_URL, {
          playlistUrl,
        });
        console.log("Whole Playlist Result:", res.data);
        alert(
          `Total Playlist Time: ${
            res.data.totalTime || JSON.stringify(res.data)
          }`,
        );
        return;
      }
      const res = await axios.post(import.meta.env.VITE_PLAYLIST_RETURN_URL, {
        playlistUrl,
      });
      const videoData = res.data.map((id) => ({
        id,
        checked: true,
      }));
      setVideos(videoData);
      setStart(0);
      setEnd(videoData.length);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch playlist");
    } finally {
      setLoading(false);
    }
  };
  const toggleVideo = (id) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id
          ? {
              ...video,
              checked: !video.checked,
            }
          : video,
      ),
    );
  };
  const submitSelection = async () => {
    try {
      const selectedVideos = videos
        .filter((video) => video.checked)
        .map((video) => video.id);

      const res = await axios.post(import.meta.env.VITE_COUSTOMIZED_PLAYLIST_URl, {
        playlistUrl,
        start,
        end,
        selectedVideos,
      });

      console.log(res.data);

      alert("Data Sent Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-green-950 border border-green-500/20 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-green-400 mb-6">
          YouTube Playlist Counter
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={wholePlaylist}
            onChange={() => setWholePlaylist(!wholePlaylist)}
            className="w-5 h-5"
          />

          <label className="text-green-300 font-medium">
            Find Whole Playlist Playtime
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Paste YouTube Playlist URL"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            className="flex-1 bg-black border border-green-500/20 rounded-lg px-4 py-3 text-white outline-none"
          />

          <button
            onClick={fetchPlaylist}
            disabled={loading}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold  rounded-lg p-2.5 "
          >
            {loading
              ? "Loading..."
              : wholePlaylist
                ? "Calculate Playtime"
                : "Fetch Videos"}
          </button>
        </div>
      </div>

      {!wholePlaylist && videos.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div>
              <label className="block mb-2 text-green-400">Start From</label>

              <input
                type="number"
                value={start}
                min={0}
                max={videos.length}
                onChange={(e) => setStart(Number(e.target.value))}
                className="w-full bg-black border border-green-500/20 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-400">End At</label>

              <input
                type="number"
                value={end}
                min={0}
                max={videos.length}
                onChange={(e) => setEnd(Number(e.target.value))}
                className="w-full bg-black border border-green-500/20 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-green-400">Total Videos</label>

              <input
                value={videos.length}
                readOnly
                className="w-full bg-black border border-green-500/20 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>

          <div className="mt-6 bg-green-950 border border-green-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-green-400 mb-2">
              Playlist Videos ({videos.length})
            </h2>

            <div className="grid lg:grid-cols-4 gap-6 max-h-75 overflow-y-auto">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`rounded-xl overflow-hidden p-4 ${
                    video.checked ? "bg-black" : "bg-gray-900"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green-300">Video {index + 1}</span>

                    <input
                      type="checkbox"
                      checked={video.checked}
                      onChange={() => toggleVideo(video.id)}
                      className="w-5 h-5"
                    />
                  </div>

                  <iframe
                    width="100%"
                    height="150"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.id}
                    allowFullScreen
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={submitSelection}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-lg"
            >
              Submit Selected Videos
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
