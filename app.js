/**
 * NAYANA.DEV - Interactive Technology Editorial
 * "From Code Writer to AI Agent Manager: What Junior Developers Need to Learn in 2026"
 * Modern, accessible vanilla JavaScript for interactive narrative features.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initReadingProgressAndScroll();
  initTableOfContents();
  initMobileDrawer();
  initHeroPipeline();
  initTicketComparator();
  initModeComparator();
  initAgentManagerExplorer();
  initPipelineStack();
  initSpecComparator();
  initRiskModel();
  initSpotTheProblem();
  initLearningLoop();
  initDeveloperStack();
  initRealityCheckTabs();
  initSourcesSearch();
  initAboutModal();
  initBackToTop();
});

/* ==========================================================================
   0. Theme Management (Light / Dark / System)
   ========================================================================== */
function initThemeSystem() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const storedTheme = localStorage.getItem('nayana-editorial-theme') || 'system';

  function applyTheme(theme) {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    themeButtons.forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme-val');
      const isActive = btnTheme === theme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    localStorage.setItem('nayana-editorial-theme', theme);
  }

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-theme-val');
      applyTheme(targetTheme);
    });
  });

  applyTheme(storedTheme);
}

/* ==========================================================================
   1. Reading Progress Bar & Header Shrink
   ========================================================================== */
function initReadingProgressAndScroll() {
  const progressBar = document.getElementById('reading-progress-bar');
  const header = document.querySelector('.site-header');
  const articleStream = document.querySelector('.article-stream');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header compaction
    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Article reading progress calculation
    if (progressBar && articleStream) {
      const articleRect = articleStream.getBoundingClientRect();
      const articleTop = articleRect.top + scrollY;
      const articleHeight = articleStream.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalDistance = articleHeight - windowHeight + 100;
      const currentProgress = scrollY - articleTop;

      if (currentProgress <= 0) {
        progressBar.style.width = '0%';
      } else if (currentProgress >= totalDistance) {
        progressBar.style.width = '100%';
      } else {
        const percent = Math.min(100, Math.max(0, (currentProgress / totalDistance) * 100));
        progressBar.style.width = `${percent}%`;
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Floating Table of Contents & ScrollSpy
   ========================================================================== */
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('section[id], h2[id]');

  if (!sections.length || !tocLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${targetId}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // Smooth scroll handler
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          // If in mobile drawer, close drawer
          const drawer = document.getElementById('mobile-drawer');
          if (drawer && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
          }
        }
      }
    });
  });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', drawer.classList.contains('open') ? 'true' : 'false');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }
}

/* ==========================================================================
   4. Hero Interactive Engineering Pipeline
   HUMAN -> SPECIFY -> AI AGENT -> CODE -> TEST -> REVIEW -> HUMAN
   ========================================================================== */
