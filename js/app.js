/* ===== Locations for pins ===== */
const locations = {
  USA_MI:   { x: 30, y: 35, label: "Michigan, USA" },
  ITALY_MI: { x: 52, y: 40, label: "Milan, Italy" },
  PORTUGAL: { x: 46, y: 42, label: "Braga, Portugal" },
  INDIA_AP: { x: 62, y: 50, label: "India" }
};

/* ===== Q&A Data (resume content) ===== */
const questions = [
  {
    question: "Q1: At fleet scale, what core pattern would you use to ingest petabytes/day reliably (think queues, shards, backpressure)?",
    accept: ["kafka", "queue", "shard", "distributed"],
    title: "Reforma Group LLC — Application Developer / Inventory Analyst",
    badge: "Experience",
    bullets: [
      "Built Python-based ETL + SQL stored procedures to sync data across sources and Odoo ERP.",
      "Automated purchase orders via VBA tools; tuned dynamic reorder points.",
      "Cross-functional data integrity checks across manufacturing, inventory, and shipping.",
      "Analyzed discrepancies with Pandas/NumPy; optimized safety stock and carrying costs."
    ],
    locationKey: "USA_MI"
  },
  {
    question: "Q2: To drive training jobs across thousands of GPUs, which orchestration layer would you reach for (and why)?",
    accept: ["kubernetes", "k8s", "ray"],
    title: "Cloudscale Technologies — Cybersecurity Project Management Intern",
    badge: "Experience",
    bullets: [
      "Managed test automation with Postman; integrated security features in pipelines.",
      "Led device security (wrapping, jailbreak testing), encryption rollouts, vulnerability assessments.",
      "Verified platforms (Microsoft Dynamics, Infoblox) and tracked work in Jira."
    ],
    locationKey: "USA_MI"
  },
  {
    question: "Q3: For high-volume transactional systems (e.g., admissions), name 1–2 best practices to ensure data integrity & traceability.",
    accept: ["lineage", "versioning", "audit"],
    title: "Central Michigan University — Student Assistant",
    badge: "Experience",
    bullets: [
      "Ran end-to-end admissions ops using SAP for tracking and reporting.",
      "Designed targeted email campaigns; improved engagement & application rates.",
      "Maintained accurate student data & reports; ensured integrity and timeliness."
    ],
    locationKey: "USA_MI"
  },
  {
    question: "Q4: If you had geospatial + socioeconomic data, which stack would you use to analyze and visualize climate patterns?",
    accept: ["python", "r", "qgis", "power bi", "tableau"],
    title: "Central Michigan University — Graduate Assistant (Entrepreneurship Dept.)",
    badge: "Experience",
    bullets: [
      "Analyzed climate justice data using R/Python/Excel; built insights & visualizations.",
      "Used QGIS for geospatial analysis; Power BI for dashboards.",
      "Co-authored research outputs; turned data into actionable recommendations."
    ],
    locationKey: "USA_MI"
  },
  {
    question: "Q5: In operations with safety constraints (gas station), what KPIs & controls would you monitor continuously?",
    accept: ["kpi", "uptime", "sla", "inventory", "compliance", "safety"],
    title: "Yalamanchili Fuels — Manager of Business Operations",
    badge: "Experience",
    bullets: [
      "Ran daily operations using POS & fuel management software; ensured inventory readiness.",
      "Led & trained team; used CRM principles for service and smooth issue handling.",
      "Maintained compliance (safety, environmental); leveraged CCTV for loss prevention.",
      "Managed finances in Tally ERP9; tracked KPIs to increase profitability."
    ],
    locationKey: "INDIA_AP"
  },
  {
    question: "Q6: Which tools would you use to plan multi-team project timelines and report status to leadership?",
    accept: ["primavera", "p6", "jira", "power bi", "tableau"],
    title: "Pegaso Ingenieria (Italy) — Project Planner & Controller",
    badge: "Experience",
    bullets: [
      "Coordinated cross-functional teams with Primavera P6 for milestone delivery.",
      "Streamlined analytics with Power BI & Tableau; created budget insights via SQL/Excel.",
      "Developed Project Execution Plans and reviewed subcontract scopes."
    ],
    locationKey: "ITALY_MI"
  },
  {
    question: "Q7: In a physical project (e.g., dam spillway), which digital tools and data would you integrate for execution readiness?",
    accept: ["autocad", "estimation", "procurement"],
    title: "SEW Infrastructure Ltd. — Junior Civil Engineer",
    badge: "Experience",
    bullets: [
      "Executed slope concreting at Indira Sagar Dam spillway using AutoCAD and on-site controls.",
      "Handled estimation, budgeting, procurement; coordinated multidisciplinary deliverables.",
      "Used analytics (Excel/Tableau) for cost forecasting & procurement decisions."
    ],
    locationKey: "INDIA_AP"
  },
  {
    question: "Q8: Name a core analytics or leadership concept from grad school you’d apply to training infrastructure at Tesla.",
    accept: ["analytics", "leadership", "strategic", "project", "data"],
    title: "Education",
    badge: "Education",
    bullets: [
      "MBA (Business Data Analytics), Central Michigan University — GPA 3.57/4.0",
      "MSc (Built Environment), Politecnico di Milano — GPA 3.65/4.0",
      "BSc (Civil Engineering), RVR&JC College of Engineering"
    ],
    locationKey: "ITALY_MI"
  },
  {
    question: "Q9: List 3+ tools you’d combine to train a multimodal model on petabyte-scale video logs.",
    accept: ["python", "sql", "ray", "kubernetes", "pytorch", "kafka"],
    title: "Technical Tools & Skills",
    badge: "Skills",
    bullets: [
      "Python, SQL, Pandas/NumPy, Postman",
      "Power BI, Tableau, Excel; SAP experience",
      "Kubernetes/Ray (orchestration concepts), CI/CD awareness",
      "Security foundations: encryption, vuln. assessment, access controls"
    ],
    final: true,
    locationKey: "PORTUGAL"
  }
];

