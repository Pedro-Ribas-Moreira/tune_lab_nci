document.querySelectorAll(".toggle-bio").forEach(e=>{e.addEventListener("click",()=>{let t=e.closest(".instructor-card").querySelector(".teacher-bio").classList.toggle("hidden");e.textContent=t?"Show Bio":"Hide Bio",e.setAttribute("aria-expanded",String(!t))})});
//# sourceMappingURL=about.6ced1d3e.js.map
