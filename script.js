const video = document.querySelector("#video");
const play = document.querySelector("#play");
const stop= document.querySelector("#stop");
const progress = document.querySelector("#progress");
const timestamp = document.querySelector("#timestamp");
const vol = document.querySelector("#volume")
const speed = document.querySelector("#speed")
// Functions

// Play/Pause Video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayIcon(){
    if (video.paused) {
        play.innerHTML='<i class="fa fa-play fa-2x"></i>'
    } else {
        play.innerHTML='<i class="fa fa-pause fa-2x"></i>'        
    }
}

function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;
    let minutes = parseInt(video.currentTime/60);
    let seconds = parseInt(video.currentTime%60);
    if(minutes<10){
        minutes = '0'+String(minutes);
    }
    if(seconds<10){
        seconds = '0'+String(seconds);
    }
    timestamp.innerText = `${minutes} : ${seconds}`
}

function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration)/100;
}

function setVolume(){
    video.volume = vol.value/100;
}

function setSpeed(){
    video.playbackRate = speed.value;
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus)

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);

vol.addEventListener('change', setVolume);

speed.addEventListener('change', setSpeed);

setSpeed();