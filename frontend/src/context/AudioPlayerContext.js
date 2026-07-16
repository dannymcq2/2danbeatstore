import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { allBeats, getBeatById } from '../data/beats';

const AudioPlayerContext = createContext();

export const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  if (!audioRef.current && typeof Audio !== 'undefined') {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
  }

  const [playingId, setPlayingId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playingIdRef = useRef(null);

  const playBeat = useCallback((id) => {
    const beat = getBeatById(id);
    const audio = audioRef.current;
    if (!beat || !audio) return;

    audio.src = beat.audioUrl;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    playingIdRef.current = id;
    setPlayingId(id);
    setIsPaused(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const stopCurrent = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    playingIdRef.current = null;
    setPlayingId(null);
    setIsPaused(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const pauseCurrent = useCallback(() => {
    audioRef.current?.pause();
    setIsPaused(true);
  }, []);

  const resumeCurrent = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setIsPaused(false);
  }, []);

  const toggleCurrent = useCallback(() => {
    if (isPaused) resumeCurrent();
    else pauseCurrent();
  }, [isPaused, pauseCurrent, resumeCurrent]);

  const toggleBeat = useCallback(
    (id) => {
      if (playingId === id) {
        toggleCurrent();
        return;
      }
      playBeat(id);
    },
    [playingId, toggleCurrent, playBeat]
  );

  const playNext = useCallback(() => {
    const currentId = playingIdRef.current;
    if (currentId == null) return;
    const index = allBeats.findIndex((b) => b.id === currentId);
    const next = allBeats[(index + 1) % allBeats.length];
    if (next) playBeat(next.id);
  }, [playBeat]);

  const playPrev = useCallback(() => {
    const currentId = playingIdRef.current;
    if (currentId == null) return;
    const index = allBeats.findIndex((b) => b.id === currentId);
    const prev = allBeats[(index - 1 + allBeats.length) % allBeats.length];
    if (prev) playBeat(prev.id);
  }, [playBeat]);

  const seek = useCallback((fraction) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = Math.min(Math.max(fraction, 0), 1) * audio.duration;
    setCurrentTime(audio.currentTime);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => playNext();
    // Keep React state in sync when playback is paused/resumed outside the
    // app's own buttons (OS media keys, lock screen controls, etc.)
    const onPause = () => {
      if (!audio.ended && playingIdRef.current != null) setIsPaused(true);
    };
    const onPlay = () => setIsPaused(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
    };
  }, [playNext]);

  const isBeatPlaying = useCallback(
    (id) => playingId === id && !isPaused,
    [playingId, isPaused]
  );

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <AudioPlayerContext.Provider
      value={{
        playingId,
        isPaused,
        currentTime,
        duration,
        progress,
        toggleBeat,
        toggleCurrent,
        stopCurrent,
        playNext,
        playPrev,
        seek,
        isBeatPlaying,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
