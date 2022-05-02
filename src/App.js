/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from 'react';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import { chillHop } from './utils';

// currentSong gets changed
// > audio element now points to new song (currentSong.audio)
// > audioRef gets updated
// > onLoadedMetaData gets fired
// > updateTime gets called
// > songInfo changes
// > Player component displays updated currentTime and duration

const App = () => {
  // Ref
  const audioRef = useRef(null);
  // States
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [showLibrary, setShowLibrary] = useState(false);

  // Functions
  const updateTime = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate percentage to customise slider
    const roundedCurrentTime = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrentTime / roundedDuration) * 100);

    // save current time of the song to local storage
    const newSongInfo = {
      currentTime: current,
      duration: Number.isNaN(duration) ? 0 : duration,
      animationPercentage: Number.isNaN(animation) ? 0 : animation,
    };

    setSongInfo(newSongInfo);

    localStorage.setItem('song-info', JSON.stringify(newSongInfo));
  };

  const onSongLoaded = (e) => {
    // check if there is SongInfo stored in local storage
    const savedSongInfo = JSON.parse(localStorage.getItem('song-info'));

    // If there is then load that into SongInfo and change the audioRef.current.currentTime
    if (savedSongInfo) {
      setSongInfo(savedSongInfo);
      audioRef.current.currentTime = savedSongInfo.currentTime;
    } else {
      //  Else just call the updateTime function as normal
      updateTime(e);
    }
  };

  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const onEndedChangeSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = currentIndex + 1;

    setCurrentSong(songs[nextIndex % songs.length]);
  };

  const onClickCloseLibrary = () => {
    setShowLibrary(false);
  };

  // UseEffect
  // Handles setting the song from local storage:
  useEffect(() => {
    const savedSongJSON = localStorage.getItem('current-song');

    // getting the current song from local storage
    if (savedSongJSON) {
      const savedSong = JSON.parse(savedSongJSON);

      setCurrentSong(savedSong);
    } else {
      setCurrentSong(songs[0]);
    }
  }, []);

  // Handles when currentSong changes:
  // - to ensure next song starts playing if previous one was playing
  // - updates the active state of the song in songs
  useEffect(() => {
    if (currentSong) {
      if (isPlaying) {
        audioRef.current.play();
      }

      const newSongs = songs.map((track) => {
        if (track.id === currentSong.id) {
          return {
            ...currentSong,
            active: true,
          };
        }

        return {
          ...track,
          active: false,
        };
      });

      setSongs(newSongs);

      // Save currentSong to local storage
      localStorage.setItem('current-song', JSON.stringify(currentSong));
    }
  }, [currentSong]);

  if (!currentSong) {
    return null;
  }

  return (
    <div className={`App ${showLibrary ? 'library-active' : null}`}>
      <Nav
        showLibrary={showLibrary}
        setShowLibrary={setShowLibrary} />
      <Song
        currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        songInfo={songInfo}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef} />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        showLibrary={showLibrary}
        setShowLibrary={setShowLibrary}
        playSong={playSong}
        onClickCloseLibrary={onClickCloseLibrary} />
      <audio
        onTimeUpdate={updateTime}
        onLoadedMetadata={onSongLoaded}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={onEndedChangeSong}>
      </audio>
    </div>
  );
};

export default App;
