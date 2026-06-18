/* =====================================================================
   Arjun Arun — portfolio
   Vanilla JS, zero dependencies.
   Handles: theme toggle, mobile nav, scroll reveals, project cards,
   accessible modal + image lightbox.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     PROJECT DATA
     Image order matches the demo brief. Alt text is written per
     screen so the gallery is meaningful to screen readers.
  --------------------------------------------------------------- */
  var IMG = "assets/images/";
  var PROJECTS = [
    {
      id: "triallens",
      title: "TrialLens",
      year: "2026",
      descriptor: "LLM-powered clinical trial recruitment, founded at Oxford.",
      tags: ["Healthcare AI", "Conversational AI", "Founder"],
      problem: "Clinical trials routinely fail to recruit enough patients on time, which wastes millions for research organisations and pharma. Much of the friction is paperwork written for regulators rather than for the patients who have to read it.",
      built: "A patient-facing conversational AI that explains a trial in plain language and answers questions in real time, a document simplification layer that turns dense clinical and consent material into something a non-specialist can read, and a guided e-consent flow from first interest to informed sign-off. It was validated with Oxford clinicians and researchers whose input shaped what it needed to get right to be trusted clinically.",
      shots: [
        { src: "triallens-1.png", alt: "TrialLens admin view showing the CardioBridge Phase III study details, sponsor, therapeutic area and project lead." },
        { src: "triallens-2.png", alt: "TrialLens patient welcome page with a plain-language study explainer video and an information summary." },
        { src: "triallens-3.png", alt: "TrialLens study assistant chat answering patient questions, above a comprehension quiz that gates consent." }
      ]
    },
    {
      id: "alpharound",
      title: "UK Retail Investing App",
      year: "2026",
      descriptor: "Crowdfunded access to early-stage startup investing.",
      tags: ["Fintech", "AI Analytics", "Crowdfunding"],
      problem: "Everyday people are locked out of early-stage startup investing. Deal flow is inaccessible, minimums are too high and the evaluation tools a professional fund relies on simply do not exist for them.",
      built: "A crowdfunding app where investors pool money to participate with smaller amounts. Due diligence and company evaluation happen inside the app, backed by AI-native analytics that surface the kind of insight a professional fund would normally pay for.",
      shots: [
        { src: "alpharound-1.png", alt: "AlphaRound landing page headlined next-generation equity for the global crowd, with live exit and funding stats." },
        { src: "alpharound-2.png", alt: "AlphaRound live deal page showing campaign progress, share price, tax relief and an invest now panel." },
        { src: "alpharound-3.png", alt: "AlphaRound investor portfolio dashboard showing total value, unrealised gain and tax relief claimed." }
      ]
    },
    {
      id: "udaan",
      title: "Udaan",
      year: "2026",
      descriptor: "AI business coach for women entrepreneurs in India.",
      tags: ["AI Coach", "Voice", "Social Impact"],
      problem: "Millions of Indian women have skills like cooking, tailoring, tutoring and crafts but lack the mentor who turns a skill into a business. India has fewer than one female entrepreneur for every ten male entrepreneurs.",
      built: "A coach that speaks to a woman in her own language by voice or text, asks a few warm follow-up questions, then generates pricing that counts her own labour, a ready-to-send WhatsApp message to find her first customers, matched government schemes she can apply for and a twelve-month income projection. Judgment-free by design. It is fully built and runs end to end. Built and shown at the AI for Good Hackathon at Oxford in June 2026, it is now ready to pilot through self-help group federations and bank partnerships.",
      shots: [
        { src: "udaan-1.png", alt: "Udaan dashboard greeting the user by name with quick actions for coaching, money tracking, goals and savings." },
        { src: "udaan-2.png", alt: "Udaan coach conversation in which a user describes her cooking skill and the coach asks warm follow-up questions." },
        { src: "udaan-3.png", alt: "Udaan business kit suggesting an office tiffin service and festival order ideas with monthly income ranges." },
        { src: "udaan-4.png", alt: "Udaan finance screen tracking income, expense and net profit with a voice option to add entries." }
      ]
    },
    {
      id: "dinner",
      title: "Oxford Dinner Exchange",
      year: "2026",
      descriptor: "A portal for Oxford formal dinner swaps, now in the official myOxford app.",
      tags: ["Marketplace", "Community", "Adopted by Oxford"],
      problem: "Oxford dinner exchanges are a core part of student networking, but they were organised over messy WhatsApp group chats where availability got buried and follow-ups were lost.",
      built: "A portal that handles the whole flow. Students sign up, get matched and see their schedule in one place. After it was built and showcased, Oxford University integrated it into the official myOxford app.",
      shots: [
        { src: "dinner-1.png", alt: "Oxford Dinner Exchange home page explaining how to post, browse and connect over formal dinners." },
        { src: "dinner-2.png", alt: "Oxford Dinner Exchange form to post a formal dinner with title, description, date, time and available spots." },
        { src: "dinner-3.png", alt: "Oxford Dinner Exchange form to request a dinner at a chosen college, date and maximum price." }
      ]
    },
    {
      id: "creatorops",
      title: "CreatorOps",
      year: "2026",
      descriptor: "Commercial infrastructure for independent creators, on iOS.",
      tags: ["iOS", "Creator Economy", "Workflow"],
      problem: "Most Instagram and TikTok creators cannot justify a manager but still have to chase brand deals, negotiate rates, brief scripts, invoice and track payments alone.",
      built: "An iOS app that tracks brand deals and deadlines, helps write scripts tied to live campaign briefs, assists negotiations, handles invoicing and payment tracking, and gives a live pipeline dashboard of what is active, outstanding and earned. It gives independent creators the commercial infrastructure that only top-tier talent can normally afford.",
      portrait: true,
      shots: [
        { src: "creatorops-1.png", alt: "CreatorOps iOS dashboard showing active deals, total earned and a deal that needs attention." },
        { src: "creatorops-2.png", alt: "CreatorOps navigation menu listing deals tracker, pricing system, scripts library, invoices and renewals." }
      ]
    },
    {
      id: "interview",
      title: "MBA Interview Prep App",
      year: "2026",
      descriptor: "AI practice for product management and consulting interviews.",
      tags: ["AI Coach", "EdTech", "Interview Prep"],
      problem: "MBA classmates preparing for product management and consulting interviews lacked a structured way to practise and get honest feedback between mock sessions.",
      built: "An AI practice tool that generates structured prompts and gives feedback on responses, drawing on common product management and consulting frameworks. It ingests the target role and company, then runs realistic mock interviews and produces interview-day references.",
      shots: [
        { src: "interview-1.png", alt: "InterviewEdge document ingestion hub for uploading a job description, CV and cover letters to power preparation." },
        { src: "interview-2.png", alt: "InterviewEdge mock interview screen with an AI interviewer conducting a behavioural interview." },
        { src: "interview-3.png", alt: "InterviewEdge interview-day cheat sheet listing top stories, company facts, talking points and questions to ask." }
      ]
    }
  ];

  /* ---------------------------------------------------------------
     Helpers
  --------------------------------------------------------------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     Render project cards
  --------------------------------------------------------------- */
  var cardsWrap = document.getElementById("cards");
  PROJECTS.forEach(function (p) {
    var card = el("button", "card reveal");
    card.type = "button";
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "Open details for " + p.title);
    card.dataset.id = p.id;

    var tagsHtml = p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");
    card.innerHTML =
      '<div class="card__media">' +
        '<img src="' + IMG + p.shots[0].src + '" alt="' + p.shots[0].alt + '" loading="lazy" decoding="async" />' +
      '</div>' +
      '<div class="card__body">' +
        '<div class="card__top">' +
          '<h3 class="card__title">' + p.title + '</h3>' +
          '<span class="card__year">' + p.year + '</span>' +
        '</div>' +
        '<p class="card__desc">' + p.descriptor + '</p>' +
        '<div class="card__tags">' + tagsHtml + '</div>' +
        '<span class="card__more">View case' +
          ' <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</span>' +
      '</div>';

    card.addEventListener("click", function () { openModal(p, card); });
    cardsWrap.appendChild(card);
  });

  /* ---------------------------------------------------------------
     Theme toggle (in-memory only, no storage).
     Respects prefers-color-scheme on first load.
  --------------------------------------------------------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    var isDark = mode === "dark";
    themeBtn.setAttribute("aria-pressed", String(isDark));
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#15130f" : "#f7f4ef");
  }
  applyTheme(prefersDark.matches ? "dark" : "light");

  themeBtn.addEventListener("click", function () {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---------------------------------------------------------------
     Sticky nav border on scroll
  --------------------------------------------------------------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------------------------------------------------------
     Mobile menu
  --------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  function setMenu(open) {
    mobileMenu.hidden = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  navToggle.addEventListener("click", function () { setMenu(mobileMenu.hidden); });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });

  /* ---------------------------------------------------------------
     Scroll reveal via IntersectionObserver
  --------------------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  function showAll() { reveals.forEach(function (r) { r.classList.add("is-in"); }); }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    reveals.forEach(function (r) { io.observe(r); });
    // Fail-open safety net: never let content stay hidden if the observer
    // misses an element (e.g. anchor jumps, very tall viewports).
    window.addEventListener("load", function () {
      setTimeout(showAll, 1200);
    });
  }

  /* ---------------------------------------------------------------
     Accessible modal
  --------------------------------------------------------------- */
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modal-content");
  var lastFocused = null;
  var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openModal(p, trigger) {
    lastFocused = trigger || document.activeElement;
    var galleryClass = p.portrait ? "gallery is-portrait" : "gallery";
    var shotsHtml = p.shots.map(function (s, i) {
      return '<button class="gallery__item" type="button" data-shot="' + i + '" aria-label="Open screenshot: ' + s.alt + '">' +
        '<img src="' + IMG + s.src + '" alt="' + s.alt + '" loading="lazy" decoding="async" />' +
      '</button>';
    }).join("");
    var tagsHtml = p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("");

    modalContent.innerHTML =
      '<p class="modal__eyebrow">Project</p>' +
      '<h2 class="modal__title" id="modal-title">' + p.title + '</h2>' +
      '<p class="modal__descriptor">' + p.descriptor + '</p>' +
      '<div class="modal__tags">' + tagsHtml + '</div>' +
      '<div class="modal__block"><h3>The problem</h3><p>' + p.problem + '</p></div>' +
      '<div class="modal__block"><h3>What I built</h3><p>' + p.built + '</p></div>' +
      '<div class="' + galleryClass + '">' + shotsHtml + '</div>';

    // Wire gallery -> lightbox
    currentShots = p.shots;
    modalContent.querySelectorAll(".gallery__item").forEach(function (b) {
      b.addEventListener("click", function () { openLightbox(parseInt(b.dataset.shot, 10)); });
    });

    modal.hidden = false;
    document.body.classList.add("is-locked");
    var closeBtn = modal.querySelector(".modal__close");
    closeBtn.focus();
    modal.querySelector(".modal__panel").scrollTop = 0;
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("is-locked");
    if (lastFocused) lastFocused.focus();
  }

  modal.querySelectorAll("[data-close]").forEach(function (b) {
    b.addEventListener("click", closeModal);
  });

  /* ---------------------------------------------------------------
     Lightbox gallery
  --------------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-cap");
  var currentShots = [];
  var lbIndex = 0;

  function showShot(i) {
    var n = currentShots.length;
    lbIndex = (i + n) % n;
    var s = currentShots[lbIndex];
    lbImg.src = IMG + s.src;
    lbImg.alt = s.alt;
    lbCap.textContent = s.alt;
  }
  function openLightbox(i) {
    showShot(i);
    lightbox.hidden = false;
    document.body.classList.add("is-locked");
    lightbox.querySelector("[data-lb-close]").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    if (!modal.hidden) document.body.classList.add("is-locked");
    else document.body.classList.remove("is-locked");
  }

  lightbox.querySelector("[data-lb-close]").addEventListener("click", closeLightbox);
  lightbox.querySelector("[data-lb-prev]").addEventListener("click", function () { showShot(lbIndex - 1); });
  lightbox.querySelector("[data-lb-next]").addEventListener("click", function () { showShot(lbIndex + 1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------------------------------------------------------------
     Keyboard handling + focus trap
  --------------------------------------------------------------- */
  document.addEventListener("keydown", function (e) {
    if (!lightbox.hidden) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showShot(lbIndex - 1);
      else if (e.key === "ArrowRight") showShot(lbIndex + 1);
      return;
    }
    if (!modal.hidden) {
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "Tab") trapFocus(e, modal.querySelector(".modal__panel"));
    }
  });

  function trapFocus(e, container) {
    var nodes = Array.prototype.filter.call(
      container.querySelectorAll(FOCUSABLE),
      function (n) { return n.offsetParent !== null; }
    );
    if (!nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------------------------------------------------------
     Footer year
  --------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
