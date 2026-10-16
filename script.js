/* ==========================================================
   [SECTION: STARFIELD CONFIGURATION (tsParticles)]
   ========================================================== */
async function initSpace() {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: { enable: false },
      background: { color: "#020403" },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: { value: 115, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ["#ffffff", "#d9ffe8", "#8affb9", "#42e98d"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.15, max: 0.85 },
          animation: { enable: true, speed: 0.18, minimumValue: 0.12, sync: false }
        },
        size: {
          value: { min: 0.5, max: 2.2 },
          animation: { enable: true, speed: 0.35, minimumValue: 0.4, sync: false }
        },
        move: {
          enable: true,
          direction: "bottom-left",
          speed: 0.18,
          random: true,
          straight: false,
          outModes: { default: "out" }
        },
        twinkle: {
          particles: { enable: true, frequency: 0.035, opacity: 1, color: "#baffd3" }
        }
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } }
    }
  });
}

initSpace().catch((error) => {
  console.error("Could not initialize the starfield:", error);
});


/* ==========================================================
   [SECTION: EMERALD MAGIC CURSOR & LIGHT GLOW EFFECT]
   ========================================================== */
const cursorCanvas = document.getElementById("cursor-canvas");
const ctx = cursorCanvas.getContext("2d");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let curX = mouseX;
let curY = mouseY;
let trail = [];

function resizeCursorCanvas() {
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCursorCanvas);
resizeCursorCanvas();

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

  const dX = mouseX - curX;
  const dY = mouseY - curY;
  curX += dX * 0.15;
  curY += dY * 0.15;

  // إضاءة كشاف الماوس الخلفية
  const glowGradient = ctx.createRadialGradient(curX, curY, 0, curX, curY, 70);
  glowGradient.addColorStop(0, "rgba(0, 255, 136, 0.14)");
  glowGradient.addColorStop(0.5, "rgba(0, 150, 80, 0.04)");
  glowGradient.addColorStop(1, "transparent");

  ctx.beginPath();
  ctx.arc(curX, curY, 130, 0, Math.PI * 2);
  ctx.fillStyle = glowGradient;
  ctx.fill();

  trail.push({ x: curX, y: curY, alpha: 1 });

  for (let i = trail.length - 1; i >= 0; i--) {
    let p = trail[i];
    p.alpha *= 0.88;

    if (p.alpha < 0.01) {
      trail.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5 * p.alpha, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 136, ${p.alpha * 0.7})`;
    ctx.shadowBlur = 10 * p.alpha;
    ctx.shadowColor = "#00ff88";
    ctx.fill();
  }
  
  ctx.beginPath();
  ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.shadowBlur = 12;
  ctx.shadowColor = "#43ffad";
  ctx.fill();

  requestAnimationFrame(animateCursor);
}

animateCursor();


/* ==========================================================
   [SECTION: NAVBAR LOGO MOUSE INTERACTION (NO CURSOR HIDE)]
   ========================================================== */
const logoTrigger = document.getElementById("logo-trigger");

if (logoTrigger) {
  logoTrigger.addEventListener("mouseenter", () => {
    logoTrigger.classList.add("active-logo");
    // تم إلغاء إخفاء المؤشر تماماً بناءً على طلبك
  });

  logoTrigger.addEventListener("mouseleave", () => {
    logoTrigger.classList.remove("active-logo");
  });
}

/* ==========================================================
   [SECTION: FULL ROADMAP DATA CONTROLLER]
   ========================================================== */

/* ==========================================================
   [SECTION: ROADMAP DATA WITH EXACT DATES]
   ========================================================== */

const roadmapData = {
    amman42: {
        title: "Cyber Security Intensive Program",
        tag: "10/2026 - Present | 42 Amman - Jordan",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
        desc: "Currently undergoing rigorous peer-to-peer coding and defensive security training at 42 Amman. Deepening mastery in UNIX/Linux administration, shell scripting, C programming, and practical cybersecurity.",
        tech: ["Linux / UNIX", "Shell Scripting", "Peer-to-Peer", "Defensive Security"]
    },
    psut: {
        title: "Cyber Security & SOC Training",
        tag: "05/2026 - 08/2026 | PSUT - Jordan",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
        desc: "Intensive hands-on technical training at Princess Sumaya University for Technology (PSUT). Focused on SOC operations, SIEM monitoring (Wazuh), log analysis, and threat intelligence frameworks.",
        tech: ["Wazuh SIEM", "SOC Operations", "Threat Intelligence", "Log Analysis"]
    },
    ops: {
        title: "Operational Work Experience & Adaptability",
        tag: "2022 - 2024 | United Kingdom Experience",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
        desc: "Gained real-world resilience, adaptability, and high work ethic during and following postgraduate studies in the UK—working across farm operations, warehouse logistics, restaurant hospitality, and vehicle care services.",
        tech: ["Work Ethic", "Logistics", "Adaptability", "Resilience", "Time Management"]
    },
    msc: {
        title: "Master's Degree in Computing",
        tag: "2022 - 2023 | Postgraduate Degree - UK",
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
        desc: "Completed Master's studies in Computing in the United Kingdom. Focused on advanced software architectures, system security fundamentals, and computer science methodologies.",
        tech: ["Computer Science", "Software Architecture", "UK Education"]
    },
    luminus: {
        title: "Front-End Development Program",
        tag: "2021 | Luminus Technical College - Jordan",
        img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=400&q=80",
        desc: "Completed technical front-end web development training at Luminus Technical University College, mastering HTML5, CSS3, JavaScript DOM manipulation, and modern web UI standards.",
        tech: ["HTML5", "CSS3 Flexbox", "JavaScript", "Responsive Design"]
    },
    mech: {
        title: "B.Sc. in Mechanical Engineering",
        tag: "2016 - 2021 | Academic Degree - Jordan",
        img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
        desc: "Earned a Bachelor's Degree in Mechanical Engineering from Jordan. Built a firm technical mindset rooted in analytical logic, complex system mechanics, and engineering problem-solving.",
        tech: ["Engineering Logic", "System Dynamics", "Problem Solving"]
    },
    highschool: {
        title: "High School Education",
        tag: "2015 | Secondary School - Saudi Arabia",
        img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
        desc: "Graduated secondary school in Saudi Arabia, establishing strong scientific fundamentals, discipline, and analytical skills.",
        tech: ["Mathematics", "Sciences", "Analytical Fundamentals"]
    }
};

function openRoadmapModal(key) {
    const data = roadmapData[key];
    if (!data) return;

    document.getElementById("modal-img").src = data.img;
    document.getElementById("modal-tag").textContent = data.tag;
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-desc").textContent = data.desc;

    const techContainer = document.getElementById("modal-tech");
    techContainer.innerHTML = "";
    data.tech.forEach(t => {
        const badge = document.createElement("span");
        badge.className = "modal-tech-badge";
        badge.textContent = t;
        techContainer.appendChild(badge);
    });

    document.getElementById("roadmap-modal").classList.add("active");
}

function closeRoadmapModalDirect() {
    document.getElementById("roadmap-modal").classList.remove("active");
}

function closeRoadmapModal(event) {
    if (event.target.classList.contains("modal-overlay")) {
        closeRoadmapModalDirect();
    }
}