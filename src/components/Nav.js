import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ showLibrary, setShowLibrary }) => {
  return (
    <nav>
      <h1>Mixtape</h1>
      <button type="button" onClick={() => setShowLibrary(!showLibrary)}>
        Library
        <FontAwesomeIcon icon={faMusic} className="library-icon" />
      </button>
    </nav>
  );
};

export default Nav;
