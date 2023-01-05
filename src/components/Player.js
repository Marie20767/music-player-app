/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { onDragTimeControlSongTimeUpdated, onSongSkipped, setSongPlaying } from '../reducers/songs';

const Player = ({
  audioRef,
  updateTime,
}) => {
  const { currentSong, isSongPlaying, currentSongInfo } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  // Functions
  const onClickPlaySong = () => {
    if (isSongPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    dispatch(setSongPlaying(!isSongPlaying));
  };

  const addZerosToTime = (time) => {
    if (time < 10) {
      return `0${time}`;
    }

    return time;
  };

  const onChangeDragTimeControl = (e) => {
    audioRef.current.currentTime = e.target.value;
    dispatch(onDragTimeControlSongTimeUpdated(e));
  };

  const onClickSkipTrack = (direction) => {
    dispatch(onSongSkipped(direction));

    // Fixes an issue with safari in which the song current time is not reset immediately when changing songs
    updateTime({
      target: {
        currentTime: 0,
        duration: currentSongInfo.duration,
      },
    });
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
    transform: `translateX(${currentSongInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{formattedTime(currentSongInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})` }} className="track">
          <input
            min={0}
            max={currentSongInfo.duration}
            value={currentSongInfo.currentTime}
            type="range"
            onChange={onChangeDragTimeControl} />
          <div style={trackAnimation} className="animate-track"></div>
        </div>

        <p>{formattedTime(currentSongInfo.duration)}</p>
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
          icon={isSongPlaying ? faPause : faPlay} />

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
