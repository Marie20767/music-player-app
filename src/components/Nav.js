/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SunIcon from '../icons/sun-icon.png';
import MoonIcon from '../icons/moon-icon.png';
import { changeTheme } from '../reducers/theme';
import { setShowLibrary } from '../reducers/songs';

const Nav = () => {
  const theme = useSelector((state) => state.theme.value);
  const { isLibraryShowing } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  const onClickChangeThemeColors = () => {
    if (theme === 'dark') {
      dispatch(changeTheme('light'));
      document.body.classList.remove('dark');
      document.documentElement.className = '';
      document.getElementById('root').classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      dispatch(changeTheme('dark'));
      document.body.classList.add('dark');
      document.documentElement.className = 'dark';
      document.getElementById('root').classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <nav>
      <h1>Mixtape</h1>
      <div className="buttons-container">
        <button type="button" onClick={() => dispatch(setShowLibrary(!isLibraryShowing))}>
          Library
          <FontAwesomeIcon icon={faMusic} className="library-icon" />
        </button>
        <img
          src={theme === 'light' ? SunIcon : MoonIcon}
          onClick={onClickChangeThemeColors}
          alt="Theme" />
      </div>
    </nav>
  );
};

export default Nav;
