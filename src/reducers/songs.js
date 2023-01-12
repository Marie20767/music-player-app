import { createSlice } from '@reduxjs/toolkit';
import { chillHop, updateActiveSong } from '../utils';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    currentSong: null,
    allSongs: chillHop(),
    isSongPlaying: false,
    isLibraryShowing: false,
    currentSongInfo: {
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
    },
  },
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;

      state.allSongs = updateActiveSong(state.allSongs, state.currentSong);
    },

    onSongEnded: (state) => {
      const currentIndex = state.allSongs.findIndex((song) => song.id === state.currentSong.id);
      const nextIndex = currentIndex + 1;

      state.currentSong = state.allSongs[nextIndex % state.allSongs.length];

      state.allSongs = updateActiveSong(state.allSongs, state.currentSong);
    },

    onSongShuffled: (state) => {
      const randomIndex = Math.floor(Math.random() * state.allSongs.length);

      state.currentSong = state.allSongs[randomIndex];

      state.allSongs = updateActiveSong(state.allSongs, state.currentSong);
    },

    onSongSkipped: (state, action) => {
      const currentIndex = state.allSongs.findIndex((song) => song.id === state.currentSong.id);

      const nextIndex = action.payload === 'skip-forward' ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex === -1) {
        state.currentSong = state.allSongs.length - 1;
      } else {
        state.currentSong = state.allSongs[nextIndex % state.allSongs.length];
      }

      state.allSongs = updateActiveSong(state.allSongs, state.currentSong);
    },

    setSongPlaying: (state, action) => {
      state.isSongPlaying = action.payload;
    },

    setShowLibrary: (state, action) => {
      state.isLibraryShowing = action.payload;
    },

    onSelectSong: (state, action) => {
      state.currentSong = action.payload;

      state.allSongs = updateActiveSong(state.allSongs, state.currentSong);

      // For mobile views, the library takes up the whole screen, so close it after selecting a song
      if (window.innerWidth <= 768) {
        state.isLibraryShowing = false;
      }
    },

    onSongTimeUpdated: (state, action) => {
      const { currentTime, duration } = action.payload;
      // Calculate percentage to customise slider
      const roundedCurrentTime = Math.round(currentTime);
      const roundedDuration = Math.round(duration);
      const animation = Math.round((roundedCurrentTime / roundedDuration) * 100);

      const newSongInfo = {
        currentTime,
        duration: Number.isNaN(duration) ? 0 : duration,
        animationPercentage: Number.isNaN(animation) ? 0 : animation,
      };

      localStorage.setItem('song-info', JSON.stringify(newSongInfo));

      state.currentSongInfo = newSongInfo;
    },

    onDragTimeControlSongTimeUpdated: (state, action) => {
      state.currentSongInfo = {
        ...state.currentSongInfo,
        currentTime: action.payload,
      };
    },
  },
});

export const {
  setCurrentSong,
  onSongEnded,
  onSongShuffled,
  onSongSkipped,
  setSongPlaying,
  setShowLibrary,
  onSelectSong,
  onSongTimeUpdated,
  onDragTimeControlSongTimeUpdated,
} = songsSlice.actions;
export default songsSlice.reducer;
