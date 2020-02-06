let audio, context, buffer, cssvar, analyzer;

function cyber_init(varname, audio_file) {
    build_colors(255);

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

    avg = Math.min(255, Math.round(sum / analyser.frequencyBinCount) * 2);

    document.documentElement.style.setProperty(cssvar, `rgb(${red[avg]},${green[avg]},${blue[avg]})`);
}


let advancedCount = -1;

function cyber_init_advanced(element_id, audio_file, spectrumPercent) {
    advancedCount++;

    build_colors(255);

    const audio = new Audio();
    const context = new (window.AudioContext || window.webkitAudioContext);
    const analyser = context.createAnalyser();

    audio.src = audio_file;
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    const buffer = new Uint8Array(analyser.frequencyBinCount);

    const text = document.getElementById(element_id).innerText;
    if (text.length > analyser.frequencyBinCount) {
        throw `text length must be <${analyser.frequencyBinCount}`;
    }

    const factor = analyser.frequencyBinCount / text.length * spectrumPercent;

    const textArray = text.split('');
    let innerHtml = '';
    for (let i = 0; i < textArray.length; i++) {
        const cssvar = `--ca-${advancedCount}-${i}`;
        innerHtml += `<span style='color:var(${cssvar})'>${textArray[i]}</span>`;
        document.documentElement.style.setProperty(cssvar, `rgb(0,0,0)`);
    }
    document.getElementById(element_id).innerHTML = innerHtml;

    audio.play();

    setInterval(() => {
        analyser.getByteFrequencyData(buffer);

        for (let i = 0; i < textArray.length; i++) {
            const index = Math.round(factor * i);
            const level = buffer[index];
            const cssvar = `--ca-${advancedCount}-${i}`;
            document.documentElement.style.setProperty(cssvar, `rgb(${red[level]},${green[level]},${blue[level]})`);
            // console.log(`buffer[${index}] = ${level}`);
        }
        // console.log("");
    }, 100);
}

const red = [], green = [], blue = [];
const red_pts = [128, 128, 128, 128, 255, 255, 255, 255],
    green_pts = [0, 0, 0, 0, 0, 168, 255, 255],
    blue_pts = [0, 0, 0, 0, 0, 0, 0, 255];

function build_colors(max) {
    const factor = Math.round(max / red_pts.length);

    for (let i = 0; i < red_pts.length - 1; i++) {
        const start = Math.trunc(i * factor);
        const end = Math.trunc((i + 1) * factor);
        for (let j = start; j < end; j++) {
            const r = red_pts[i] + (red_pts[i + 1] - red_pts[i]) * j / (end - start);
            const g = green_pts[i] + (green_pts[i + 1] - green_pts[i]) * j / (end - start);
            const b = blue_pts[i] + (blue_pts[i + 1] - blue_pts[i]) * j / (end - start);
            red[j] = r;
            green[j] = g;
            blue[j] = b;
        }
    }
}