/* ===== DOM Helpers ===== */
function $(id) { return document.getElementById(id); }

/* ===== Typewriter for questions ===== */
function typeQuestion(txt) {
  const el = $("question-text");
  el.classList.add("typewriter");
  el.textContent = "";
  let i = 0;
  const t = setInterval(() => {
    el.textContent += txt[i++] || "";
    if (i > txt.length) {
      clearInterval(t);
      el.classList.remove("typewriter");
    }
  }, 18);
}

function setQuestion(i) {
  typeQuestion(questions[i].question);
  $("progress").innerText = `Step ${i + 1} of ${questions.length}`;
}

/* ===== Answer Matching ===== */
function isCorrect(userText, acceptedKeywords) {
  const a = userText.toLowerCase().trim();
  return acceptedKeywords.some(k => a.includes(k));
}

/* ===== Pins & Arcs ===== */
function createPins() {
  const layer = $("pin-layer");
  layer.innerHTML = "";
  Object.entries(locations).forEach(([key, loc]) => {
    const el = document.createElement("div");
    el.className = "pin";
    el.style.left = `${loc.x}%`;
    el.style.top = `${loc.y}%`;
    el.dataset.key = key;
    el.setAttribute("data-label", loc.label);
    layer.appendChild(el);
  });
}
function activatePin(key) {
  const pin = document.querySelector(`.pin[data-key="${key}"]`);
  if (pin) pin.classList.add("active");
}
function drawArc(fromKey, toKey) {
  const svg = $("arc-layer");
  svg.innerHTML = "";
  const from = locations[fromKey], to = locations[toKey];
  if (!from || !to) return;
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const fx = (from.x / 100) * svg.clientWidth;
  const fy = (from.y / 100) * svg.clientHeight;
  const tx = (to.x / 100) * svg.clientWidth;
  const ty = (to.y / 100) * svg.clientHeight;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2 - 50;
  path.setAttribute("d", `M${fx},${fy} Q${mx},${my} ${tx},${ty}`);
  path.setAttribute("stroke", "#cc0000");
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-dasharray", "300");
  path.setAttribute("stroke-dashoffset", "300");
  path.style.animation = "arcDraw 1s forwards";
  svg.appendChild(path);
}

