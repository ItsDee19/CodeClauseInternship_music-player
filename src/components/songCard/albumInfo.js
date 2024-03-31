import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ album }) {
  const artists = [];
  album?.artists?.forEach((element) => {
    artists.push(element.name);
  });

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{album?.name + " - " + artists?.join(", ")}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{`Album by : ${artists?.join(
          ", "
        )} with ${album?.total_tracks} track(s)`}</p>
      </div>
      <div className="album-release">
        <p>Released on: {album?.release_date}</p>
      </div>
    </div>
  );
}