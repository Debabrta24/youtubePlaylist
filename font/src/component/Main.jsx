import React, { useState } from "react";
import axios from "axios";

const formatDuration = (totalSeconds, speed = 1) => {
  if (!totalSeconds) return "";
  const secondsAtSpeed = Math.round(totalSeconds / speed);

  const days = Math.floor(secondsAtSpeed / (24 * 3600));
  const hours = Math.floor((secondsAtSpeed % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsAtSpeed % 3600) / 60);
  const seconds = secondsAtSpeed % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return parts.join(", ");
};

const Main = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [wholePlaylist, setWholePlaylist] = useState(true);
  const [totalTime, setTotalTime] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [videos, setVideos] = useState([]);
  const [toast, setToast] = useState(null);
  const [customSpeed, setCustomSpeed] = useState("");

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 4000);
  };

  const toggleVideo = (id) => {
    console.log("Clicked video:", id);
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, checked: !video.checked } : video,
      ),
    );
  };

  const submit = async () => {
    if (!playlistUrl.trim()) {
      showToast("Please enter a YouTube playlist URL", "error");
      return;
    }
    try {
      const response = await axios.post(import.meta.env.ALL_FEATCH_ALL_TIME, {
        youtube_url:
          "https://youtube.com/playlist?list=RDbmX2nhCY3wU&playnext=1&si=N5infBJ7d_8sIymf",
        full_playlist: wholePlaylist,
      });

      if (wholePlaylist) {
        setTotalTime(response.data);
      } else {
        setTotalTime(null);
        setVideos(
          response.data.map((id) => ({
            id,
            checked: true,
          })),
        );
        setStart(0);
        setEnd(response.data.length - 1);
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
      showToast(
        error.response?.data?.message ||
        "Failed to fetch playlist details. Please check the backend connection.",
        "error"
      );
    }
  };

  const handleStartChange = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    setStart(cleanValue);

    if (cleanValue !== "") {
      const newStart = Number(cleanValue);
      setVideos((prev) =>
        prev.map((video, idx) => {
          if (idx < newStart) {
            return { ...video, checked: false };
          } else if (
            idx >= newStart &&
            idx < (start === "" ? prev.length : Number(start))
          ) {
            return { ...video, checked: true };
          }
          return video;
        }),
      );
    }
  };

  const handleEndChange = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    setEnd(cleanValue);

    if (cleanValue !== "") {
      const newEnd = Number(cleanValue);
      setVideos((prev) =>
        prev.map((video, idx) => {
          if (idx > newEnd) {
            return { ...video, checked: false };
          } else if (idx <= newEnd && idx > (end === "" ? -1 : Number(end))) {

            return { ...video, checked: true };
          }
          return video;
        }),
      );
    }
  };

  const submitSelection = async () => {
    const startIndex = Number(start);
    const endIndex = Number(end);

    if (
      isNaN(startIndex) ||
      isNaN(endIndex) ||
      startIndex < 0 ||
      endIndex >= videos.length ||
      startIndex > endIndex
    ) {
      showToast("Please enter a valid start and end index.", "error");
      return;
    }

    const selectedRange = videos.slice(startIndex, endIndex + 1);
  
const checkedVideoIds = selectedRange
  .filter((video) => video.checked)
  .map((video) => video.id);

console.log({
  startIndex,
  endIndex,
  array: checkedVideoIds,
});

try {
  const response = await axios.post(import.meta.env.VITE_COUSTOMIZED_PLAYLIST_URl, {
    starting: startIndex,
    ending: endIndex,
    array: checkedVideoIds,
  });
  setTotalTime(response.data);
  showToast("Selected video configuration submitted successfully!", "success");
} catch (error) {
  console.error("Error submitting selected videos:", error);
  showToast("Failed to submit selection. Please try again.", "error");
}
  };

