/* ============================================================
   Fiona Paul — The Gallery at Night
   Spotlight · horizontal pan · flow field · comparison · reveals
   ============================================================ */

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 760px)").matches;

/* ------------------------------------------------------------
   Scroll reveals (IntersectionObserver, staggered per batch)
   ------------------------------------------------------------ */
{
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    let i = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.style.setProperty("--d", `${Math.min(i * 70, 350)}ms`);
      e.target.classList.add("is-in");
      io.unobserve(e.target);
      i++;
    }
  }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
  els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------
   HERO — pointer parallax. Layers sit at different depths and
   lean toward the cursor; uses the `translate` property so it
   composes with each layer's own transform animations.
   Desktop fine-pointers only.
   ------------------------------------------------------------ */
{
  const hero = document.querySelector(".hero");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (hero && finePointer && !reduceMotion && !isMobile) {
    const layers = [
      { el: document.querySelector(".hero__portrait"), depth: 14 },
      { el: document.querySelector(".hero__copy"), depth: -7 },
      { el: document.querySelector(".hero__strokes"), depth: 22 },
      { el: document.querySelector(".butterfly--a"), depth: 30 },
      { el: document.querySelector(".butterfly--d"), depth: 26 },
    ].filter((l) => l.el);

    let tx = 0, ty = 0;       // target (pointer)
    let cx = 0, cy = 0;       // current (eased)
    let rafId = null;

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      for (const { el, depth } of layers) {
        el.style.translate = `${cx * depth}px ${cy * depth}px`;
      }
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001) {
        rafId = requestAnimationFrame(tick);
      } else { rafId = null; }
    };

    hero.addEventListener("pointermove", (ev) => {
      const r = hero.getBoundingClientRect();
      tx = (ev.clientX - r.left) / r.width - 0.5;
      ty = (ev.clientY - r.top) / r.height - 0.5;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    hero.addEventListener("pointerleave", () => {
      tx = 0; ty = 0;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  }
}

/* ------------------------------------------------------------
   THE LIGHT — spotlight follows the pointer.
   Without a pointer (touch / reduced motion) the beam slowly
   pans on its own so the section still breathes.
   ------------------------------------------------------------ */
{
  const stage = document.getElementById("lightStage");
  const shade = document.getElementById("lightShade");
  if (stage && shade) {
    let auto = true;
    let t = 0;
    let rafId = null;
    let visible = false;

    const setBeam = (xPct, yPct) => {
      shade.style.setProperty("--mx", `${xPct}%`);
      shade.style.setProperty("--my", `${yPct}%`);
      stage.style.setProperty("--mx", `${xPct}%`);
      stage.style.setProperty("--my", `${yPct}%`);
    };

    const autoPan = () => {
      if (!auto || !visible) return;
      t += 0.004;
      setBeam(50 + 34 * Math.sin(t), 40 + 22 * Math.sin(t * 1.7 + 1));
      rafId = requestAnimationFrame(autoPan);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && auto && !rafId) rafId = requestAnimationFrame(autoPan);
      if (!visible && rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }, { threshold: 0.2 });
    io.observe(stage);

    stage.addEventListener("pointermove", (ev) => {
      if (ev.pointerType === "touch") return;
      auto = false;
      stage.classList.add("is-touched");
      const r = stage.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      setBeam(px * 100, py * 100);
      // the frame leans away from the light, like a canvas on a wall
      if (!reduceMotion && !isMobile) {
        stage.style.transform = `rotateY(${(px - 0.5) * 3.5}deg) rotateX(${(0.5 - py) * 2.5}deg)`;
      }
    });

    // touch: a tap places the lantern there, then it wanders again
    stage.addEventListener("pointerdown", (ev) => {
      if (ev.pointerType !== "touch") return;
      auto = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      stage.classList.add("is-touched");
      const r = stage.getBoundingClientRect();
      setBeam(((ev.clientX - r.left) / r.width) * 100, ((ev.clientY - r.top) / r.height) * 100);
      setTimeout(() => {
        auto = true;
        if (visible && !rafId) rafId = requestAnimationFrame(autoPan);
      }, 2600);
    });

    // wording matches the input you actually have
    const hint = document.getElementById("lightHint");
    if (hint && window.matchMedia("(pointer: coarse)").matches) {
      hint.textContent = "tap to move your light";
    }

    stage.addEventListener("pointerleave", () => {
      auto = true;
      stage.style.transform = "";
      if (visible && !rafId) rafId = requestAnimationFrame(autoPan);
    });
  }
}

/* ------------------------------------------------------------
   THE WORKS — pinned horizontal pan.
   The section gets a tall runway; the sticky inner pins while
   the track slides. Skipped entirely on mobile (CSS scroll-snap
   takes over) and under reduced motion.
   ------------------------------------------------------------ */
{
  const section = document.querySelector(".works");
  const track = document.getElementById("worksTrack");
  const bar = document.getElementById("worksProgress");

  // hand each piece its resting tilt
  document.querySelectorAll(".piece").forEach((p) => {
    p.style.setProperty("--tilt", p.dataset.tilt || 0);
  });

  if (section && track && !isMobile && !reduceMotion) {
    let distance = 0;
    let runway = 0;
    let ticking = false;

    const measure = () => {
      distance = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.08);
      runway = distance + window.innerHeight;
      section.style.height = `${runway}px`;
    };

    const update = () => {
      ticking = false;
      const r = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -r.top / (runway - window.innerHeight)));
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      if (bar) bar.style.width = `${progress * 100}%`;
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); update(); });

    // re-measure once images arrive (widths change)
    track.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", () => { measure(); update(); }, { once: true });
    });
  }

  // mobile: the bar tracks the swipe instead of the page scroll
  if (section && track && bar && isMobile) {
    let ticking = false;
    track.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = track.scrollWidth - track.clientWidth;
        bar.style.width = `${max > 0 ? (track.scrollLeft / max) * 100 : 0}%`;
      });
    }, { passive: true });
  }
}

