import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VoiceSearchButton = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const navigate = useNavigate();

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream; // ✅ store the stream

    mediaRecorderRef.current = new MediaRecorder(stream);
    chunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = sendAudio;

    mediaRecorderRef.current.start();
    setRecording(true);
  } catch (err) {
    console.error(err);
    if (err.name === 'NotFoundError') {
      alert("No microphone found. Please connect a microphone and try again.");
    } else if (err.name === 'NotAllowedError') {
      alert("Microphone access denied. Please allow microphone access in browser settings.");
    } else {
      alert("Error accessing microphone: " + err.message);
    }
  }
};


  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    // 🔴 Stop mic device (VERY IMPORTANT)
    streamRef.current?.getTracks().forEach(track => track.stop());

    setRecording(false);
  };

  const sendAudio = async () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    chunksRef.current = [];

    const formData = new FormData();
    formData.append("audio", blob);

    try {
      const res = await fetch("http://localhost:6005/api/voice/voice-search", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.text) {
        navigate(`/search?q=${encodeURIComponent(data.text)}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        background: recording ? "#dc3545" : "#6c757d",
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }}
    >
      🎤 {recording ? "Stop Recording" : "Voice Search"}
    </button>
  );
};

export default VoiceSearchButton;
