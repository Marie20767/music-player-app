/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import {
  changeCurrentSong,
  onSongChange,
  onSongEnded,
  onSongTimeUpdated,
  setSongPlaying,
} from './reducers/songs';
import './styles/app.scss';

// currentSong gets changed
// > audio element now points to new song (currentSong.audio)
// > audioRef gets updated
// > onLoadedMetaData gets fired
// > updateTime gets called
// > songInfo changes
// > Player component displays updated currentTime and duration

const App = () => {
  const audioRef = useRef(null);
  const [hasSetInitialSongInfo, setHasSetInitialSongInfo] = useState(false);

  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.value);
  const { currentSong, allSongs, isSongPlaying, isLibraryShowing } = useSelector((state) => state.songs);

  const updateTime = (e) => {
    dispatch(onSongTimeUpdated(e));
  };

  const onSongLoaded = (e) => {
    // Check if there is SongInfo stored in local storage
    const savedSongInfo = JSON.parse(localStorage.getItem('song-info'));

    // If there is then load that into SongInfo and change the audioRef.current.currentTime
    if (savedSongInfo && !hasSetInitialSongInfo) {
      audioRef.current.currentTime = savedSongInfo.currentTime;
      updateTime({
        target: {
          currentTime: savedSongInfo.currentTime,
          duration: savedSongInfo.duration,
        },
      });

      setHasSetInitialSongInfo(true);
    } else {
      //  Else just call the updateTime function as normal
      updateTime(e);
    }
  };

  const playSong = () => {
    audioRef.current.play();
    dispatch(setSongPlaying(true));
  };

  // Handles setting the song from local storage:
  useEffect(() => {
    const savedSongJSON = localStorage.getItem('current-song');

    if (savedSongJSON) {
      const savedSong = JSON.parse(savedSongJSON);

      dispatch(changeCurrentSong(savedSong));
    } else {
      dispatch(changeCurrentSong(allSongs[0]));
    }

    const savedSongInfo = JSON.parse(localStorage.getItem('song-info'));

    if (savedSongInfo) {
      updateTime({
        target: {
          currentTime: savedSongInfo.currentTime,
          duration: savedSongInfo.duration,
        },
      });
    }
  }, []);

  // Handles when currentSong changes:
  // - to ensure next song starts playing if previous one was playing
  // - updates the active state of the song in songs
  useEffect(() => {
    if (currentSong) {
      if (isSongPlaying) {
        audioRef.current.play();
      }

      dispatch(onSongChange());

      localStorage.setItem('current-song', JSON.stringify(currentSong));
    }
  }, [currentSong]);

  if (!currentSong) {
    return null;
  }

  return (
    <div className={`App ${isLibraryShowing ? 'library-active' : null} ${theme}`}>
      <Nav />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        updateTime={updateTime} />
      <Library
        playSong={playSong} />
      <audio
        onTimeUpdate={updateTime}
        onLoadedData={onSongLoaded}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={() => dispatch(onSongEnded())}>
      </audio>
    </div>
  );
};

export default App;