/* ===== Radial Progress ===== */
function updateRadialProgress(currentStep, totalSteps) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  const circle = document.querySelector("#radial-progress .circle");
  const label = $("progress-percent");
  if (circle) circle.style.setProperty("--p", percent / 100);
  if (label) label.textContent = `${percent}%`;
}

/* ===== Confetti ===== */
function confetti() {
  const n = 80;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.className = "confetti";
    s.style.left = `${Math.random() * 100}vw`;
    s.style.background = `hsl(${Math.random() * 360}, 90%, 60%)`;
    s.style.animationDuration = `${1.5 + Math.random()}s`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2100);
  }
}

/* ===== Particle Background ===== */
const c = document.getElementById("bg"), ctx = c.getContext("2d");
function resizeCanvas() { c.width = innerWidth; c.height = innerHeight; }
addEventListener("resize", resizeCanvas); resizeCanvas();
const P = [...Array(120)].map(() => ({ x: Math.random() * c.width, y: Math.random() * c.height, v: 0.3 + Math.random() * 1.2 }));
let boost = 0;
function particleTick() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "rgba(204,0,0,0.9)";
  P.forEach(p => {
    p.y += p.v + boost;
    if (p.y > c.height) p.y = -5;
    ctx.fillRect(p.x, p.y, 2, 8);
  });
  boost *= 0.92;
  requestAnimationFrame(particleTick);
}
particleTick();
function throughputPulse() { boost = 3; setTimeout(() => boost = 0, 400); }

/* ===== Flow ===== */
let current = 0;

function init() {
  createPins();
  setQuestion(current);
  updateRadialProgress(0, questions.length);

  $("submit-answer").addEventListener("click", () => {
    const userAnswer = $("answer-input").value;
    if (!userAnswer) return alert("Type an answer first.");
    const item = questions[current];
    if (isCorrect(userAnswer, item.accept)) {
      throughputPulse();
      if (item.locationKey) activatePin(item.locationKey);
      if (current > 0) drawArc(questions[current - 1].locationKey, item.locationKey);

      $("map-container").classList.add("flip-out");
      setTimeout(() => {
        $("map-container").style.display = "none";
        $("question-box").style.display = "none";
        $("experience-title").innerText = item.title;
        $("experience-description").innerHTML = `<span class="tag">${item.badge}</span><ul class="bullets">${item.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`;
        $("experience-card").classList.remove("hidden");
        $("experience-card").classList.add("card-in");
      }, 600);

      updateRadialProgress(current + 1, questions.length);
    } else {
      alert("Close! Try including a keyword like Kubernetes, Kafka, lineage, etc.");
    }
  });

  $("next-question").addEventListener("click", () => {
    current++;
    if (current < questions.length) {
      $("experience-card").classList.add("hidden");
      $("map-container").style.display = "block";
      $("question-box").style.display = "block";
      $("map-container").classList.remove("flip-out");
      $("experience-card").classList.remove("card-in");
      setQuestion(current);
      updateRadialProgress(current, questions.length);
    } else {
      // Final thank-you screen with fade-in
      $("experience-card").classList.remove("hidden");
      $("experience-card").style.opacity = 0;
      $("experience-title").innerText = "All Sections Unlocked";
      $("experience-description").innerHTML = `
        <span class="tag">Summary</span>
        <p>You have now explored my complete journey — covering experience, education, tools, and technical skills. 
           I hope this interactive format gave you a clear and engaging picture of my professional profile.</p>
        <div class="cta">
          <a class="btn" href="assets/SJY-Resume.pdf" download="Sai_Jagan_Yalamanchili_Resume.pdf">Download Resume</a>
        </div>
        <hr style="margin: 20px 0; opacity: 0.5;">
        <p style="font-size: 1rem; text-align: center; color: #ccc;">
          Thank you for taking the time to go through my portfolio.<br>
          Hope this time continues to pass between us <strong>productively</strong> in the future!
        </p>
      `;
      $("question-box").style.display = "none";
      $("map-container").style.display = "none";
      confetti();
      setTimeout(() => {
        $("experience-card").style.transition = "opacity 1.2s ease-in-out";
        $("experience-card").style.opacity = 1;
      }, 100);
    }
  });
}

window.addEventListener("load", init);
