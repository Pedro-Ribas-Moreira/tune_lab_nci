/* 
  Pedro Moreira
  x22140034
  x22140034@student.ncirl.ie

  Date: 06/12/2025
  Higher Diploma in Computing  
  Web Design Client-Side Scripting
   
*/

/* This script powers the visual interactivity of the page.
 It renders a full-screen sine wave animation and handles video previews.
*/

// Reference: Mozilla Developer Network (n.d.). Canvas API Tutorial. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial [Accessed 6 Dec. 2025].
const canvas = document.getElementById("wave-canvas");
const ctx = canvas.getContext("2d");

// Set canvas to full size based on widow size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let linePosition = canvas.height / 2;
const frequency = 0.09;
const amplitude = 0;

const maxAmplitude = 400;
const influenceRadius = 200;

const speed = 0.02;

// --- Initial State - the variables will assume the mouse is resting in the center, so it will be just a straight line---
let mouseX = canvas.width / 2;
let mouseY = linePosition;
let time = 0;

// The main animation loop
// Reference: Mozilla Developer Network (n.d.). Window: requestAnimationFrame() method. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame  [Accessed 6 Dec. 2025].

function animate() {
  // 1. Clear the canvas completely
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Calculate amplitude (height of the wave) based on mouse position on Y
  const axisY = Math.abs(mouseY - linePosition);
  const dynamicAmplitude = axisY / (canvas.height / 2);
  const currentDynamicAmplitude = dynamicAmplitude * maxAmplitude;

  // 3. Start drawing the line
  ctx.beginPath();
  ctx.moveTo(0, linePosition);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 10;

  // 4. Loop every pixel horizontally
  // Reference: W3Schools (n.d.). JavaScript Math Object. [online] Available at: https://www.w3schools.com/js/js_math.asp [Accessed 6 Dec. 2025].

  /* This loop iterates through every horizontal pixel of the canvas (width) to draw the wave. For each pixel, it first calculates a base vertical position using a sine function. It then performs a proximity check: if the current pixel is within a specific radius of the mouse cursor, the code dynamically increases the wave's amplitude at that point, creating the localized interaction effect before drawing the line segment. */

  for (let x = 0; x < canvas.width; x++) {
    // Wave calculation (this will make the wave always moving)
    let y = linePosition + Math.sin(x * frequency + time) * amplitude;

    // Apply "beat" effect
    const distanceX = Math.abs(x - mouseX);

    if (distanceX < influenceRadius) {
      // Calculate falloff: 1 at mouseX, 0 at influenceRadius
      const influence = 1 - Math.pow(distanceX / influenceRadius, 2);

      // Add the dynamic amplitude to the base wave
      y += Math.sin(x * frequency + time) * currentDynamicAmplitude * influence;
    }

    ctx.lineTo(x, y);
  }

  // 5. Render the line
  ctx.stroke();

  // 6. Update time for continuous animation
  time += speed;

  // 7. Request the next frame
  requestAnimationFrame(animate);
}

// --- Event Listeners ---

/* These listeners wait in the background for user actions, like moving the mouse or resizing the window. When one of these actions happens, they immediately update the important variables (like the mouse coordinates or screen width). The animation loop automatically uses these new numbers the very next time it draws the wave, which makes the visual react instantly to what you are doing.*/

// Reference: W3Schools (n.d.). HTML DOM Document addEventListener() Method. [online] Available at: https://www.w3schools.com/jsref/met_document_addeventlistener.asp [Accessed 6 Dec. 2025].
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Adjust canvas size if window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  linePosition = canvas.height / 2;
});

// Start the animation
animate();

// Video preview on hover functionality
// Reference: Mozilla Developer Network (n.d.). HTMLMediaElement: play() method. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play [Accessed 6 Dec. 2025].
document.addEventListener("DOMContentLoaded", () => {
  const courseElements = document.querySelectorAll(".course");

  courseElements.forEach((course) => {
    const video = course.querySelector("video");

    if (video) {
      course.addEventListener("mouseenter", () => {
        video.play();
      });

      course.addEventListener("mouseleave", () => {
        video.pause();
      });
    }
  });
});