/* ------------------------------------------------------------
   SOUND — Van Gogh flow field. Particles ride a curl-ish field
   and leave short pastel strokes in her palette. Pauses when
   offscreen; static wash under reduced motion.
   ------------------------------------------------------------ */
{
  const canvas = document.getElementById("flowField");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d", { alpha: true });
    const PALETTE = [
      "oklch(0.55 0.13 262)", // cobalt
      "oklch(0.78 0.14 75)",  // amber
      "oklch(0.6 0.15 40)",   // terracotta
      "oklch(0.9 0.02 85)",   // gel white
      "oklch(0.55 0.1 150)",  // green
    ];
    let w = 0, h = 0, dpr = 1;
    let particles = [];
    let rafId = null;
    let visible = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgba(0,0,0,0)";
      const count = Math.min(220, Math.floor((w * h) / 9000));
      particles = Array.from({ length: count }, () => spawn());
    };

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      life: 60 + Math.random() * 120,
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
      width: 0.8 + Math.random() * 1.8,
      speed: 0.5 + Math.random() * 1.1,
    });

    // swirling field: layered sines approximating Starry Night eddies
    const angleAt = (x, y, t) => {
      const s = 0.0042;
      return (
        Math.sin(x * s + t * 0.25) * 1.6 +
        Math.cos(y * s * 1.3 - t * 0.2) * 1.6 +
        Math.sin((x + y) * s * 0.5 + t * 0.12) * 2.2
      );
    };

    let t = 0;
    const step = () => {
      if (!visible) { rafId = null; return; }
      t += 0.016;
      // fade trails slowly — strokes linger like pastel
      ctx.fillStyle = "rgba(10, 8, 6, 0.045)";
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = "round";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const a = angleAt(p.x, p.y, t);
        const nx = p.x + Math.cos(a) * p.speed * 2.2;
        const ny = p.y + Math.sin(a) * p.speed * 2.2;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx; p.y = ny;
        p.life -= 1;
        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          particles[i] = spawn();
        }
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !rafId) rafId = requestAnimationFrame(step);
    }, { threshold: 0.08 });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
  }
}

/* ------------------------------------------------------------
   UNDERPAINTING — comparison driven by a real range input
   (keyboard + screen-reader friendly), pointer drag mapped in.
   ------------------------------------------------------------ */
{
  const stage = document.getElementById("compare");
  const range = document.getElementById("compareRange");
  if (stage && range) {
    const apply = (v) => {
      stage.style.setProperty("--cut", `${v}%`);
      const clip = document.getElementById("compareClip");
      const handle = document.getElementById("compareHandle");
      if (clip) clip.style.setProperty("--cut", `${v}%`);
      if (handle) handle.style.left = `${v}%`;
    };

    apply(range.value);
    range.addEventListener("input", () => apply(range.value));

    // map raw pointer drags to the range for a direct feel
    let dragging = false;
    const fromEvent = (ev) => {
      const r = stage.getBoundingClientRect();
      const v = Math.min(100, Math.max(0, ((ev.clientX - r.left) / r.width) * 100));
      range.value = v;
      apply(v);
    };
    stage.addEventListener("pointerdown", (ev) => {
      dragging = true;
      stage.setPointerCapture(ev.pointerId);
      fromEvent(ev);
    });
    stage.addEventListener("pointermove", (ev) => { if (dragging) fromEvent(ev); });
    stage.addEventListener("pointerup", () => { dragging = false; });
    stage.addEventListener("pointercancel", () => { dragging = false; });
  }
}

/* ------------------------------------------------------------
   STUDIO — rotations from data attributes; the process video
   only plays while on screen.
   ------------------------------------------------------------ */
{
  document.querySelectorAll(".polaroid").forEach((p) => {
    p.style.setProperty("--rot", p.dataset.rot || 0);
  });

  const video = document.querySelector(".polaroid video");
  if (video) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { video.play().catch(() => {}); }
      else { video.pause(); }
    }, { threshold: 0.3 });
    io.observe(video);
  }
}
