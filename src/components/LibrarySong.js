
const LibrarySong = ({ song, setShowLibrary, setCurrentSong, playSong }) => {
  const onClickSelectSong = () => {
    setCurrentSong(song);

    // For mobile views, the library takes up the whole screen, so close it after selecting a song
    if (window.innerWidth <= 768) {
      setShowLibrary(false);
    }

    playSong();
  };

  return (
    <div onClick={onClickSelectSong} className={`library-song ${song.active ? 'selected' : null}`}>
      <img src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
