import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import themeReducer from './reducers/theme';
import songsReducer from './reducers/songs';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    songs: songsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}><App /></Provider>,
);
