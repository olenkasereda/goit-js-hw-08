import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
  console.log(data.seconds);
};
player.on('loaded', function () {
  /*найкраще використовувати встановлення часу в момент коли відео завантажене*/
  if (localStorage.getItem(STORAGE_KEY)) {
    // player.setCurrentTime(seconds);
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
});
/*у випадку якщо записувати при події play часто відео запускається з часу в 
localStorage якщо перемотувати  збереження часу*/

player.on('timeupdate', throttle(onPlay, 1000));

//===============================================
// player
//   .setCurrentTime(localStorage.getItem(STORAGE_KEY))
//   .then(function (seconds) {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(function (error) {
//     switch (error.name) {
//       case 'RangeError':
//         // the time was less than 0 or greater than the video’s duration
//         break;

//       default:
//         // some other error occurred
//         break;
//     }
//   });
