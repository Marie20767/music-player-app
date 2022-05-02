
const LibrarySong = ({ song, setCurrentSong }) => {
  const onClickSelectSong = () => {
    setCurrentSong(song);
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
