import { useEffect, useRef, useState } from "react";
import {
  Play, Pause, Volume2, VolumeX, Maximize,
  Settings, RotateCcw, RotateCw, Cast, Subtitles, Loader2,
} from "lucide-react";

const VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
const ORANGE = "#f59e0b";

const formatTime = (s) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const HeroVideo = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrent(v.currentTime);
      setProgress((v.currentTime / v.duration) * 100 || 0);
      if (v.buffered.length > 0)
        setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
    };
    const onLoaded = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("progress", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("progress", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const skip = (sec) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + sec), v.duration);
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const IconBtn = ({ onClick, children, label, extraStyle = {} }) => (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#fff",
        padding: "6px 8px",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...extraStyle,
      }}
      onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
      onMouseOut={e => e.currentTarget.style.background = "none"}
    >
      {children}
    </button>
  );

  return (
    <section style={{
      backgroundColor: "#000",
      display: "flex",
      alignItems: "center",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        alignItems: "center",
        gap: "4rem",
      }}>

        {/* Left: Text */}
        <div>
          <h1 style={{
            color: "#fff",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: "800",
            lineHeight: 1.1,
            margin: 0,
            whiteSpace: "nowrap",   // single line
          }}>
            Launch With <span style={{ color: ORANGE }}>Impact</span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            lineHeight: 1.7,
            marginTop: "1.5rem",
            maxWidth: "400px",
          }}>
            We craft compelling stories that build anticipation, drive traffic
            and convert your audience with the best in class launch videos.
          </p>
          <button
            style={{
              marginTop: "2rem",
              backgroundColor: ORANGE,
              color: "#000",
              fontWeight: "700",
              fontSize: "0.95rem",
              padding: "14px 28px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#d97706"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = ORANGE}
          >
            Book a Discovery Call
          </button>
        </div>

        {/* Right: Video with hover controls */}
        <div
          style={{
            position: "relative",
            borderRadius: "1rem",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            height: "360px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <video
            ref={videoRef}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            onClick={togglePlay}
          />

          {/* Controls overlay — shows on hover */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            padding: "2rem 1rem 0.75rem",
            opacity: hovering ? 1 : 0,
            transition: "opacity 0.25s ease",
            pointerEvents: hovering ? "auto" : "none",
          }}>

            {/* Progress bar */}
            <div
              onClick={seek}
              style={{
                marginBottom: "10px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "6px 0",
              }}
            >
              <div style={{
                position: "relative",
                height: "3px",
                width: "100%",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.25)",
              }}>
                <div style={{
                  position: "absolute", left: 0, top: 0,
                  height: "100%", borderRadius: "9999px",
                  background: "rgba(255,255,255,0.35)",
                  width: `${buffered}%`,
                }} />
                <div style={{
                  position: "absolute", left: 0, top: 0,
                  height: "100%", borderRadius: "9999px",
                  background: ORANGE,
                  width: `${progress}%`,
                }} />
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: `${progress}%`,
                  width: "11px",
                  height: "11px",
                  borderRadius: "50%",
                  background: ORANGE,
                  transform: "translate(-50%, -50%)",
                }} />
              </div>
            </div>

            {/* Controls row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              color: "#fff",
            }}>
              {/* Left controls */}
              <IconBtn onClick={() => skip(-10)} label="Rewind 10s">
                <RotateCcw size={19} />
              </IconBtn>
              <IconBtn onClick={togglePlay} label={playing ? "Pause" : "Play"}>
                {playing ? <Pause size={19} /> : <Play size={19} />}
              </IconBtn>
              <IconBtn onClick={() => skip(20)} label="Forward 20s">
                <RotateCw size={19} />
              </IconBtn>
              <IconBtn onClick={toggleMute} label={muted ? "Unmute" : "Mute"}>
                {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
              </IconBtn>
              <span style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                marginLeft: "4px",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}>
                {formatTime(current)} / {formatTime(duration)}
              </span>

              {/* Right controls */}
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "2px" }}>
                <IconBtn label="Cast"><Cast size={19} /></IconBtn>
                <IconBtn label="Subtitles"><Subtitles size={19} /></IconBtn>
                <IconBtn label="Settings"><Settings size={19} /></IconBtn>
                <IconBtn onClick={() => videoRef.current?.requestFullscreen?.()} label="Fullscreen">
                  <Maximize size={19} />
                </IconBtn>
                <IconBtn label="Autoplay"><Loader2 size={19} /></IconBtn>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroVideo;