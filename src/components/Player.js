/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  songInfo,
  setIsPlaying,
  setSongInfo,
  audioRef,
}) => {
  // Functions
  const onClickPlaySong = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const addZerosToTime = (time) => {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  };

  const onChangeDragTimeControl = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const onClickSkipTrack = (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    console.log('>>> currentSong: ', currentSong);
    console.log('>>> currentIndex: ', currentIndex);
    const nextIndex = direction === 'skip-forward' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex === -1) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[nextIndex % songs.length]);
    }
  };

  const formattedTime = (seconds = 0) => {
    // Fixing the NAN issue when clicking on a new song
    const sanitisedSeconds = Number.isNaN(seconds) ? 0 : seconds;
    const unformattedMinutes = Math.floor(sanitisedSeconds / 60);
    const formattedMinutes = addZerosToTime(unformattedMinutes);
    const unformattedSeconds = Math.floor(sanitisedSeconds % 60);
    const formattedSeconds = addZerosToTime(unformattedSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Add time slider styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formattedTime(songInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})` }} className="track">
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            type="range"
            onChange={onChangeDragTimeControl} />
          <div style={trackAnimation} className="animate-track"></div>
        </div>

        <p>{formattedTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => onClickSkipTrack('skip-back')} />
        <FontAwesomeIcon
          onClick={onClickPlaySong}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => onClickSkipTrack('skip-forward')} />
      </div>
    </div>
  );
};

export default Player;
