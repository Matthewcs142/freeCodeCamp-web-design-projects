const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = sound;

    btn.addEventListener('click', () => {
        stopSounds();

        document.getElementById(sound).play();
    })

    document.querySelector('#buttons').appendChild(btn);
})

function stopSounds() {
    sounds.forEach(sound => {
        const audio = document.getElementById(sound);
        audio.pause();
        audio.currentTime = 0;
    })
}