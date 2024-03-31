import React, { useState, useRef, useEffect, useCallback } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(0.5); 

  const audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const handleNext = useCallback(() => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  }, [currentIndex, setCurrentIndex, total]);

  const handlePrev = useCallback(() => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  }, [currentIndex, setCurrentIndex, total]);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
      if (audioRef.current.ended) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const playAudio = () => {
      if (isPlaying && audioRef.current.paused) {
        audioRef.current.play();
        startTimer();
      }
    };

    if (audioRef.current.src !== audioSrc) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      audioRef.current.addEventListener('canplay', playAudio);
      setTrackProgress(0);
      isReady.current = true;
    } else {
      playAudio();
    }

    return () => {
      clearInterval(intervalRef.current);
      audioRef.current.removeEventListener('canplay', playAudio);
      audioRef.current.pause();
    };
  }, [isPlaying, audioSrc, startTimer]);

  useEffect(() => {
    audioRef.current.volume = volume; 
  }, [volume]);

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  function formatDuration(duration_ms) {
    var seconds = Math.floor(duration_ms / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  
  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">{formatDuration(currentTrack?.duration_ms)}</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            setVolume={setVolume} 
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
