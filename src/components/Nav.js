/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SunIcon from '../icons/sun-icon.png';
import MoonIcon from '../icons/moon-icon.png';
import { changeTheme } from '../features/theme';

const Nav = ({ showLibrary, setShowLibrary }) => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  const onClickChangeThemeColors = () => {
    if (theme === 'dark') {
      dispatch(changeTheme('light'));
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      dispatch(changeTheme('dark'));
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <nav>
      <h1>Mixtape</h1>
      <div className="buttons-container">
        <button type="button" onClick={() => setShowLibrary(!showLibrary)}>
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
