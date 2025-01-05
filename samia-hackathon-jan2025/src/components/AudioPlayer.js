import React from "react";

const AudioPlayer = ({ audioUrl }) => {
  return (
    audioUrl && (
      <div>
        <p>Click play to hear the audio:</p>
        <audio controls autoPlay>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    )
  );
};

export default AudioPlayer;