function initHeroPipeline() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const detailTitle = document.getElementById('pipeline-detail-title');
  const detailDesc = document.getElementById('pipeline-detail-desc');
  const detailCard = document.getElementById('pipeline-detail-card');
  const playToggleBtn = document.getElementById('pipeline-autoplay-toggle');

  if (!nodes.length) return;

  const nodeInfo = [
    {
      role: 'Human',
      title: 'Human Engineer: Business Context & Intent',
      desc: 'Grounds the requirement in customer needs, safety parameters, regulatory bounds, and domain invariants. Decides what problems are worth solving.',
      isHuman: true
    },
    {
      role: 'Human',
      title: 'Specify: Defining "Done" & Behavioral Boundaries',
      desc: 'Crafts rigorous requirements, failure cases, schema limits, rate limits, and non-negotiables. Prevents the agent from silently guessing business rules.',
      isHuman: true
    },
    {
      role: 'Agent',
      title: 'AI Agent: Autonomous Exploration & Planning',
      desc: 'Explores codebase references, parses dependency graphs, and designs an execution plan within the sandbox permissions granted.',
      isHuman: false
    },
    {
      role: 'Agent',
      title: 'Code: Generating Implementation & Test Harnesses',
      desc: 'Implements endpoints, writes unit fixtures, handles boilerplate, and drafts commit changes according to the specification.',
      isHuman: false
    },
    {
      role: 'Agent',
      title: 'Test: Automated Iteration in the Sandbox',
      desc: 'Executes linters, runs regression suites, inspects error outputs, and iterates on syntax or compilation failures without interrupting the human.',
      isHuman: false
    },
    {
      role: 'Human',
      title: 'Human Review: Verification & Engineering Judgment',
      desc: 'Checks authorization boundaries, architectural coherence, query scaling, edge cases, and verifies what automated tests cannot catch.',
      isHuman: true
    },
    {
      role: 'Human',
      title: 'Human Accountability: Production Ownership',
      desc: 'Ships the feature and retains ultimate operational responsibility. The human owns the 2 a.m. pager alert and customer trust.',
      isHuman: true
    }
  ];

  let currentIndex = 0;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let userManuallyPaused = prefersReduced;
  let isAutoPlaying = !prefersReduced;
  let autoTimer = null;
  let isHeroVisible = true;

  function activateNode(index, userInteracted = false) {
    if (userInteracted) {
      pauseAutoPlay(true);
    }
    currentIndex = index;
    nodes.forEach((node, i) => {
      const active = i === index;
      node.classList.toggle('active', active);
      node.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    const info = nodeInfo[index] || nodeInfo[0];
    if (detailTitle) detailTitle.textContent = info.title;
    if (detailDesc) detailDesc.textContent = info.desc;
    if (detailCard) {
      detailCard.classList.toggle('human-detail', info.isHuman);
    }
  }

  function nextNode() {
    currentIndex = (currentIndex + 1) % nodes.length;
    activateNode(currentIndex, false);
  }

  function startAutoPlay() {
    if (userManuallyPaused) return;
    isAutoPlaying = true;
    if (playToggleBtn) playToggleBtn.textContent = 'Pause Flow';
    clearInterval(autoTimer);
    autoTimer = setInterval(nextNode, 3800);
  }

  function pauseAutoPlay(manual = false) {
    if (manual) {
      userManuallyPaused = true;
    }
    isAutoPlaying = false;
    if (playToggleBtn) playToggleBtn.textContent = 'Resume Flow';
    clearInterval(autoTimer);
  }

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => activateNode(idx, true));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateNode(idx, true);
      }
    });
  });

  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', () => {
      if (isAutoPlaying) {
        pauseAutoPlay(true);
      } else {
        userManuallyPaused = false;
        startAutoPlay();
      }
    });
  }

  // Optimize performance: pause autoplay when hero is off-screen
  const heroContainer = document.querySelector('.hero-pipeline-container');
  if ('IntersectionObserver' in window && heroContainer) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isHeroVisible = entry.isIntersecting;
        if (!isHeroVisible) {
          clearInterval(autoTimer);
        } else if (!userManuallyPaused && isAutoPlaying) {
          startAutoPlay();
        }
      });
    }, { threshold: 0.1 });
    heroObserver.observe(heroContainer);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(autoTimer);
    } else if (isHeroVisible && !userManuallyPaused && isAutoPlaying) {
      startAutoPlay();
    }
  });

  // Start with node 0 active
  activateNode(0);
  if (!prefersReduced) {
    startAutoPlay();
  } else if (playToggleBtn) {
    playToggleBtn.textContent = 'Resume Flow';
  }
}

/* ==========================================================================
   5. Section 01 Ticket Comparator: Before vs Now
   ========================================================================== */
