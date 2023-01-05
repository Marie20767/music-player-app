import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import LibrarySong from './LibrarySong';

const Library = ({ playSong, onClickCloseLibrary }) => {
  const { isLibraryShowing, allSongs } = useSelector((state) => state.songs);

  return (
    <div className={`library ${isLibraryShowing ? 'active-library' : null}`}>
      <div className="library-header">
        <h2>Library</h2>
        <FontAwesomeIcon icon={faXmark} onClick={onClickCloseLibrary} size="lg" className="close-library" />
      </div>
      <div className="library-songs">
        {allSongs.map((song) => {
          return (
            <LibrarySong
              key={song.id}
              song={song}
              playSong={playSong} />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
