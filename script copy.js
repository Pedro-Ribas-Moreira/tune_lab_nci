const canvas = document.getElementById("line-canvas");
const ctx = canvas.getContext("2d");

// Set canvas to full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Store the last known mouse Y position
// Start it in the middle
let mouseY = canvas.height / 2;

// Function to draw the line
function drawLine() {
  // 1. Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Start drawing
  ctx.beginPath();
  ctx.moveTo(0, mouseY); // Start at left edge (x=0) at the mouse's Y
  ctx.lineTo(canvas.width, mouseY); // End at right edge (x=canvas.width)

  // 3. Set line style and draw it
  ctx.strokeStyle = "#FFFFFF"; // White line
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Listen for the mouse to move
window.addEventListener("mousemove", (event) => {
  mouseY = event.clientY; // Update the Y position
  drawLine(); // Redraw the line
});

// Adjust canvas size and redraw if window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawLine(); // Redraw in case Y position is off-screen
});

// Draw the initial line in the center
drawLine();

// const soundbarsContainer = document.querySelector("#soundbars");
// const bars = []; // Array to hold the bar elements
// const barMaxBeats = []; // NEW: Array to store each bar's max beat height

// // --- Configuration ---
// const minHeight = 100; // Minimum height of the bars (in px)
// const maxHeight = 400; // Maximum height for the *mouse wave* (in px)
// const waveSpread = 400; // How wide the "mouse wave" is (in px)
// const barWidth = 10; // Must match your CSS
// const beatSpeed = 0.008; // How fast the "beat" pulses
// const beatAmount = 100; // The *maximum* (random) height of the beat
// // ---------------------

// const width = soundbarsContainer.clientWidth;
// const numBars = Math.floor(width / barWidth);

// // Variable to store the mouse's X position
// let mouseX = -1000; // Start it off-screen

// // 1. Create all the bars
// for (let i = 0; i < numBars; i++) {
//   const bar = document.createElement("div");
//   bar.style.height = `${minHeight}px`;
//   bar.classList.add("soundbar");
//   soundbarsContainer.appendChild(bar);
//   bars.push(bar);

//   // NEW: Give each bar its own random max beat height
//   barMaxBeats.push(Math.random() * beatAmount);
// }

// // 2. Store the horizontal center of each bar
// const barCenters = bars.map((bar) => {
//   const barRect = bar.getBoundingClientRect();
//   return barRect.left + barRect.width / 2;
// });

// // 3. Listen for mouse move, but *only* to update the mouseX variable
// document.addEventListener("mousemove", (e) => {
//   mouseX = e.clientX;
// });

// // 4. Reset mouseX when the mouse leaves the window
// document.addEventListener("mouseleave", () => {
//   mouseX = -1000; // Move it off-screen to make the wave disappear
// });

// // 5. --- The Animation Loop ---
// function animate(timestamp) {
//   const time = timestamp * beatSpeed; // Get current time for the beat

//   // NEW: Create a central "beat" factor (0 to 1)
//   // We use Math.pow() to create a sharp "thump" effect
//   // It stays low, then peaks quickly, like a drum hit.
//   const beatFactor = Math.pow((Math.sin(time) + 1) / 2, 3);

//   bars.forEach((bar, index) => {
//     // --- Calculate Beat Height ---
//     const thisBarMaxBeat = barMaxBeats[index]; // Get this bar's random max
//     const beatHeight = minHeight + beatFactor * thisBarMaxBeat;

//     // --- Calculate Mouse Wave Height ---
//     const barCenterX = barCenters[index];
//     const distance = Math.abs(mouseX - barCenterX);

//     let mouseHeight = minHeight; // Default to minHeight

//     if (distance < waveSpread) {
//       const proximity = 1 - distance / waveSpread;
//       mouseHeight =
//         minHeight + (maxHeight - minHeight) * (proximity * proximity);
//     }

//     // --- Set Final Height ---
//     // Use the *larger* of the two heights
//     bar.style.height = `${Math.max(mouseHeight, beatHeight)}px`;
//   });

//   // 6. Keep the loop running
//   requestAnimationFrame(animate);
// }

// // 7. Start the animation!
// animate();
