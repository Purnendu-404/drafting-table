document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.className = 'fa-solid fa-bars text-lg';
    } else {
      menuIcon.className = 'fa-solid fa-xmark text-lg';
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.className = 'fa-solid fa-bars text-lg';
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('shadow-xl', 'bg-dark-900/95');
    } else {
      navbar.classList.remove('shadow-xl');
    }
  });

  // Sound / FX Toggle (Simulated audio click or glitch effect)
  let soundEnabled = true;
  const themeToggle = document.getElementById('themeToggle');
  const soundIcon = document.getElementById('soundIcon');

  themeToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.className = 'fa-solid fa-volume-high text-sm text-emerald-400';
      showToast('Sound / Terminal FX enabled');
    } else {
      soundIcon.className = 'fa-solid fa-volume-xmark text-sm text-gray-500';
      showToast('Sound / Terminal FX muted');
    }
  });

  function playKeyClick() {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch(e) {
      // AudioContext restricted before user interaction
    }
  }

  // Toast notification helper
  function showToast(message) {
    const existingToast = document.getElementById('devToast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'devToast';
    toast.className = 'fixed bottom-5 right-5 z-50 bg-dark-800 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-3 animate-bounce';
    toast.innerHTML = `<i class="fa-solid fa-terminal"></i><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playKeyClick();
      filterBtns.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-dark-900', 'font-bold');
        b.classList.add('bg-dark-800', 'text-gray-300');
      });
      btn.classList.remove('bg-dark-800', 'text-gray-300');
      btn.classList.add('bg-emerald-500', 'text-dark-900', 'font-bold');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Interactive Terminal Logic
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const terminalSubmit = document.getElementById('terminalSubmit');
  const terminalClearBtn = document.getElementById('terminalClearBtn');

  const terminalCommands = {
    help: `Available commands:
  • <span class="text-emerald-400">about</span>      - Learn more about Alex Mercer
  • <span class="text-emerald-400">skills</span>     - List core technical proficiencies
  • <span class="text-emerald-400">projects</span>   - View top featured repositories
  • <span class="text-emerald-400">experience</span> - Show career timeline & roles
  • <span class="text-emerald-400">contact</span>    - Get direct email & social links
  • <span class="text-emerald-400">sudo</span>       - Execute administrator privileges
  • <span class="text-emerald-400">clear</span>      - Clear terminal window`,
    
    about: `Alex Mercer is a Senior Full-Stack Architect with 8+ years of expertise in high-throughput distributed backends, cloud orchestration, and responsive web applications. Based in San Francisco, CA.`,
    
    skills: `Core Stack:
  [Frontend] TypeScript, React, Next.js, Tailwind CSS, WebGL
  [Backend]  Node.js, Express, Python (FastAPI/Django), Rust, GraphQL, gRPC
  [DevOps]   Docker, Kubernetes, AWS, PostgreSQL, Redis, CI/CD`,

    projects: `Featured Projects:
  1. DevFlow Cloud (Next.js, Node.js, WebSockets) - CI/CD Telemetry SaaS
  2. RustCache CLI (Rust, WASM) - High-performance static asset caching utility
  3. NeuralDocs AI (Python, React, OpenAI) - Autonomous documentation generator`,

    experience: `Career Highlights:
  • 2021-Present: Principal Architect at Nexus Systems (SF)
  • 2018-2021: Senior Full-Stack Engineer at Vortex Tech (Remote)
  • 2016-2018: Software Engineer at Apex Digital Labs (NY)`,

    contact: `Direct Contact:
  • Email: alex.mercer.dev@example.com
  • GitHub: github.com/alexmercer
  • LinkedIn: linkedin.com/in/alexmercer`,

    sudo: `<span class="text-red-400">ACCESS DENIED:</span> User 'visitor' is not in the sudoers file. This incident will be reported to the cyber police.`
  };

  function appendToTerminal(htmlContent, isCommand = false) {
    const div = document.createElement('div');
    if (isCommand) {
      div.innerHTML = `<span class="text-emerald-400">visitor@portfolio %</span> <span class="text-white">${htmlContent}</span>`;
    } else {
      div.innerHTML = htmlContent;
      div.className = 'text-gray-300 pl-4 border-l-2 border-emerald-500/40 my-2';
    }
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleCommand() {
    const cmd = terminalInput.value.trim().toLowerCase();
    if (!cmd) return;

    playKeyClick();
    appendToTerminal(cmd, true);
    terminalInput.value = '';

    if (cmd === 'clear') {
      terminalOutput.innerHTML = `
        <div class="text-emerald-400 font-bold">Terminal session reset.</div>
        <div class="text-gray-400 text-xs">Type <span class="text-cyan-400">help</span> to view available commands.</div>
        <div class="pt-2"></div>
      `;
      return;
    }

    if (terminalCommands[cmd]) {
      setTimeout(() => {
        appendToTerminal(terminalCommands[cmd]);
      }, 150);
    } else {
      setTimeout(() => {
        appendToTerminal(`<span class="text-red-400">zsh: command not found: ${cmd}</span>. Type <span class="text-cyan-400">help</span> for available commands.`);
      }, 150);
    }
  }

  terminalSubmit.addEventListener('click', handleCommand);
  terminalInput.addEventListener('keydown', (e) => {
    playKeyClick();
    if (e.key === 'Enter') {
      handleCommand();
    }
  });

  terminalClearBtn.addEventListener('click', () => {
    playKeyClick();
    terminalOutput.innerHTML = `
      <div class="text-emerald-400 font-bold">Terminal session reset.</div>
      <div class="text-gray-400 text-xs">Type <span class="text-cyan-400">help</span> to view available commands.</div>
      <div class="pt-2"></div>
    `;
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playKeyClick();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>Encrypting & Dispatching...</span>`;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      formStatus.classList.remove('hidden');
      contactForm.reset();
      showToast('Dispatch sent successfully!');

      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 6000);
    }, 1500);
  });
});
