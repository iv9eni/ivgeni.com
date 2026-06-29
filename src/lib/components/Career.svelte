<script lang="ts">
  import { spring } from 'svelte/motion';
  import { onMount } from 'svelte';
  import { roles, accentArc } from './roles';

  const progress = spring(0, { stiffness: 0.08, damping: 0.9 });
  let reduceMotion = false;
  let canvasEl: HTMLCanvasElement;

  function onScroll() {
    const max = document.body.scrollHeight - window.innerHeight;
    progress.set(max > 0 ? window.scrollY / max : 0);
  }

  function fmt(v: number, suffix: string) {
    let s: string;
    if (v >= 1_000_000) s = (v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1) + 'M';
    else if (v >= 1_000) s = Math.round(v / 1_000) + 'K';
    else s = Math.round(v).toString();
    return s + suffix;
  }

  function runCount(el: HTMLElement) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const goal = +el.dataset.count!;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = fmt(goal, suffix); return; }
    const dur = 1400, start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(goal * eased, suffix);
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = fmt(goal, suffix);
    };
    requestAnimationFrame(step);
  }

  onMount(async () => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal panels + count-ups
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('active');
          (e.target as HTMLElement).querySelectorAll<HTMLElement>('[data-count]').forEach(runCount);
        }
      },
      { threshold: 0.55 }
    );
    document.querySelectorAll('.panel').forEach((el) => io.observe(el));

    // --- Three.js setup (dynamic import keeps it out of initial bundle) ---
    let THREE: typeof import('three');
    try {
      THREE = await import('three');
    } catch {
      return;
    }

    let renderer: import('three').WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07080b);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    // Icosahedron
    const geo = new THREE.IcosahedronGeometry(1.5, 1);
    const pointsMat = new THREE.PointsMaterial({ size: 0.055, sizeAttenuation: true, transparent: true, opacity: 0.95 });
    const wireMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.45 });
    const group = new THREE.Group();
    group.add(new THREE.Points(geo, pointsMat));
    group.add(new THREE.LineSegments(new THREE.WireframeGeometry(geo), wireMat));
    scene.add(group);

    // Ambient particle field
    const FIELD = 700;
    const pos = new Float32Array(FIELD * 3);
    for (let i = 0; i < FIELD; i++) {
      const r = 7 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const field = new THREE.Points(fieldGeo, new THREE.PointsMaterial({ size: 0.04, color: 0x4a5160, transparent: true, opacity: 0.5 }));
    scene.add(field);

    // Color arc
    const stops = accentArc.map((c) => new THREE.Color(c));
    function colorAt(p: number) {
      const seg = Math.min(stops.length - 2, Math.floor(p * (stops.length - 1)));
      const local = p * (stops.length - 1) - seg;
      return stops[seg].clone().lerp(stops[seg + 1], local);
    }

    // Track spring value in animation loop
    let p = 0;
    const unsub = progress.subscribe((v) => { p = v; });

    // Resize handler
    function resize() {
      const w = canvasEl.clientWidth;
      const h = canvasEl.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    let animId: number;
    let t = 0;
    let lastTime = performance.now();

    function animate(now: number) {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      t += delta;

      camera.position.z = 6 - p * 2.4;

      if (!reduceMotion) {
        group.rotation.y += delta * (0.1 + p * 0.4);
        group.rotation.x = Math.sin(t * 0.2) * 0.18;
        field.rotation.y -= delta * 0.025;
      } else {
        group.rotation.y = p * Math.PI * 2;
      }

      const breathe = reduceMotion ? 0 : Math.sin(t * 1.4) * 0.025;
      group.scale.setScalar(1 + p * 0.35 + breathe);

      const c = colorAt(p);
      pointsMat.color.copy(c);
      wireMat.color.copy(c);
      wireMat.opacity = 0.3 + p * 0.35;

      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      unsub();
      io.disconnect();
      renderer!.dispose();
    };
  });
</script>

<!-- sticky 3D stage -->
<div class="fixed inset-0 z-0">
  <canvas bind:this={canvasEl} style="display:block;width:100%;height:100%" />
</div>
<div class="pointer-events-none fixed inset-0 z-10"
     style="background: radial-gradient(120% 90% at 50% 50%, transparent 35%, rgba(7,8,11,0.55) 100%)"></div>