function initTicketComparator() {
  const tabs = document.querySelectorAll('.cmp-tab-btn');
  const humanPane = document.getElementById('pane-before');
  const agentPane = document.getElementById('pane-now');

  if (!tabs.length || !humanPane || !agentPane) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-cmp-mode');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (mode === 'both') {
        humanPane.style.display = 'block';
        agentPane.style.display = 'block';
      } else if (mode === 'before') {
        humanPane.style.display = 'block';
        agentPane.style.display = 'none';
      } else if (mode === 'now') {
        humanPane.style.display = 'none';
        agentPane.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   6. Section 08 Autocomplete vs Agent Comparator
   ========================================================================== */
function initModeComparator() {
  const toggleButtons = document.querySelectorAll('.mode-toggle-btn');
  const modeTrack = document.getElementById('mode-diagram-track');
  const modeDesc = document.getElementById('mode-diagram-desc');

  if (!toggleButtons.length || !modeTrack || !modeDesc) return;

  const modes = {
    autocomplete: {
      trackHTML: `
        <span class="diagram-pill h-pill">Human</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill">Write Code</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill a-pill">AI Suggests</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill h-pill">Human Continues</span>
      `,
      desc: '<strong>Autocomplete was a passenger.</strong> The human drives every step of the editor loop. The AI predicts the next tokens in-line, but does not execute tests, inspect files, or synthesize architectural decisions outside of your direct keystrokes.'
    },
    agent: {
      trackHTML: `
        <span class="diagram-pill h-pill">Human</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill h-pill">Goal Spec</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill a-pill">Agent Explores</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill a-pill">Agent Codes</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill a-pill">Agent Tests & Iterates</span>
        <span class="diagram-arrow">→</span>
        <span class="diagram-pill h-pill">Human Reviews</span>
      `,
      desc: '<strong>An AI Agent is closer to a contractor.</strong> An autonomous loop takes a goal, generates a multi-step plan, traverses the repository, runs commands, analyzes output, and attempts corrections. The human is not present for every keystroke, only for the intent and final review.'
    }
  };

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modeKey = btn.getAttribute('data-mode');
      toggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = modes[modeKey] || modes.autocomplete;
      modeTrack.innerHTML = data.trackHTML;
      modeDesc.innerHTML = data.desc;
    });
  });
}

/* ==========================================================================
   7. Section 09 AI Agent Manager: 7 Responsibilities Sequence
   ========================================================================== */
function initAgentManagerExplorer() {
  const respButtons = document.querySelectorAll('.resp-btn');
  const titleEl = document.getElementById('resp-title');
  const textEl = document.getElementById('resp-text');

  if (!respButtons.length || !titleEl || !textEl) return;

  const respData = {
    '01': {
      title: '01. Define: Establish the Goal & What "Done" Means',
      text: 'Define the objective with crisp acceptance criteria. If you leave the definition of success ambiguous, the agent will silently invent its own definition of done.'
    },
    '02': {
      title: '02. Context: Curate Knowledge & Repository Boundaries',
      text: 'Supply the relevant files, domain models, and established patterns. Agents know nothing about your business logic or historical incidents unless you intentionally provide that context.'
    },
    '03': {
      title: '03. Constrain: Enforce Read/Write & Execution Guardrails',
      text: 'Explicitly specify what the agent may read, write, and run. Forbid unauthorized package additions, restrict destructive database commands, and keep secrets isolated.'
    },
    '04': {
      title: '04. Delegate: Chunk Problems into Verifiable Units',
      text: 'Break complex workflows into discreet, verifiable tasks rather than one monolithic prompt. A focused agent run is far more reliable and easily auditable.'
    },
    '05': {
      title: '05. Test: Execute Verification Suites & Sandbox Edge Cases',
      text: 'Run automated checks, linters, and adversarial scenarios. Ensure tests check what the feature was actually designed to accomplish, not just what the agent happened to write.'
    },
    '06': {
      title: '06. Review: Scrutinize Hidden Assumptions & Edge Cases',
      text: 'Judge what automated tests cannot catch: authorization leaks, N+1 query bottlenecks, concurrency issues, and unwarranted architectural bloat.'
    },
    '07': {
      title: '07. Own: Take Full Responsibility for Production Outcomes',
      text: 'The developer retains absolute accountability for what ships. When production breaks, the developer answers to the customer and the team—not the model.'
    }
  };

  respButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-resp');
      respButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const d = respData[step];
      if (d) {
        titleEl.textContent = d.title;
        textEl.textContent = d.text;
      }
    });
  });
}

/* ==========================================================================
   8. Section 10 Human vs Agent Pipeline Explorer
   ========================================================================== */
function initPipelineStack() {
  const rows = document.querySelectorAll('.stage-row');

  rows.forEach(row => {
    const btn = row.querySelector('.stage-header-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isExpanded = row.classList.contains('expanded');
      // Collapse others for clean accordion experience or allow multi-expand
      rows.forEach(r => r.classList.remove('expanded'));
      if (!isExpanded) {
        row.classList.add('expanded');
      }
    });
  });
}

