(function () {
  if (!window.THREE) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  function fit(renderer, camera, el) {
    const w = el.clientWidth || 300;
    const h = el.clientHeight || 300;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }

  function watch(el, render) {
    let on = true;
    const io = new IntersectionObserver(function (entries) {
      on = entries[0].isIntersecting;
    });
    io.observe(el);
    function loop() {
      requestAnimationFrame(loop);
      if (on) render();
    }
    loop();
  }

  const heroCanvas = document.getElementById("hero-canvas");
  if (heroCanvas) {
    const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.z = 5.2;
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 1),
      new THREE.MeshStandardMaterial({ color: 0x151b2b, metalness: 0.88, roughness: 0.18, emissive: 0x3b1d86, emissiveIntensity: 0.55 })
    );
    const wire = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.015, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.75 })
    );
    scene.add(core, wire);
    const a = new THREE.PointLight(0x8b5cf6, 18, 18);
    a.position.set(3, 2, 3);
    const b = new THREE.PointLight(0x00e5ff, 14, 16);
    b.position.set(-3, -1, 2);
    scene.add(a, b, new THREE.AmbientLight(0xffffff, 0.35));
    const count = window.innerWidth < 768 ? 40 : 140;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.03 }));
    scene.add(dust);
    window.addEventListener("resize", function () { fit(renderer, camera, heroCanvas.parentElement); });
    fit(renderer, camera, heroCanvas.parentElement);
    watch(heroCanvas, function () {
      core.rotation.y += 0.005;
      core.rotation.x += 0.002;
      wire.rotation.x += 0.004;
      wire.rotation.y += 0.006;
      dust.rotation.y += 0.001;
      renderer.render(scene, camera);
    });
  }
})();
