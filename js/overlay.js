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
            playPauseIcon.src = "https://media.discordapp.net/attachments/1370137895570243664/1371268872753119272/52368BDA-B550-409E-94F7-C331A5DBCB0D.png?ex=68228528&is=682133a8&hm=20fc601d9f9c7cec939cf3bf2aafd4780d2806f7b74ba42dd7683f92c596f904&=&format=webp&quality=lossless&width=800&height=800";
            playPauseIcon.alt = "Pause";
        } else {
            bgMusic.pause();
            playPauseIcon.src = "https://media.discordapp.net/attachments/1370137895570243664/1371268873168486530/7B7CDC1C-BED1-4899-A267-FC13FECDD62E.png?ex=68228528&is=682133a8&hm=38908ef2cedfd7366b2e4eabdf1805236d6a1471fc36e54561dbcf26cd5ac1c6&=&format=webp&quality=lossless&width=800&height=800";
            playPauseIcon.alt = "Play";
        }
    });
});

