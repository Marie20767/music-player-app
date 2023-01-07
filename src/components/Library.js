import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { setShowLibrary } from '../reducers/songs';
import LibrarySong from './LibrarySong';

const Library = ({ playSong }) => {
  const { isLibraryShowing, allSongs } = useSelector((state) => state.songs);

  const dispatch = useDispatch();

  return (
    <div className={`library ${isLibraryShowing ? 'active-library' : null}`}>
      <div className="library-header">
        <h2>Library</h2>
        <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(setShowLibrary(false))} size="lg" className="close-library" />
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
