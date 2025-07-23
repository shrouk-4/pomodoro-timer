let totalTime = 25 * 60;
let breakTime = 5 * 60;
let time = totalTime;
let timerInterval;
let rounds = 0;
let isBreak = false;
let isPaused = false;
let audio = new Audio();
let bell = new Audio('sounds/bell.mp3');
let currentTheme = 'ocean';
let currentImageIndex = 0;
let backgroundInterval;
let activeBg = 1;

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').textContent =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            if (isBreak) {
                alert('Break is over! Starting a new round.');
                isBreak = false;
                time = totalTime;
                document.getElementById('breakIndicator').style.display = 'none';
                bell.play();
                rounds++;
                document.getElementById('roundCount').textContent = rounds;
                startTimer();
            } else {
                alert('Time is up! Take a short break.');
                isBreak = true;
                bell.play();
                time = breakTime;
                document.getElementById('breakIndicator').style.display = 'block';
                startTimer();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isBreak = false;
    isPaused = false;
    time = totalTime;
    updateDisplay();
    const pauseBtn = document.querySelector('.pause');
    document.getElementById('breakIndicator').style.display = 'none';
    pauseBtn.textContent = 'Stop';
    pauseBtn.classList.remove('resume');
    pauseBtn.classList.add('stop');
}

function togglePause() {
    const pauseBtn = document.querySelector('.pause');
    if (!isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
        pauseBtn.textContent = 'Resume';
        pauseBtn.classList.remove('stop');
        pauseBtn.classList.add('resume');
    } else {
        isPaused = false;
        pauseBtn.textContent = 'Stop';
        pauseBtn.classList.remove('resume');
        pauseBtn.classList.add('stop');
        startTimer();
    }
}

const themes = {
    ocean: {
        images: ['images/ocean1.jpg', 'images/ocean2.jpg', 'images/ocean3.jpg'],
        sound: 'sounds/ocean.mp3'
    },
    forest: {
        images: ['images/forest1.jpg', 'images/forest2.jpg', 'images/forest3.jpg'],
        sound: 'sounds/forest.mp3'
    },
    wind: {
        images: ['images/wind1.jpg', 'images/wind2.jpg'],
        sound: 'sounds/wind.mp3'
    },
    rain: {
        images: ['images/rain.jpg'],
        sound: 'sounds/rain.mp3'
    },
    standard: {
        images: ['images/standard.jpg','images/standard2.jpg','images/standard3.jpg','images/standard4.jpg','images/standard5.jpg'],
        sound: null
    },
    anime: {
        images: ['images/anime.jpg'],
        sound: null
    },
    train: {
        images: ['images/train.jpg'],
        sound: 'sounds/train.mp3'
    },
    thunder: {
        images: ['images/thunder.jpg'],
        sound: 'sounds/storm.mp3'
    },
    library: {
        images: ['images/library.jpg'],
        sound: null
    },
    mountain: {
        images: ['images/mountain1.jpg', 'images/mountain2.jpg', 'images/mountain3.jpg', 'images/mountain4.jpg'],
        sound: null
    },
    calm: {
        images: ['images/calm1.jpg', 'images/calm2.jpg', 'images/calm3.jpg', 'images/calm4.jpg'],
        sound: null
    },
    arty: {
        images: ['images/arty1.jpg', 'images/arty2.jpg', 'images/arty3.jpg'],
        sound: null
    },
    cute: {
        images: ['images/cute.jpg'],
        sound: null
    }
};

function selectSound(themeName) {
    currentTheme = themeName;
    currentImageIndex = 0;

    if (audio) audio.pause();
    if (themes[themeName].sound) {
        audio = new Audio(themes[themeName].sound);
        audio.loop = true;
        audio.play();
    }

    updateBackground(true);
    clearInterval(backgroundInterval);
    backgroundInterval = setInterval(rotateBackground, 20000);
}

function updateBackground(initial = false) {
    const image = themes[currentTheme].images[currentImageIndex];
    const bg1 = document.getElementById('background1');
    const bg2 = document.getElementById('background2');

    if (initial) {
        bg1.style.backgroundImage = `url(${image})`;
        bg1.style.opacity = '1';
        bg2.style.opacity = '0';
        activeBg = 1;
        return;
    }

    if (activeBg === 1) {
        bg2.style.backgroundImage = `url(${image})`;
        bg2.style.opacity = '1';
        bg1.style.opacity = '0';
        activeBg = 2;
    } else {
        bg1.style.backgroundImage = `url(${image})`;
        bg1.style.opacity = '1';
        bg2.style.opacity = '0';
        activeBg = 1;
    }
}

function rotateBackground() {
    const images = themes[currentTheme].images;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateBackground();
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();

    document.querySelector('.start').addEventListener('click', startTimer);
    document.querySelector('.reset').addEventListener('click', resetTimer);
    document.querySelector('.pause').addEventListener('click', togglePause);
    document.getElementById('toggleMenu')?.addEventListener('click', () => {
        const options = document.getElementById('soundOptions');
        options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
    });

    document.querySelector('.pause').classList.add('stop');
    selectSound('standard'); // الخلفية الافتراضية
});

// فتح وإغلاق القائمة الجانبية
document.getElementById('togglePanel')?.addEventListener('click', () => {
    document.getElementById('sidePanel').classList.toggle('open');
});
