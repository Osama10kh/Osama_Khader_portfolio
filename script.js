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
   [NAVBAR SCROLL BACKGROUND TOGGLE]
   ========================================================== */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar'); // أو قم بتغيير اسم الكلاس حسب المسمى لديك (مثلاً header)
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ==========================================================
   [SECTION: FULL ROADMAP DATA CONTROLLER]
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



/* ==========================================================
   [DUAL-ACTION SMART SCROLL CONTROLLER]
   ========================================================== */

// النزول بمقدار شاشة واحدة للأسفل
function scrollStepDown() {
    window.scrollBy({
        top: window.innerHeight * 0.85,
        behavior: 'smooth'
    });
}

// الصعود بمقدار شاشة واحدة للأعلى
function scrollStepUp() {
    window.scrollBy({
        top: -window.innerHeight * 0.85,
        behavior: 'smooth'
    });
}

// الوظيفة للمساحة الوسطية (التحول تلقائياً لزر Top عند النهاية)
function handleMainScrollAction() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // إذا وصل المستخدم لنهاية الصفحة تقريباً، يعيده لأول الصفحة
    if (scrollPosition + windowHeight >= fullHeight - 80) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // افتراضياً ينزل للاسفل إذا ضغط على النص
        scrollStepDown();
    }
}

// مراقبة موقع الصفحة لتحديث نص الزر (Scroll / Top)
window.addEventListener('scroll', () => {
    const btnText = document.getElementById('scroll-text');
    if (!btnText) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // إذا وصل المستخدم لنهاية الصفحة
    if (scrollPosition + windowHeight >= fullHeight - 80) {
        btnText.textContent = "Top";
    } else {
        btnText.textContent = "Scroll";
    }
});


/* ==========================================================
   [CAROUSEL SLIDER & FILTER LOGIC FIX]
   ========================================================== */

const projectData = {
    soclab: {
        title: "Mini SOC & Wazuh Detection Lab",
        tag: "Cyber Security & SOC",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
        desc: "Built a complete Mini SOC & Detection Lab utilizing Wazuh SIEM, Windows, Linux, and VirtualBox. Configured Sysmon, centralized log collection, and custom detection rules to identify suspicious activities and simulated attacks.",
        tech: ["Wazuh SIEM", "Sysmon", "VirtualBox", "Log Analysis"],
        github: "https://github.com/OsamaKhader",
        live: "#"
    },
    ctflabs: {
        title: "TryHackMe & CyberDefenders Labs",
        tag: "Cyber Security & DFIR",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        desc: "Active participation in TryHackMe and CyberDefenders rooms. Solved hands-on challenges focused on Digital Forensics and Incident Response (DFIR), log investigation, threat hunting, and packet analysis.",
        tech: ["TryHackMe", "CyberDefenders", "DFIR", "Wireshark", "Threat Hunting"],
        github: "https://github.com/OsamaKhader",
        live: "https://tryhackme.com"
    },
    pwa: {
        title: "PWA Frameworks Comparative Evaluation",
        tag: "IT & Front-End Engineering",
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        desc: "Compared popular JavaScript frameworks (React, Angular, Vue) for building Progressive Web Applications. Built small prototype PWAs to test performance, load speed, and offline capabilities.",
        tech: ["React / Angular / Vue", "PWA", "JavaScript", "Performance"],
        github: "https://github.com/OsamaKhader",
        live: "#"
    },
    mechanical: {
        title: "Effects of Adding Copper to ZMAK5 Alloy",
        tag: "Mechanical Engineering",
        img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
        desc: "Analyzed the stress-strain behavior and material performance of ZMAK5 alloy under various loads. Utilized lab measurement tools to compare material hardness results.",
        tech: ["Stress-Strain", "Metallurgy", "Lab Testing", "Materials"],
        github: "https://github.com/OsamaKhader",
        live: "#"
    }
};

let currentIndex = 0;
let autoScrollTimer = null;

// تشغيل الفلتر والـ Carousel عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    initProjectFilters();
    setupCarouselControls();
    startAutoScroll();
});

// 1. برمجية الفلتر المصلحة
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.carousel-track .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const category = e.target.getAttribute('data-category');

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

            // إعادة ضبط موقع السلايدر للأول عند الفلترة
            currentIndex = 0;
            updateCarouselPosition();
        });
    });
}