return (
  <div className="max-w-7xl mx-auto px-6 py-10 min-h-screen text-white font-sans">
    <div className="bg-green-950/80 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 shadow-xl shadow-green-950/50">
      <div className="flex items-center gap-3 mb-6">
        <input
          id="whole-playlist"
          type="checkbox"
          checked={wholePlaylist}
          onChange={() => setWholePlaylist(!wholePlaylist)}
          className="w-5 h-5 accent-green-500 rounded border-green-500/30 bg-black cursor-pointer focus:ring-green-500"
        />
        <label
          htmlFor="whole-playlist"
          className="text-green-300 font-medium cursor-pointer select-none hover:text-green-200 transition-colors"
        >
          Calculate Entire Playlist Duration
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Paste YouTube Playlist URL (e.g. https://youtube.com/playlist?list=...)"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          className="flex-1 bg-black/50 border border-green-500/30 focus:border-green-400 rounded-lg px-4 py-3 text-white outline-none transition-all placeholder-gray-500"
        />
        <button
          onClick={submit}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg px-6 py-3 transition-colors duration-200 active:scale-95 transform cursor-pointer"
        >
          Analyze
        </button>
      </div>

    </div>

    {totalTime !== null && (
      <div className="mt-8 bg-green-950/80 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 shadow-xl shadow-green-950/50">
        <h3 className="text-xl font-bold text-green-400 mb-4 text-center">
          Playlist Duration Summary
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 items-stretch">
          {[
            { label: "1x (Normal Speed)", speed: 1.0 },
            { label: "1.25x Speed", speed: 1.25 },
            { label: "1.5x Speed", speed: 1.5 },
            { label: "2x Speed", speed: 2.0 },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-black/50 border border-green-500/10 rounded-xl p-4 text-center flex flex-col justify-between min-h-[140px]"
            >
              <span className="text-sm font-semibold text-green-300">
                {item.label}
              </span>
              <div className="flex items-center justify-center min-h-[44px] mt-2">
                <span className="text-white text-sm font-medium leading-relaxed">
                  {formatDuration(totalTime, item.speed)}
                </span>
              </div>
            </div>
          ))}

          {/* Custom Speed Input Card */}
          <div className="bg-green-950/20 border border-green-500/30 rounded-xl p-4 text-center flex flex-col justify-between min-h-[140px] shadow-md shadow-green-500/5">
            <span className="text-sm font-semibold text-green-300">
              Custom Speed
            </span>
            <div className="flex items-center justify-center my-1">
              <div className="relative flex items-center bg-black/60 border border-green-500/30 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400/30 rounded-lg px-2 py-0.5 transition-all">
                <input
                  type="text"
                  placeholder="1.35"
                  value={customSpeed}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, "");
                    const parts = val.split(".");
                    const cleanVal = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : val;
                    setCustomSpeed(cleanVal);
                  }}
                  className="w-12 bg-transparent text-center text-xs text-white outline-none placeholder-gray-600 font-medium"
                />
                <span className="text-xs text-green-400 font-bold ml-0.5 select-none">x</span>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-[44px]">
              <span className="text-white text-sm font-semibold leading-relaxed">
                {customSpeed && !isNaN(parseFloat(customSpeed)) && parseFloat(customSpeed) > 0 ? (
                  formatDuration(totalTime, parseFloat(customSpeed))
                ) : (
                  <span className="text-gray-500 text-xs font-normal">Enter speed multiplier</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    )}

    {!wholePlaylist && videos.length > 0 && (
      <>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-950/50 border border-green-500/15 rounded-xl p-4">
            <label className="block mb-2 text-sm font-medium text-green-400">
              Start From (Index)
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={start}
              onChange={(e) => handleStartChange(e.target.value)}
              className="w-full bg-black/50 border border-green-500/30 focus:border-green-400 rounded-lg px-4 py-2.5 text-white outline-none transition-all"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}
            />
          </div>

          <div className="bg-green-950/50 border border-green-500/15 rounded-xl p-4">
            <label className="block mb-2 text-sm font-medium text-green-400">
              End At (Index)
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={end}
              onChange={(e) => handleEndChange(e.target.value)}
              className="w-full bg-black/50 border border-green-500/30 focus:border-green-400 rounded-lg px-4 py-2.5 text-white outline-none transition-all"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}
            />
          </div>

          <div className="bg-green-950/50 border border-green-500/15 rounded-xl p-4">
            <label className="block mb-2 text-sm font-medium text-green-400">
              Total Videos
            </label>
            <input
              value={videos.length}
              readOnly
              className="w-full bg-black/35 border border-green-500/10 rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed outline-none"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.35)", color: "#9ca3af" }}
            />
          </div>
        </div>

        <div className="mt-8 bg-green-950/80 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center justify-between">
            <span>Playlist Videos</span>
            <span className="text-sm font-normal text-green-300 bg-green-900/40 px-3 py-1 rounded-full border border-green-500/20">
              {videos.filter((v) => v.checked).length} of {videos.length}{" "}
              selected
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {videos.map((video, index) => {
              const isChecked = video.checked;
              return (
                <div
                  key={video.id}
                  className={`rounded-xl overflow-hidden p-4 border transition-all duration-300 ${isChecked
                      ? "bg-black/60 border-green-500/40 shadow-md shadow-green-500/5"
                      : "bg-gray-900/40 border-gray-800/40 opacity-60 hover:opacity-80"
                    }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`text-sm font-medium ${isChecked ? "text-green-300" : "text-gray-400"}`}
                    >
                      Video {index + 1}
                    </span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleVideo(video.id)}
                      className="w-4.5 h-4.5 accent-green-500 rounded border-green-500/30 bg-black cursor-pointer focus:ring-green-500"
                    />
                  </div>

                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={`YouTube Video ${video.id}`}
                      allowFullScreen
                      className="border-0 absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={submitSelection}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-lg shadow-lg hover:shadow-green-500/10 transition-all duration-200 active:scale-[0.99] transform cursor-pointer"
          >
            Submit Selected Videos
          </button>
        </div>
      </>
    )}

    {toast && (
      <div
        className={`fixed top-5 right-5 z-50 flex items-center gap-3 border backdrop-blur-md rounded-xl p-4 shadow-2xl max-w-sm transition-all duration-300 transform translate-y-0 scale-100 ${toast.type === "success"
            ? "bg-green-950/95 border-green-500/40 text-green-200"
            : "bg-red-950/95 border-red-500/40 text-red-200"
          }`}
      >
        {toast.type === "success" ? (
          <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="text-sm font-medium pr-2">{toast.message}</span>
        <button
          onClick={() => setToast(null)}
          className="text-gray-400 hover:text-white transition-colors ml-auto text-sm shrink-0 leading-none focus:outline-none"
        >
          &times;
        </button>
      </div>
    )}
  </div>
);
};

export default Main;
