document.getElementById("overlay").addEventListener("click", function () {
    // Start music
    const music = document.getElementById("bgMusic");
    music.play();

    // Hide overlay
    this.style.display = "none";

    // Show main content
    document.getElementById("home").style.display = "block";
    // document.getElementsByClassName("container").style.display = "block";
});

document.addEventListener("DOMContentLoaded", function () {
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById("playPauseIcon");
    const bgMusic = document.getElementById("bgMusic");

    playPauseBtn.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play();
            playPauseIcon.src = "../img/dolia_pause.webp";
            playPauseIcon.alt = "Pause";
        } else {
            bgMusic.pause();
            playPauseIcon.src = "../img/dolia_sad.webp";
            playPauseIcon.alt = "Play";
        }
    });
});

