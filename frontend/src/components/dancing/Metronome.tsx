import React, { useState, useEffect, useRef } from 'react';
import Button from '../base/Button';
import Input from '../base/Input';

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const beatInterval = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const beepSoundBufferRef = useRef<AudioBuffer | null>(null);

  // Load the beep sound
  useEffect(() => {
    const loadSound = async (url: string) => {
      const audioContext = new AudioContext();
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      beepSoundBufferRef.current = audioBuffer;
      audioContextRef.current = audioContext;
    };

    loadSound('/sound/metronome_tick.mp3');
  }, []);

  // Function to play the sound
  const playBeep = () => {
    if (audioContextRef.current && beepSoundBufferRef.current) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = beepSoundBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start();
    }
  };

  // Function to start or stop the metronome
  const toggleMetronome = () => {
    if (isPlaying) {
      if (beatInterval.current) clearInterval(beatInterval.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  // Effect to handle the timing of beats
  useEffect(() => {
    if (isPlaying) {
      beatInterval.current = setInterval(
        () => {
          playBeep(); // Play the sound instead of logging
        },
        (60 / bpm) * 1000,
      );
    }

    return () => {
      if (beatInterval.current) clearInterval(beatInterval.current);
    };
  }, [isPlaying, bpm]);

  // Handle BPM changes from input or slider
  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    if (isPlaying) {
      toggleMetronome(); // Restart metronome to update interval
      toggleMetronome();
    }
  };

  return (
    <div className="mt-4 rounded-lg border p-4 shadow">
      <Input
        label="BPM"
        type="number"
        value={bpm}
        onChange={(e) => handleBpmChange(parseInt(e.target.value))}
        min={40}
        max={200}
      />
      <div>
        <input
          type="range"
          min="40"
          max="208"
          value={bpm}
          onChange={(e) => handleBpmChange(parseInt(e.target.value))}
        />
      </div>
      <Button onClick={toggleMetronome}>{isPlaying ? 'Stop' : 'Start'}</Button>
    </div>
  );
};

export default Metronome;
