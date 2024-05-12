import React, { useState, useEffect, useRef } from 'react';
import Button from '../base/Button';
import { Container } from '../base/Container';
import Input from '../base/Input';

const Metronome = () => {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const beatInterval = useRef<NodeJS.Timeout | null>(null);

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
          // Play beat sound or handle visual tick
          console.log('tick'); // Replace with actual audio play or visual effect
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
      ></Input>
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