// 2. التحكم بالأسهم للتحريك يمين ويسار
function setupCarouselControls() {
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            moveCarousel('prev');
            resetAutoScroll();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveCarousel('next');
            resetAutoScroll();
        });
    }
}

function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const visibleCards = Array.from(document.querySelectorAll('.carousel-track .project-card'))
                              .filter(card => card.style.display !== 'none');

    if (visibleCards.length <= 3) return; // لا حاجة للتحريك إذا كان المعروض 3 أو أقل

    const maxIndex = visibleCards.length - 3;

    if (direction === 'next') {
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
    } else {
        currentIndex = (currentIndex <= 0) ? maxIndex : currentIndex - 1;
    }

    updateCarouselPosition();
}

function updateCarouselPosition() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    // حساب المسافة التي سيقطعها السلايدر (عرض الكارد + Gap)
    const cardWidth = track.querySelector('.project-card').offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// 3. التمرير التلقائي كل 4 ثوانٍ
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        moveCarousel('next');
    }, 4000);
}

function resetAutoScroll() {
    clearInterval(autoScrollTimer);
    startAutoScroll();
}

// 4. التحكم بـ Modal التفاصيل
function openProjectModal(key) {
    const data = projectData[key];
    if (!data) return;

    document.getElementById("p-modal-img").src = data.img;
    document.getElementById("p-modal-tag").textContent = data.tag;
    document.getElementById("p-modal-title").textContent = data.title;
    document.getElementById("p-modal-desc").textContent = data.desc;

    document.getElementById("p-modal-github").href = data.github;
    document.getElementById("p-modal-live").href = data.live;

    const techContainer = document.getElementById("p-modal-tech");
    techContainer.innerHTML = "";
    data.tech.forEach(t => {
        const badge = document.createElement("span");
        badge.className = "modal-tech-badge";
        badge.textContent = t;
        techContainer.appendChild(badge);
    });

    document.getElementById("project-modal").classList.add("active");
    document.body.style.cursor = "default";
}

function closeProjectModalDirect() {
    document.getElementById("project-modal").classList.remove("active");
    document.body.style.cursor = "";
}

function closeProjectModal(event) {
    if (event.target.classList.contains("modal-overlay")) {
        closeProjectModalDirect();
    }
}

/* ==========================================================
   [SECTION 03: THREE ROWS SLIDER CONTROLLER]
   ========================================================== */

const rowPositions = {
    'skills-track': 0,
    'certs-track': 0,
    'hobbies-track': 0
};

// تحريك الصفوف عند الضغط على الأسهم (يمين / يسار)
function moveRowSlider(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const cards = track.querySelectorAll('.slider-item-card');
    if (cards.length <= 3) return; // لا تتحرك إذا كانت البطاقات 3 أو أقل

    const maxIndex = cards.length - 3;
    const cardWidth = cards[0].offsetWidth + 20; // عرض الكارد + Gap

    if (direction === 'next') {
        rowPositions[trackId] = (rowPositions[trackId] >= maxIndex) ? 0 : rowPositions[trackId] + 1;
    } else {
        rowPositions[trackId] = (rowPositions[trackId] <= 0) ? maxIndex : rowPositions[trackId] - 1;
    }

    track.style.transform = `translateX(-${rowPositions[trackId] * cardWidth}px)`;
}

// التمرير التلقائي المستمر لكل صف كل 5 ثوانٍ
setInterval(() => {
    moveRowSlider('skills-track', 'next');
}, 5000);

setInterval(() => {
    moveRowSlider('certs-track', 'next');
}, 6500);

setInterval(() => {
    moveRowSlider('hobbies-track', 'next');
}, 8000);


/* ==========================================================
   [SECTION 04: ADVANCED FORM VALIDATION & CONTACT CONTROLLER]
   ========================================================== */

