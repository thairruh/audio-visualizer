const fileInput = document.getElementById('audio');
const playButton = document.getElementById('play');

// not done

// webaudio api setup
// im following the documentation so I can understand
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// connect to web audio api
const audioCtx = new AudioContext();
const analyzer = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(stream);
source.connect(analyzer);
analyzer.connect(audioCtx.destination);
distortion.connect(audioCtx.destination);

analyzer.fftSize = 256; 
const bufferLength = analyzer.frequencyBinCount
const dataArray = new Uint8Array(bufferLength);



canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyzer.getByteFrequencyData(dataArray);

    canvasCtx.fillstyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++)
    {
        barHeight = dataArray[i];

        canvasCtx.fillstyle = `rgb(${barHeight + 100} 50 50)`;
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
    }
}

draw();