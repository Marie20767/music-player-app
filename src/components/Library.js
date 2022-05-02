import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, showLibrary, onClickCloseLibrary }) => {
  return (
    <div className={`library ${showLibrary ? 'active-library' : null}`}>
      <div className="library-header">
        <h2>Library</h2>
        <FontAwesomeIcon icon={faXmark} onClick={onClickCloseLibrary} size="lg" className="close-library" />
      </div>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              key={song.id}
              song={song}
              setCurrentSong={setCurrentSong} />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