// 1. نسخ الإيميل بلمسة واحدة
function copyEmailToClipboard() {
    const emailText = document.getElementById("user-email-text").textContent;
    const btnText = document.getElementById("copy-btn-text");

    navigator.clipboard.writeText(emailText).then(() => {
        btnText.textContent = "Copied!";
        setTimeout(() => {
            btnText.textContent = "Copy";
        }, 2500);
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}

// 2. التحقق الذكي من النموذج والإرسال
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("portfolio-contact-form");
    const nameInput = document.getElementById("sender-name");
    const emailInput = document.getElementById("sender-email");
    const phoneInput = document.getElementById("sender-phone");
    const subjectInput = document.getElementById("msg-subject");
    const messageInput = document.getElementById("msg-content");
    const statusText = document.getElementById("form-response-status");
    const submitBtn = document.getElementById("submit-btn");

    clearFormErrors();
    let isValid = true;

    // فحص الاسم
    if (nameInput.value.trim().length < 2) {
        showFieldError("err-name", "Please enter your name (at least 2 characters).");
        isValid = false;
    }

    // فحص الإيميل بـ Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError("err-email", "Please enter a valid email address.");
        isValid = false;
    }

    // فحص الموضوع
    if (subjectInput.value.trim().length < 3) {
        showFieldError("err-subject", "Please enter a subject.");
        isValid = false;
    }

    // فحص الرسالة
    if (messageInput.value.trim().length < 10) {
        showFieldError("err-message", "Message must be at least 10 characters long.");
        isValid = false;
    }

    if (!isValid) {
        statusText.style.color = "#ff5f56";
        statusText.textContent = "⚠️ Please fix the errors highlighted above.";
        return;
    }

    // تجهيز البيانات بعد نجاح الفحص
    statusText.style.color = "#00ff88";
    statusText.textContent = "⚡ Sending message directly to Osama's inbox...";
    submitBtn.disabled = true;

    const actionUrl = form.getAttribute("action");

    // إرسال البيانات عبر Formspree مجاناً وبصمت (AJAX Fetch)
    if (actionUrl && !actionUrl.includes("YOUR_FORMSPREE_ID")) {
        try {
            const formData = new FormData(form);
            const response = await fetch(actionUrl, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusText.style.color = "#00ff88";
                statusText.textContent = "✅ Message sent successfully! I will reply shortly.";
                form.reset();
            } else {
                throw new Error("Formspree response not OK");
            }
        } catch (error) {
            // كبديل إذا لم يتم إعداد Formspree بعد: فتح mailto تلقائياً
            fallbackMailto(nameInput.value, emailInput.value, phoneInput.value, subjectInput.value, messageInput.value);
        }
    } else {
        // إذا لم تقم بربط ID الخاص بـ Formspree بعد، يفتح Mailto مباشرة
        fallbackMailto(nameInput.value, emailInput.value, phoneInput.value, subjectInput.value, messageInput.value);
    }

    submitBtn.disabled = false;
}

function fallbackMailto(name, email, phone, subject, message) {
    const statusText = document.getElementById("form-response-status");
    const mailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:eng.o.khader@gmail.com?subject=${encodeURIComponent(subject + " - " + name)}&body=${encodeURIComponent(mailBody)}`;
    
    window.location.href = mailtoUrl;
    statusText.style.color = "#00ff88";
    statusText.textContent = "✅ Prepared in your mail client! Press Send.";
    document.getElementById("portfolio-contact-form").reset();
}

function showFieldError(errorId, message) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
        errorSpan.style.display = "block";
        errorSpan.textContent = message;
    }
}

function clearFormErrors() {
    const errors = document.querySelectorAll(".field-error-msg");
    errors.forEach(err => {
        err.textContent = "";
        err.style.display = "none";
    });
}


/* ==========================================================
   [DYNAMIC FOOTER CONTROLLER: AUTO YEAR & LIVE TERMINAL CLOCK]
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initDynamicFooter();
});

function initDynamicFooter() {
    // 1. تحديث السنة تلقائياً لعدم الحاجه لتعديلها يدوياً أبداً
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. تشغيل التوقيت الحي المباشر (Amman Local / UTC Clock)
    updateFooterClock();
    setInterval(updateFooterClock, 1000);
}

function updateFooterClock() {
    const clockElement = document.getElementById("footer-live-clock");
    if (!clockElement) return;

    const now = new Date();
    // تحويل الوقت لتنسيق HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `AMMAN ${hours}:${minutes}:${seconds}`;
}