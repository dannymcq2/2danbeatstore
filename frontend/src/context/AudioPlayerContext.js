import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [playingId, setPlayingId] = useState(null);
  const activeAudioRef = useRef(null);

  const stopCurrent = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    setPlayingId(null);
  }, []);

  const toggleBeat = useCallback((id, audioElement) => {
    if (!audioElement) return;

    if (playingId === id) {
      stopCurrent();
      return;
    }

    if (activeAudioRef.current && activeAudioRef.current !== audioElement) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
    }

    activeAudioRef.current = audioElement;
    audioElement.play();
    setPlayingId(id);
  }, [playingId, stopCurrent]);

  const handleEnded = useCallback((id) => {
    if (playingId === id) {
      stopCurrent();
    }
  }, [playingId, stopCurrent]);

  return (
    <AudioPlayerContext.Provider value={{ playingId, toggleBeat, handleEnded }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
