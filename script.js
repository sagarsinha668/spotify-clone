let songindex = 0
let masterplay = document.getElementById("masterplay")
let gif = document.getElementById("gif")
let progressbar = document.getElementById("progressbar")
let timestape = document.getElementById("timestape")
let songscontainer = document.getElementById("songscontainer")
let title = document.getElementById("title")

let songs = [{
    songname: "Let me love you", filepath: "/img/songs/1.mp3", coverpth: "./img/covers/1.jpg"
}, {
    songname: "Faded", filepath: "/img/songs/2.mp3", coverpth: "./img/covers/2.jpg"
}, {
    songname: "Mere Mehboob Mere Sanam", filepath: "/img/songs/3.mp3", coverpth: "./img/covers/3.jpg"
}, {
    songname: "Aayi Nai", filepath: "/img/songs/4.mp3", coverpth: "./img/covers/4.jpg"
}, {
    songname: "Treat you better", filepath: "/img/songs/5.mp3", coverpth: "./img/covers/5.jpg"
}, {
    songname: "Wolves", filepath: "/img/songs/6.mp3", coverpth: "./img/covers/6.jpg"
}, {
    songname: "Without me", filepath: "/img/songs/7.mp3", coverpth: "./img/covers/7.jpg"
}, {
    songname: "Yummy", filepath: "/img/songs/8.mp3", coverpth: "./img/covers/8.jpg"
}, {
    songname: "You belong with me", filepath: "/img/songs/9.mp3", coverpth: "./img/covers/9.jpg"
}, {
    songname: "Singham Again", filepath: "/img/songs/10.mp3", coverpth: "./img/covers/10.jpg"
}]

let audioElement = new Audio(songs[songindex].filepath)


// Update song list dynamically in container
songs.forEach((song, i) => {
    let div = document.createElement("div")
    div.classList.add("songlist")

    let img = document.createElement("img")
    img.src = song.coverpth
    img.alt = song.songname

    let p = document.createElement("p")
    p.innerText = song.songname;

    let icon = document.createElement("i")
    icon.classList.add("songlistplay", "fa-solid", "fa-play-circle") 
    icon.dataset.songindex = i; 

    div.append(img, p, icon)
    songscontainer.append(div)
})

// Function to reset all play buttons to "play" state
function resetPlayIcons() {
    document.querySelectorAll(".songlistplay").forEach((icon) => {
        icon.classList.remove("fa-pause-circle")
        icon.classList.add("fa-play-circle")
    })
}

// Play functionality for individual songs in list
document.querySelectorAll(".songlistplay").forEach((icon) => {
    icon.addEventListener("click", (event) => {
        let clickedIndex = event.target.dataset.songindex;

        if (songindex === clickedIndex && !audioElement.paused) {
            // If the same song is clicked and it's playing, pause it
            audioElement.pause()
            event.target.classList.remove("fa-pause-circle")
            event.target.classList.add("fa-play-circle")
            masterplay.classList.remove("fa-pause-circle")
            masterplay.classList.add("fa-play-circle")
            gif.style.opacity = 0;
        } else {
            // Play new song
            songindex = clickedIndex;
            audioElement.src = songs[songindex].filepath;
            audioElement.play()
            title.innerText = songs[songindex].songname;

            resetPlayIcons() // Reset all other icons to play state
            event.target.classList.remove("fa-play-circle")
            event.target.classList.add("fa-pause-circle")
            masterplay.classList.remove("fa-play-circle")
            masterplay.classList.add("fa-pause-circle")
            gif.style.opacity = 1;
        }
    })
})

// Handle Play/Pause for master button
masterplay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterplay.classList.remove("fa-play-circle")
        masterplay.classList.add("fa-pause-circle")
        gif.style.opacity = 1;

        // Set the correct icon in the song list
        let currentSongIcon = document.querySelector(
            `[data-songindex="${songindex}"]`
        )
        resetPlayIcons()
        if (currentSongIcon) {
            currentSongIcon.classList.remove("fa-play-circle")
            currentSongIcon.classList.add("fa-pause-circle")
        }
    } else {
        audioElement.pause()
        masterplay.classList.remove("fa-pause-circle")
        masterplay.classList.add("fa-play-circle")
        gif.style.opacity = 0;

        // Update the play icon for the current song
        let currentSongIcon = document.querySelector(
            `[data-songindex="${songindex}"]`
        )
        if (currentSongIcon) {
            currentSongIcon.classList.remove("fa-pause-circle")
            currentSongIcon.classList.add("fa-play-circle")
        }
    }
})

// Handle seek bar by audio
audioElement.addEventListener("timeupdate", () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressbar.value = progress;
})


// Handle audio seek bar change
progressbar.addEventListener("input", () => {
    audioElement.currentTime = (progressbar.value * audioElement.duration) / 100;
})

let next = document.getElementById("next")
let back = document.getElementById("back")

// Handle next song functionality
next.addEventListener("click", () => {
    if (songindex >= songs.length - 1) {
        songindex = 0;
    } else {
        songindex++;
    }

    audioElement.src = songs[songindex].filepath;
    audioElement.play()
    title.innerText = songs[songindex].songname; // Update song title
    gif.style.opacity = 1;

    masterplay.classList.remove("fa-play-circle")
    masterplay.classList.add("fa-pause-circle")

    resetPlayIcons() // Reset all song list icons

    // Select new song icon and update play/pause state
    let currentSongIcon = document.querySelector(`[data-songindex="${songindex}"]`)
    if (currentSongIcon) {
        currentSongIcon.classList.remove("fa-play-circle")
        currentSongIcon.classList.add("fa-pause-circle")
    }
})

back.addEventListener("click", () => {
    if (songindex <= 0) {
        songindex = songs.length - 1;
    } else {
        songindex--;
    }

    audioElement.src = songs[songindex].filepath;
    audioElement.play()
    title.innerText = songs[songindex].songname; // Update song title
    gif.style.opacity = 1;

    masterplay.classList.remove("fa-play-circle")
    masterplay.classList.add("fa-pause-circle")

    resetPlayIcons() // Reset all song list icons

    // Select new song icon and update play/pause state
    let currentSongIcon = document.querySelector(`[data-songindex="${songindex}"]`)
    if (currentSongIcon) {
        currentSongIcon.classList.remove("fa-play-circle")
        currentSongIcon.classList.add("fa-pause-circle")
    }
})

