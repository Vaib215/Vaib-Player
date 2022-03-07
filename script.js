const video = document.querySelector("#video");
const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const progress = document.querySelector("#progress");
const timestamp = document.querySelector("#timestamp");
const vol = document.querySelector("#volume");
const speed = document.querySelector("#speed");
const fullscreen = document.querySelector("#fullscreen");
const pip = document.querySelector('#pip');
const button = document.querySelector('#btn');
const url = document.querySelector('#url');
const message = document.querySelector('.mess');
// Functions

// Play/Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<img src="https://img.icons8.com/material-outlined/24/04cc1b/play.png"/>';
  } else {
    play.innerHTML = '<img src="https://img.icons8.com/material-outlined/24/04cc1b/pause.png"/>';
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  let minutes = parseInt(video.currentTime / 60);
  let seconds = parseInt(video.currentTime % 60);
  if (minutes < 10) {
    minutes = "0" + String(minutes);
  }
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }
  timestamp.innerText = `${minutes} : ${seconds}`;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function setVolume() {
  video.volume = vol.value / 100;
}

function setSpeed() {
  video.playbackRate = speed.value;
}

function toggleFullScreen() {
  if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  }
}

function togglePictureInPicture() {
  video.requestPictureInPicture();
}

function playCustomVideo(){
  if(url.value===""){
    video.setAttribute('src',url.getAttribute('placeholder'));
  } else{
    video.setAttribute('src',url.value);
  }
  message.classList = "mess";
  setTimeout(() => {
    message.classList = "mess hidden";    
  }, 3000);
}

// Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("dblclick", toggleFullScreen);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

vol.addEventListener("change", setVolume);

speed.addEventListener("change", setSpeed);

fullscreen.addEventListener("click", toggleFullScreen);


// Hide button if Picture-in-Picture is not supported or disabled.
pip.hidden =
  !video.pictureInPictureEnabled || video.disablePictureInPicture;

pip.addEventListener("click", async () => {
  // If there is no element in Picture-in-Picture yet, let’s request
  // Picture-in-Picture for the video, otherwise leave it.
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
  } catch (err) {
    // Video failed to enter/leave Picture-in-Picture mode.
  }
});

button.addEventListener('click', playCustomVideo);