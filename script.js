const canvas = document.getElementById("wave-canvas");
const ctx = canvas.getContext("2d");

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Configuration ---
let baselineY = canvas.height / 2; // Fixed vertical center of the wave
const fixedFrequency = 0.09; // Base density of the wave
const fixedAmplitude = 0; // Base height of the wave

const maxDynamicAmplitude = 400; // Max additional height for the "beat"
const influenceRadius = 200; // How wide the "beat" effect is

const waveSpeed = 0.01; // How fast the underlying wave moves

// --- State ---
let mouseX = canvas.width / 2; // Initial mouse X
let mouseY = baselineY; // Initial mouse Y
let time = 0; // Used for continuous animation

// The main animation loop
function animate() {
  // 1. Clear the canvas completely
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Calculate dynamic amplitude based on mouseY
  // This controls the *intensity* of the localized beat
  const distanceY = Math.abs(mouseY - baselineY);
  const dynamicAmplitudeScale = distanceY / (canvas.height / 2);
  const currentDynamicAmplitude = dynamicAmplitudeScale * maxDynamicAmplitude;

  // 3. Start drawing the line
  ctx.beginPath();
  ctx.moveTo(0, baselineY); // Start at the left edge
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 10; // Adjust line thickness as needed

  // 4. Loop through every pixel horizontally
  for (let x = 0; x < canvas.width; x++) {
    // Base wave calculation (always moving)
    let y = baselineY + Math.sin(x * fixedFrequency + time) * fixedAmplitude;

    // Apply localized "beat" effect
    const distanceX = Math.abs(x - mouseX);

    if (distanceX < influenceRadius) {
      // Calculate falloff: 1 at mouseX, 0 at influenceRadius
      const influence = 1 - Math.pow(distanceX / influenceRadius, 2); // Squared for a smoother, faster falloff

      // Add the dynamic amplitude to the base wave
      y +=
        Math.sin(x * fixedFrequency + time) *
        currentDynamicAmplitude *
        influence;
    }

    ctx.lineTo(x, y);
  }

  // 5. Render the line
  ctx.stroke();

  // 6. Update time for continuous animation
  time += waveSpeed;

  // 7. Request the next frame
  requestAnimationFrame(animate);
}

// --- Event Listeners ---

// Listen for mouse movement to update mouseX and mouseY
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Adjust canvas size if window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  baselineY = canvas.height / 2; // Recalculate center
});

// Start the animation
animate();

document.addEventListener("DOMContentLoaded", () => {
  // Select ALL elements with the class "course"
  const courseElements = document.querySelectorAll(".course");

  // Loop over each .course element
  courseElements.forEach((course) => {
    // Find the video element *inside* this specific .course div
    const video = course.querySelector("video");

    // Make sure we found a video before adding listeners
    if (video) {
      // When the mouse enters the div
      course.addEventListener("mouseenter", () => {
        video.play();
      });

      // When the mouse leaves the div
      course.addEventListener("mouseleave", () => {
        video.pause();
        // video.currentTime = 0; // Reset video to the start
      });
    }
  });
});
