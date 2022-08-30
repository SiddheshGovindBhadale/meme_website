const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const controlsContainer = document.querySelector('.controls-container');

const playPauseButton = document.querySelector('.play-pause-btn');
const volumeButton = document.querySelector('.volume-btn');
const fullScreenButton = document.querySelector('.full-screen-btn');
const playButton = playPauseButton.querySelector('.play');
const pauseButton = playPauseButton.querySelector('.pause');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.progress-bar');   
const watchedBar = document.querySelector('.watched-bar');
const playHead = document.querySelector('.playhead');

pauseButton.style.display = 'none';
mutedButton.style.display = 'none';
minimizeButton.style.display = 'none';

window.onresize = function () {
    var width = window.innerWidth - 30;
    controlsContainer.style.width = width + 'px';
};

document.addEventListener('DOMContentLoaded', function () {
    var width = window.innerWidth - 30;
    controlsContainer.style.width = width + 'px';
});

const playPause = () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    } else {
        video.pause();
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    }
};

const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
        fullVolumeButton.style.display = 'none';
        mutedButton.style.display = '';

    } else {
        fullVolumeButton.style.display = '';
        mutedButton.style.display = 'none';
    }
};

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        maximizeButton.style.display = '';
        minimizeButton.style.display = 'none';

    } else {
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = '';
    }
});

video.addEventListener('timeupdate', function() {
    var watched = 100 / video.duration * video.currentTime;
    watchedBar.style.width = watched + '%';
    playHead.style.left = watched + '%';

    if (video.ended) {
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    }
});

progressBar.addEventListener('mousedown', function(event) {
    const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
});

video.addEventListener('click', playPause);

video.addEventListener('dblclick', toggleFullScreen);

playPauseButton.addEventListener('click', playPause);

volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', toggleFullScreen);