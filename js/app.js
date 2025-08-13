/* =========================================================================
   Tesla AI | Multimodal Training & Data Infrastructure — Portfolio Flow
   Features:
   - Q&A unlocks ALL sections (Experience, Education, Skills)
   - World map fade+zoom on correct answer, sliding reveal card
   - Pin overlay: lights up location relevant to each section
   - Progress label (Step X of Y)
   ========================================================================= */

/* ---------- World map locations (percent coords for equirectangular map) --- */
const locations = {
  USA_MI:   { x: 30, y: 35, label: "Michigan, USA" },
  ITALY_MI: { x: 52, y: 40, label: "Milan, Italy" },
  PORTUGAL: { x: 46, y: 42, label: "Braga, Portugal" },
  INDIA_AP: { x: 62, y: 50, label: "India" }
};

/* ---------- Questions & unlock content (edit freely) ----------------------- */
const questions = [
  // 1 — Reforma (ETL + data ingestion)
  {
    question: "Q1: At fleet scale, what core pattern would you use to ingest petabytes/day reliably (think queues, shards, backpressure)?",
    accept: ["kafka", "pubsub", "kinesis", "queue", "shard", "backpressure", "distributed"],
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

  // 2 — Cloudscale (orchestration / security)
  {
    question: "Q2: To drive training jobs across thousands of GPUs, which orchestration layer would you reach for (and why)?",
    accept: ["kubernetes", "k8s", "ray", "slurm", "orchestration", "operator"],
    title: "Cloudscale Technologies — Cybersecurity Project Management Intern",
    badge: "Experience",
    bullets: [
      "Managed test automation with Postman; integrated security features in pipelines.",
      "Led device security (wrapping, jailbreak testing), encryption rollouts, vulnerability assessments.",
      "Verified platforms (Microsoft Dynamics, Infoblox) and tracked work in Jira."
    ],
    locationKey: "USA_MI"
  },

  // 3 — CMU Student Assistant (data ops @ scale)
  {
    question: "Q3: For high-volume transactional systems (e.g., admissions), name 1–2 best practices to ensure data integrity & traceability.",
    accept: ["lineage", "versioning", "audit", "idempotent", "schema", "cdc", "change data capture", "pipelines"],
    title: "Central Michigan University — Student Assistant",
    badge: "Experience",
    bullets: [
      "Ran end-to-end admissions ops using SAP for tracking and reporting.",
      "Designed targeted email campaigns; improved engagement & application rates.",
      "Maintained accurate student data & reports; ensured integrity and timeliness."
    ],
    locationKey: "USA_MI"
  },

  // 4 — CMU Graduate Assistant (research & analytics)
  {
    question: "Q4: If you had geospatial + socioeconomic data, which stack would you use to analyze and visualize climate patterns?",
    accept: ["python", "r", "qgis", "power bi", "tableau", "pandas", "geo"],
    title: "Central Michigan University — Graduate Assistant (Entrepreneurship Dept.)",
    badge: "Experience",
    bullets: [
      "Analyzed climate justice data using R/Python/Excel; built insights & visualizations.",
      "Used QGIS for geospatial analysis; Power BI for dashboards.",
      "Co-authored research outputs; turned data into actionable recommendations."
    ],
    locationKey: "USA_MI"
  },

  // 5 — Yalamanchili Fuels (ops / inventory / compliance)
  {
    question: "Q5: In operations with safety constraints (gas station), what KPIs & controls would you monitor continuously?",
    accept: ["kpi", "uptime", "sla", "inventory", "compliance", "safety", "loss prevention", "cost"],
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

  // 6 — Pegaso (planning / BI)
  {
    question: "Q6: Which tools would you use to plan multi-team project timelines and report status to leadership?",
    accept: ["primavera", "p6", "jira", "power bi", "tableau", "sql", "excel"],
    title: "Pegaso Ingenieria (Italy) — Project Planner & Controller",
    badge: "Experience",
    bullets: [
      "Coordinated cross‑functional teams with Primavera P6 for milestone delivery.",
      "Streamlined analytics with Power BI & Tableau; created budget insights via SQL/Excel.",
      "Developed Project Execution Plans and reviewed subcontract scopes."
    ],
    locationKey: "ITALY_MI"
  },

  // 7 — SEW Infrastructure (civil eng / CAD)
  {
    question: "Q7: In a physical project (e.g., dam spillway), which digital tools and data would you integrate for execution readiness?",
    accept: ["autocad", "estimation", "procurement", "analytics", "tableau", "excel"],
    title: "SEW Infrastructure Ltd. — Junior Civil Engineer",
    badge: "Experience",
    bullets: [
      "Executed slope concreting at Indira Sagar Dam spillway using AutoCAD and on‑site controls.",
      "Handled estimation, budgeting, procurement; coordinated multidisciplinary deliverables.",
      "Used analytics (Excel/Tableau) for cost forecasting & procurement decisions."
    ],
    locationKey: "INDIA_AP"
  },

  // 8 — Education
  {
    question: "Q8: Name a core analytics or leadership concept from grad school you’d apply to training infrastructure at Tesla.",
    accept: ["analytics", "leadership", "strategic", "project", "data", "optimization", "kpi", "okr"],
    title: "Education",
    badge: "Education",
    bullets: [
      "MBA (Business Data Analytics), Central Michigan University — GPA 3.57/4.0",
      "MSc (Built Environment), Politecnico di Milano — GPA 3.65/4.0",
      "BSc (Civil Engineering), RVR&JC College of Engineering"
    ],
    locationKey: "ITALY_MI"
  },

  // 9 — Tools / Skills (final unlock)
  {
    question: "Q9: List 3+ tools you’d combine to train a multimodal model on petabyte‑scale video logs.",
    accept: ["python", "sql", "ray", "kubernetes", "k8s", "pytorch", "dataloader", "kafka", "spark", "airflow", "delta", "parquet"],
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

/* ---------- Helpers -------------------------------------------------------- */
function $(id) { return document.getElementById(id); }

function setQuestion(i) {
  const q = questions[i];
  $("question-text").innerText = q.question;
  $("answer-input").value = "";
  // progress label
  let p = $("progress");
  if (!p) {
    p = document.createElement("div");
    p.id = "progress";
    p.className = "progress";
    $("question-box").prepend(p);
  }
  p.innerText = `Step ${i + 1} of ${questions.length}`;
}

function isCorrect(userText, acceptedKeywords) {
  const a = userText.toLowerCase().trim();
  return acceptedKeywords.some(k => a.includes(k));
}

/* ---------- Pins ----------------------------------------------------------- */
function createPins() {
  const layer = $("pin-layer");
  if (!layer) return;
  layer.innerHTML = "";
  Object.entries(locations).forEach(([key, loc]) => {
    const el = document.createElement("div");
    el.className = "pin";
    el.style.left = `${loc.x}%`;
    el.style.top  = `${loc.y}%`;
    el.dataset.key = key;
    el.setAttribute("data-label", loc.label || "");
    layer.appendChild(el);
  });
}

function activatePin(key) {
  const pin = document.querySelector(`.pin[data-key="${key}"]`);
  if (pin) pin.classList.add("active");
}
function updateRadialProgress(currentStep, totalSteps) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  const circle = document.querySelector("#radial-progress .circle");
  const label = document.getElementById("progress-percent");
  if (circle) circle.style.setProperty("--p", percent / 100);
  if (label) label.textContent = `${percent}%`;
}


/* ---------- Flow ----------------------------------------------------------- */
let current = 0;

function init() {
  // Ensure base UI exists
  if (!$("map-container") || !$("question-box") || !$("experience-card")) return;

  // Set first question and build pins
  setQuestion(current);
  createPins();
  updateRadialProgress(0, questions.length);


  // Submit handler
  $("submit-answer").addEventListener("click", () => {
    const userAnswer = $("answer-input").value;
    if (!userAnswer) return alert("Type an answer first.");

    const item = questions[current];
    if (isCorrect(userAnswer, item.accept)) {
      // Light up the relevant location pin
      if (item.locationKey) activatePin(item.locationKey);
      updateRadialProgress(current, questions.length);


      // Animate map out
      const map = $("map-container");
      map.classList.add("fade-zoom-out");

      setTimeout(() => {
        // Hide map & question box
        map.style.display = "none";
        $("question-box").style.display = "none";

        // Populate experience card
        $("experience-title").innerText = item.title;

        const tag = `<span class="tag">${item.badge}</span>`;
        const list = (item.bullets || []).map(b => `<li>${b}</li>`).join("");

        const maybeResume = item.final
          ? `<div class="cta">
               <a class="btn" href="assets/SJY-Resume.pdf" target="_blank" rel="noopener">Download Resume</a>
             </div>`
          : "";

        $("experience-description").innerHTML = `
          ${tag}
          <ul class="bullets">${list}</ul>
          ${maybeResume}
        `;

        // Show card
        $("experience-card").classList.remove("hidden");
      }, 900);
    } else {
      alert("Close! Try including a keyword like Kubernetes, Kafka, lineage, etc.");
    }
  });

  // Next handler
  $("next-question").addEventListener("click", () => {
    current++;
    if (current < questions.length) {
      $("experience-card").classList.add("hidden");
      updateRadialProgress(current, questions.length);


      const map = $("map-container");
      map.style.display = "block";
      $("question-box").style.display = "block";
      map.classList.remove("fade-zoom-out");
      map.style.opacity = "1";
      map.style.transform = "scale(1)";

      setQuestion(current);
    } else {
      // Finish: reuse the card as a summary
      $("experience-title").innerText = "All Sections Unlocked";
      $("experience-description").innerHTML = `
        <span class="tag">Summary</span>
        <p>Your full experience, education, and tools are unlocked above. Thanks for exploring!</p>
        <div class="cta">
          <a class="btn" href="assets/SJY-Resume.pdf" target="_blank" rel="noopener">Download Resume</a>
        </div>
      `;
      $("experience-card").classList.remove("hidden");
      // Optionally hide question UI
      $("question-box").style.display = "none";
      $("map-container").style.display = "none";
    }
  });
}

window.addEventListener("load", init);
