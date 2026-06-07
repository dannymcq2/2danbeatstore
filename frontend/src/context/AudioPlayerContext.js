import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [playingId, setPlayingId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const activeAudioRef = useRef(null);

  const stopCurrent = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    setPlayingId(null);
    setIsPaused(false);
  }, []);

  const pauseCurrent = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resumeCurrent = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.play();
      setIsPaused(false);
    }
  }, []);

  const toggleCurrent = useCallback(() => {
    if (isPaused) resumeCurrent();
    else pauseCurrent();
  }, [isPaused, pauseCurrent, resumeCurrent]);

  const toggleBeat = useCallback((id, audioElement) => {
    if (!audioElement) return;

    if (playingId === id) {
      if (isPaused) {
        resumeCurrent();
        return;
      }
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
    setIsPaused(false);
  }, [playingId, isPaused, stopCurrent, resumeCurrent]);

  const handleEnded = useCallback((id) => {
    if (playingId === id) {
      stopCurrent();
    }
  }, [playingId, stopCurrent]);

  const isBeatPlaying = useCallback(
    (id) => playingId === id && !isPaused,
    [playingId, isPaused]
  );

  return (
    <AudioPlayerContext.Provider
      value={{
        playingId,
        isPaused,
        toggleBeat,
        toggleCurrent,
        stopCurrent,
        handleEnded,
        isBeatPlaying,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