<main class="relative z-20 font-[Space_Grotesk,sans-serif] text-[#eef1f5]">
  <!-- HERO -->
  <section class="panel flex items-center justify-center text-center">
    <div>
      <h1 class="reveal text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em]">Ivgeni<br />Darinski</h1>
      <div class="reveal mt-6 font-mono text-base uppercase tracking-[0.22em] text-[#8b94a3]">Full-stack engineer</div>
    </div>
  </section>

  {#each roles as r, i}
    <section class="panel flex items-center px-[7vw] py-[8vh] {i % 2 === 1 ? 'justify-end text-right' : 'justify-start'}">
      <div class="max-w-[560px]">
        <div class="reveal mb-6 flex items-center gap-4 font-mono text-sm uppercase tracking-[0.18em] text-[#8b94a3] {i % 2 === 1 ? 'justify-end' : ''}">
          <span style="color: {r.accent}">{r.idx}</span>
          <span class="h-px w-10 bg-white/15"></span>
          <span>{r.dates}</span>
        </div>
        <h2 class="reveal mb-5 text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.02em]">{r.company}</h2>
        <p class="reveal max-w-[30ch] text-[clamp(1.2rem,2.2vw,1.55rem)] leading-snug text-[#cdd3dc] {i % 2 === 1 ? 'ml-auto' : ''}">{r.desc}</p>
        <div class="reveal mt-9 flex flex-col gap-2 font-mono {i % 2 === 1 ? 'items-end' : ''}">
          {#if r.count}
            <span class="text-[clamp(1.8rem,4vw,2.8rem)] font-medium" style="color: {r.accent}"
                  data-count={r.count} data-suffix={r.countSuffix}>0</span>
          {:else}
            <span class="text-[clamp(1.3rem,3vw,2rem)] font-medium" style="color: {r.accent}">{r.statText}</span>
          {/if}
          <span class="text-[0.9rem] uppercase tracking-[0.05em] text-[#8b94a3]">{r.statLabel}</span>
        </div>
        {#if r.tags}
          <div class="reveal mt-6 font-mono text-sm tracking-[0.04em] text-[#8b94a3]">{r.tags}</div>
        {/if}
      </div>
    </section>
  {/each}

  <!-- PROJECT -->
  <section class="panel flex items-center justify-center px-[7vw] py-[8vh]">
    <div class="w-full max-w-[900px]">
      <div class="reveal mb-6 flex items-center gap-4 font-mono text-sm uppercase tracking-[0.18em] text-[#8b94a3]">
        <span style="color: #9b8afb">04</span>
        <span class="h-px w-10 bg-white/15"></span>
        <span>Featured Project</span>
      </div>
      <h2 class="reveal mb-5 text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.02em]">PaperPredict</h2>
      <p class="reveal mb-10 max-w-[45ch] text-[clamp(1.2rem,2.2vw,1.55rem)] leading-snug text-[#cdd3dc]">
        Paper trading platform for stocks and options. Built local-first so every interaction feels instant. Real market data, no real money.
      </p>
      <div class="reveal mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5" id="video-wrap">
        <video src="/paperpredict-demo.mov" autoplay muted loop playsinline class="w-full" style="display:block"
          on:error={() => { const w = document.getElementById('video-wrap'); if (w) w.style.display = 'none'; }} />
      </div>
      <div class="reveal flex flex-col gap-4">
        <a class="link self-start" href="https://paperpredict.ivgeni.com" target="_blank" rel="noopener">visit site ↗</a>
        <div class="flex flex-wrap gap-2 font-mono text-sm text-[#8b94a3]">
          {#each ['Next.js', 'Ruby', 'Fly.io', 'Vercel', 'Claude Design', 'local-first'] as tag}
            <span class="rounded-full border border-white/10 px-3 py-1">{tag}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="panel flex items-center justify-center text-center">
    <div>
      <h2 class="reveal mb-10 text-[clamp(2.4rem,7vw,5rem)] font-semibold tracking-[-0.02em]">Reach me here.</h2>
      <div class="reveal flex flex-wrap justify-center gap-5 font-mono text-base">
        <a class="link" href="mailto:ivgeni.darinski@outlook.com">email</a>
        <a class="link" href="https://linkedin.com/in/ivgenidarinski" target="_blank" rel="noopener">linkedin</a>
        <a class="link" href="https://github.com/iv9eni" target="_blank" rel="noopener">github</a>
        <a class="link" href="https://drive.proton.me/urls/FFKNYHC6FW#BxRM8VcFFVL8" target="_blank" rel="noopener">resume</a>
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) { background: #07080b !important; overflow-x: hidden; }
  :global(.panel) { min-height: 100vh; min-height: 100dvh; }
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
  :global(.panel.active) .reveal { opacity: 1; transform: none; }
  :global(.panel.active) .reveal:nth-child(2) { transition-delay: .08s; }
  :global(.panel.active) .reveal:nth-child(3) { transition-delay: .16s; }
  :global(.panel.active) .reveal:nth-child(4) { transition-delay: .24s; }
  .link { padding: .7rem 1.3rem; border: 1px solid rgba(255,255,255,.12); border-radius: 999px; color: #eef1f5; text-decoration: none; transition: border-color .25s, color .25s, transform .25s; }
  .link:hover, .link:focus-visible { transform: translateY(-2px); outline: none; }
  @media (prefers-reduced-motion: reduce) { .reveal { transition: opacity .4s; transform: none; } }
</style>