/* ==========================================================================
   9. Section 12 Specification: Interactive Reveal
   ========================================================================== */
function initSpecComparator() {
  const revealBtn = document.getElementById('spec-reveal-btn');
  const richDetails = document.getElementById('spec-rich-details');

  if (!revealBtn || !richDetails) return;

  revealBtn.addEventListener('click', () => {
    const isHidden = richDetails.style.display === 'none' || !richDetails.classList.contains('revealed');
    if (isHidden) {
      richDetails.style.display = 'block';
      richDetails.classList.add('revealed');
      revealBtn.innerHTML = `Hide Detailed Specification &uarr;`;
      revealBtn.style.background = 'var(--line-strong)';
    } else {
      richDetails.style.display = 'none';
      richDetails.classList.remove('revealed');
      revealBtn.innerHTML = `Show what happens when you specify it properly &rarr;`;
      revealBtn.style.background = 'var(--agent)';
    }
  });
}

/* ==========================================================================
   10. Section 13 Security: Interactive Risk Model
   Agent Capability x Agent Access = Potential Risk
   ========================================================================== */
function initRiskModel() {
  const capButtons = document.querySelectorAll('[data-risk-cap]');
  const accButtons = document.querySelectorAll('[data-risk-acc]');
  const gaugeBox = document.getElementById('risk-result-gauge');
  const scoreEl = document.getElementById('risk-gauge-score');
  const descEl = document.getElementById('risk-gauge-desc');

  if (!gaugeBox || !scoreEl || !descEl) return;

  let capability = 'low';
  let access = 'low';

  function updateRiskCalculation() {
    let riskLevel = 'low';
    let label = 'LOW RISK';
    let explanation = '';

    if (capability === 'low' && access === 'low') {
      riskLevel = 'low';
      label = 'MINIMAL SYSTEMIC RISK';
      explanation = 'Agent runs in an isolated read-only sandbox with constrained capability. Confined errors cause minor local noise but zero production breach surface.';
    } else if (capability === 'high' && access === 'low') {
      riskLevel = 'medium';
      label = 'CONTROLLED RISK (RECOMMENDED DEFAULT)';
      explanation = 'High autonomy model working within strict read-only or staged boundaries. Can draft complex architectures without having the credentials to deploy or delete live assets.';
    } else if (capability === 'low' && access === 'high') {
      riskLevel = 'medium';
      label = 'UNPREDICTABLE RISK';
      explanation = 'Lower-tier capability paired with direct write permissions or production keys. High probability of unintended schema corruptions or unvetted configuration writes.';
    } else {
      riskLevel = 'high';
      label = 'CRITICAL POTENTIAL RISK';
      explanation = 'Maximum autonomous capability paired with wide execution access, credentials, and live pipelines. A single hallucination or prompt injection can escalate to an organizational outage.';
    }

    gaugeBox.className = `risk-result-gauge ${riskLevel}`;
    scoreEl.textContent = label;
    descEl.textContent = explanation;
  }

  capButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      capButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      capability = btn.getAttribute('data-risk-cap');
      updateRiskCalculation();
    });
  });

  accButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      accButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      access = btn.getAttribute('data-risk-acc');
      updateRiskCalculation();
    });
  });

  updateRiskCalculation();
}

/* ==========================================================================
   11. Section 14 Code Review: "Spot the Problem" Inspector
   ========================================================================== */
