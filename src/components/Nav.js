/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect } from 'react';
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

  const setThemeToColor = (themeToUpdate) => {
    dispatch(changeTheme(themeToUpdate));
    const themeToRemove = themeToUpdate === 'light' ? 'dark' : 'light';

    document.body.classList.remove(themeToRemove);
    document.body.classList.add(themeToUpdate);
    document.documentElement.className = themeToUpdate;
    document.getElementById('root').classList.remove(themeToRemove);
    document.getElementById('root').classList.add(themeToUpdate);

    localStorage.setItem('theme', themeToUpdate);
  };

  // Making sure body, html and root are set to the correct background colors on first load
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      setThemeToColor(storedTheme);
    }
  }, []);

  const onClickChangeThemeColors = () => {
    if (theme === 'dark') {
      setThemeToColor('light');
    } else {
      setThemeToColor('dark');
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
