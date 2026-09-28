// Aura Kinetic Scroll & Interactive Showcase Engine

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('scrollProgressBar');
  const velocityEl = document.getElementById('velocityVal');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const parallaxCards = document.querySelectorAll('.parallax-card');

  // Pinned split-screen elements
  const storyBlocks = document.querySelectorAll('.scroll-story-block');
  const stepItems = document.querySelectorAll('.step-item');
  const pinnedTitle = document.getElementById('pinnedTitle');
  const pinnedDesc = document.getElementById('pinnedDesc');

  const stepMeta = {
    1: {
      title: 'Precision Engineering',
      desc: 'Building software at the intersection of extreme speed, mathematical rigor, and aesthetic excellence.'
    },
    2: {
      title: 'Priority Concurrency',
      desc: 'Asynchronous workers, queue scheduling, and backoff mitigation preventing service degradation under load.'
    },
    3: {
      title: 'Native Hardware Velocity',
      desc: 'Direct ADB streaming and GPU composite layers delivering sustained 60-120fps hardware throughput.'
    }
  };

  // 1. Kinetic Scroll Velocity & Progress
  let lastScrollY = window.scrollY;
  let lastScrollTime = performance.now();
  let currentVelocity = 0;
  let velocityDecayTimer = null;

  function updateScrollMetrics() {
    const now = performance.now();
    const currentY = window.scrollY;
    const deltaY = Math.abs(currentY - lastScrollY);
    const deltaTime = Math.max(1, now - lastScrollTime);

    // Compute px/s
    const instantVelocity = Math.round((deltaY / deltaTime) * 1000);
    currentVelocity = Math.round(currentVelocity * 0.7 + instantVelocity * 0.3);

    if (velocityEl) {
      velocityEl.textContent = currentVelocity;
    }

    // Update Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPct = totalHeight > 0 ? (currentY / totalHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
    }

    // Parallax depth shift on cards
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      parallaxCards.forEach((card) => {
        const speed = parseFloat(card.getAttribute('data-speed')) || 0.2;
        const rect = card.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
        card.style.transform = `translate3d(0, ${Math.round(offset)}px, 0)`;
      });
    }

    lastScrollY = currentY;
    lastScrollTime = now;

    // Decay velocity to 0 when stopped
    clearTimeout(velocityDecayTimer);
    velocityDecayTimer = setTimeout(() => {
      currentVelocity = 0;
      if (velocityEl) velocityEl.textContent = '0';
    }, 150);
  }

  window.addEventListener('scroll', updateScrollMetrics, { passive: true });

  // 2. IntersectionObserver for Pinned Story Section
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = entry.target.getAttribute('data-step-id');
          if (stepMeta[stepId]) {
            pinnedTitle.textContent = stepMeta[stepId].title;
            pinnedDesc.textContent = stepMeta[stepId].desc;
          }

          stepItems.forEach((item) => {
            if (item.getAttribute('data-step') === stepId) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  storyBlocks.forEach((block) => storyObserver.observe(block));

  // 3. Interactive CLI Terminal
  const termInput = document.getElementById('termInput');
  const termOutput = document.getElementById('termOutput');
  const quickCmds = document.querySelectorAll('.cmd-btn');

  const commands = {
    help: () => `Available Commands:
  • <span class="highlight">skills</span>    : View full-stack & AI technical capabilities
  • <span class="highlight">projects</span>  : Inspect flagship open-source repositories
  • <span class="highlight">contact</span>   : Get verified developer communication channels
  • <span class="highlight">clear</span>     : Wipe console buffer`,

    skills: () => `Technical Matrix:
  • Languages: TypeScript, JavaScript, Python, PowerShell, SQL
  • Frontend: React 18, Next.js, Vite, Kinetic Motion & Parallax
  • Backend: Node.js, Express, Microservices, RAG Vector Search
  • Infra & Cloud: Docker, Redis, PostgreSQL, Git, GitHub Actions CI`,

    projects: () => `Flagship Showcases:
  1. <span class="highlight">AeroLink Pro</span> : Universal 100 MB/s Android ⟷ PC ADB Data Suite
  2. <span class="highlight">NeuroDoc AI</span>  : Retrieval-Augmented Generation Vector Engine
  3. <span class="highlight">DevPulse</span>     : Real-time Distributed Microservice Telemetry
  4. <span class="highlight">TaskStream</span>   : High-Throughput Priority Async Job Queue`,

    contact: () => `Direct Inquiries:
  • Email: <a href="mailto:shaharyar.dev@gmail.com" class="highlight">shaharyar.dev@gmail.com</a>
  • GitHub: <a href="https://github.com/Shahar-Yar095" target="_blank" class="highlight">github.com/Shahar-Yar095</a>`,

    clear: () => {
      termOutput.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      commands.clear();
      return;
    }

    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="prompt-sym">➜</span> <span class="text-muted">${cmd}</span>`;
    termOutput.appendChild(line);

    const resLine = document.createElement('div');
    resLine.className = 'term-line';
    if (commands[cmd]) {
      resLine.innerHTML = commands[cmd]().replace(/\n/g, '<br/>');
    } else {
      resLine.innerHTML = `<span style="color: #ef4444">zsh: command not found: ${cmd}. Type 'help' for commands.</span>`;
    }
    termOutput.appendChild(resLine);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(termInput.value);
        termInput.value = '';
      }
    });
  }

  quickCmds.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  // 4. Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