function initSpotTheProblem() {
  const spotButtons = document.querySelectorAll('.spot-btn');
  const titleEl = document.getElementById('spot-problem-title');
  const descEl = document.getElementById('spot-problem-desc');

  if (!spotButtons.length || !titleEl || !descEl) return;

  const problemDatabase = {
    'auth': {
      title: '1. Authorization Bugs (Customer Boundary Leaks)',
      desc: 'Does the query filter strictly by the authenticated session customer, or does it accept an arbitrary organization ID supplied in the HTTP request params? An agent will happily write code that queries without verifying ownership.'
    },
    'nplus1': {
      title: '2. SQL Inside Loops (N+1 Query Explosions)',
      desc: 'Issuing a separate database lookup inside a loop for each invoice row looks completely clean on a local seed database of 50 rows. At 5 million production rows, it exhausts the connection pool and halts the service.'
    },
    'tx': {
      title: '3. Missing Database Transactions',
      desc: 'Export records logged alongside status updates without a transaction wrapper. If the network blips mid-export, your database enters an inconsistent, half-committed state.'
    },
    'edge': {
      title: '4. Unhandled Edge Cases & Data Malformation',
      desc: 'Empty customer export queues, commas and quotes embedded within customer address fields breaking CSV parsers, timezone offsets, and non-UTF8 strings silently causing truncation.'
    },
    'concurrency': {
      title: '5. Concurrency Race Conditions',
      desc: 'What happens when two users trigger simultaneous exports, or an invoice status updates in real-time mid-stream? Without optimistic locking or stream coordination, data is corrupted.'
    },
    'deps': {
      title: '6. Unnecessary Dependency Bloat',
      desc: 'Importing a 15-megabyte multi-dependency external NPM module to accomplish basic CSV formatting that the standard library handles in 12 lines of code.'
    },
    'debt': {
      title: '7. Redundant Technical Debt',
      desc: 'Agents frequently reinvent custom date formatters or token validators rather than discovering existing internal team utilities already present in the codebase.'
    },
    'mirror': {
      title: '8. Tests That Mirror the Code’s Blind Spots',
      desc: 'If the agent misunderstands the authorization invariant when writing the code, the tests it generates will embody the exact same misunderstanding. Tests pass, but the bug remains undetected.'
    }
  };

  spotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const bugKey = btn.getAttribute('data-problem');
      spotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const item = problemDatabase[bugKey];
      if (item) {
        titleEl.textContent = item.title;
        descEl.textContent = item.desc;
      }
    });
  });
}

/* ==========================================================================
   12. Section 17 Junior Developer Paradox: Learning Loop
   ========================================================================== */
function initLearningLoop() {
  const loopButtons = document.querySelectorAll('.loop-step-btn');
  const titleEl = document.getElementById('loop-step-title');
  const textEl = document.getElementById('loop-step-text');

  if (!loopButtons.length || !titleEl || !textEl) return;

  const loopData = {
    'understand': {
      title: 'Step 1: Understand',
      text: 'Understand the problem and sketch your own expected solution architecture first before launching prompts. If you do not know what the shape of the solution should be, you cannot evaluate the agent’s response.'
    },
    'ask': {
      title: 'Step 2: Ask with Rigor',
      text: 'Prompt with rich context, repository conventions, and strict boundary constraints. Specify failure modes and definitions of done.'
    },
    'inspect': {
      title: 'Step 3: Inspect Line by Line',
      text: 'Inspect the generated diff line by line. Any line of code you cannot articulate or explain in a code review is a gap in your own engineering foundation.'
    },
    'test': {
      title: 'Step 4: Test with Adversarial Cases',
      text: 'Write and execute your own custom edge-case scenarios (malformed inputs, boundary conditions, zero states) rather than solely relying on tests generated by the model.'
    },
    'debug': {
      title: 'Step 5: Debug Failures First',
      text: 'Investigate stack traces and failures yourself before blindly re-pasting error logs into the chat window. Debugging is where intuitive comprehension of runtime systems is forged.'
    },
    'improve': {
      title: 'Step 6: Improve & Prune',
      text: 'Simplify the generated output. Strip out superfluous dependencies, simplify convoluted loops, and harmonize style with existing team patterns.'
    },
    'explain': {
      title: 'Step 7: Explain in the PR',
      text: 'Write the pull request summary in your own words, justifying why the chosen architectural trade-offs were made. If you cannot explain it, you do not own it yet.'
    }
  };

  loopButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepKey = btn.getAttribute('data-loop');
      loopButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = loopData[stepKey];
      if (data) {
        titleEl.textContent = data.title;
        textEl.textContent = data.text;
      }
    });
  });
}

