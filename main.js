let video;
let poseNet;
let poses = [];
let textSizeValue = 16; // Default text size

function setup() {
    const canvas = createCanvas(640, 480);
    canvas.parent('canvas-container'); // Ensure the correct parent ID

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide(); // Hide the extra component created by p5.js

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    background(200); // Set a background color for the canvas

    if (poses.length > 0) {
        const rightWrist = poses[0].pose.rightWrist;
        const leftWrist = poses[0].pose.leftWrist;

        const distance = dist(rightWrist.x, rightWrist.y, leftWrist.x, leftWrist.y);
        textSizeValue = floor(distance); // Update textSizeValue with the calculated difference

        document.getElementById('fontSizeIndicator').innerText = `Font Size: ${textSizeValue}px`;
    }

    textSize(textSizeValue); // Set the text size dynamically
    fill(227, 9, 53); // Set the color for the text
    textAlign(CENTER, CENTER); // Center the text
    text('Kavin', width / 2, height / 2); // Display text on the canvas
}

function modelLoaded() {
    console.log('PoseNet Model Loaded!');
}

function gotPoses(results) {
    poses = results;
    if (poses.length > 0) {
        console.log(poses);
    }
}
