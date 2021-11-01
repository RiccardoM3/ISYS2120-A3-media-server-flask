const progress = document.getElementById("progress");
const timer = document.getElementById("timer");

function progressLoop() {
  setInterval(function () {
    progress.value = Math.round((video.currentTime / video.duration) * 100);
    timer.innerHTML = Math.round(video.currentTime) + " seconds";
  });
}

progressLoop();