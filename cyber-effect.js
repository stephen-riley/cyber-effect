let audio, context, buffer, cssvar, analyzer;

function cyber_init(varname, audio_file) {
    cssvar = varname;

    audio = new Audio();
    context = new (window.AudioContext || window.webkitAudioContext);
    analyser = context.createAnalyser();

    audio.src = audio_file;
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);


    buffer = new Uint8Array(analyser.frequencyBinCount);

    audio.play();

    setInterval(update, 100);
}

function update() {
    analyser.getByteFrequencyData(buffer);

    let sum = 0, avg;

    for (let i = 0; i < analyser.frequencyBinCount; i++) {
        sum += buffer[i];
    }

    avg = Math.round(sum / analyser.frequencyBinCount) * 2;

    document.documentElement.style.setProperty(cssvar, `rgb(${avg},${avg},${avg})`);
}