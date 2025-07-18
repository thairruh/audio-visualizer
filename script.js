const fileInput = document.getElementById('audioFile');
const playButton = document.getElementById('play');

// test
const audioTest = document.getElementById('audioTest');
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;


// webaudio api setup
// im following the documentation so I can understand
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// connect to web audio api
const audioCtx = new AudioContext();
const analyzer = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(audioTest);
source.connect(analyzer);
analyzer.connect(audioCtx.destination);

analyzer.fftSize = 128; 
const bufferLength = analyzer.frequencyBinCount
const dataArray = new Uint8Array(bufferLength);



canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

function draw() 
{
    console.log("code ran");
    try 
    {
        drawVisual = requestAnimationFrame(draw);
        analyzer.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++)
        {
            barHeight = dataArray[i];

            canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

            x += barWidth + 1;
        }
    }
    catch (error) 
    {
        console.log("didnt work", error);
    }
}

draw();