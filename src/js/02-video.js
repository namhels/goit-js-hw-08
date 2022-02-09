import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import * as storage from '../services/localStorage';

const SAVED_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onTimeUpdate = function (event) {
  storage.save(SAVED_TIME, event.seconds);
};

player.setCurrentTime(storage.get(SAVED_TIME) || 0);

player.on('timeupdate', throttle(onTimeUpdate, 1000));