/* ==========================================================================
   13. Section 19 Developer Stack: Layered Accordion
   ========================================================================== */
function initDeveloperStack() {
  const layers = document.querySelectorAll('.stack-layer');

  layers.forEach(layer => {
    const btn = layer.querySelector('.layer-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = layer.classList.contains('active');
      layers.forEach(l => l.classList.remove('active'));
      if (!isActive) {
        layer.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   14. Section 20 Reality Check 3-Tab Navigator
   ========================================================================== */
function initRealityCheckTabs() {
  const tabButtons = document.querySelectorAll('.reality-tab-btn');
  const panelEl = document.getElementById('reality-panel-body');

  if (!tabButtons.length || !panelEl) return;

  const tabContents = {
    'know': `
      <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--ink); margin-bottom: 8px;">Measured & Grounded Data</h4>
      <p style="margin-bottom: 12px;">AI tooling adoption is undeniably widespread, but autonomous agents are currently monitored and bounded.</p>
      <ul style="padding-left: 20px; margin-bottom: 12px; line-height: 1.6;">
        <li><strong>Stack Overflow 2025:</strong> 84% using or planning to use AI tools, but daily usage is 50.6% among pro developers. Only 31% actively used coding agents.</li>
        <li><strong>Anthropic 2026 Trends:</strong> Developers utilize AI assistance in approximately 60% of their workflows, but can fully delegate only 0% to 20% of engineering work autonomously.</li>
        <li><strong>Supervision Reality:</strong> Spring 2026 surveys reveal agent adoption doubled, yet nearly all runs remain single-agent with active human leash monitoring.</li>
      </ul>
    `,
    'expect': `
      <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--ink); margin-bottom: 8px;">Industry Predictions & Structural Shifts</h4>
      <p style="margin-bottom: 12px;">Consultancies and leadership anticipate workflow reconfiguration from hands-on typing to systems orchestration.</p>
      <ul style="padding-left: 20px; margin-bottom: 12px; line-height: 1.6;">
        <li><strong>McKinsey Analysis:</strong> Top performing engineering organizations observe 16% to 30% speedups when redesigning roles so humans orchestrate agents. Deciding "what to build" remains strictly human.</li>
        <li><strong>Bain Technology Report 2025:</strong> 10% to 15% baseline productivity gains seen in pilots, with 25% to 30% achievable only when whole engineering development lifecycles are restructured.</li>
        <li><strong>Role Shift:</strong> Engineers transition from syntax implementers to architects, conductors, and verification managers.</li>
      </ul>
    `,
    'uncertain': `
      <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--ink); margin-bottom: 8px;">Open Questions & Empirical Ambiguities</h4>
      <p style="margin-bottom: 12px;">The trajectory of developer career formation is not settled science; early metrics reveal nuanced trade-offs.</p>
      <ul style="padding-left: 20px; margin-bottom: 12px; line-height: 1.6;">
        <li><strong>METR Trial (July 2025):</strong> 16 experienced developers actually took 19% longer to complete real-world open-source tasks when using early-2025 AI tools.</li>
        <li><strong>Junior Hiring Contraction:</strong> Stanford / ADP data shows a ~20% decline for younger software developers, yet macroeconomic conditions and post-2024 hiring adjustments confound singular AI attribution.</li>
        <li><strong>Skill Formation:</strong> Anthropic’s randomized trial found AI assistance groups scored 17% lower on coding mastery, with major deficiencies in debugging—proving that tool habits dictate whether skill builds or erodes.</li>
      </ul>
    `
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-reality');
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panelEl.innerHTML = tabContents[tabKey] || tabContents.know;
    });
  });
}

/* ==========================================================================
   15. Section 22 Interactive Sources Search
   ========================================================================== */
function initSourcesSearch() {
  const searchInput = document.getElementById('sources-search-input');
  const sourceCards = document.querySelectorAll('.source-card');

  if (!searchInput || !sourceCards.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    sourceCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   16. About Modal
   ========================================================================== */
function initAboutModal() {
  const modalOverlay = document.getElementById('about-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="about"]');
  const closeButton = document.getElementById('modal-close-btn');

  if (!modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeButton) closeButton.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   17. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }, { passive: true });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
