import React from "react";
import "./queue.css";

export default function Queue({ tracks, setCurrentIndex }) {

  function formatDuration(duration_ms) {
    var seconds = Math.floor(duration_ms / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="up-next">Up Next </p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item flex"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{track?.track?.name}</p>
              <p>{formatDuration(track?.track?.duration_ms)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
