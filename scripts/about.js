/* 
  
  Philip Weir
  x25132521
  x25132521@student.ncirl.ie

  Date: 07/12/2025
  Higher Diploma in Computing  
  Web Design Client-Side Scripting
   
  ABOUT PAGE JS
  This script is responsible for controlling the display of faculty biography text and managing the associated button text states

 */

document.querySelectorAll(".toggle-bio").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".instructor-card");
    const bio = card.querySelector(".teacher-bio");
    const isHidden = bio.classList.toggle("hidden");

    btn.textContent = isHidden ? "Show Bio" : "Hide Bio";
    btn.setAttribute("aria-expanded", String(!isHidden));
  });
});
