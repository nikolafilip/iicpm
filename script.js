(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = document.querySelectorAll(
    ".findings .lede, .pain-chart, .men-copy, .quote-panel, .study, .methods-grid, .conclusion-inner"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }

  const chart = document.querySelector(".pain-chart");
  const rows = document.querySelectorAll(".pain-row");

  const animateBars = () => {
    rows.forEach((row) => {
      const score = Number(row.dataset.score || 0);
      const bar = row.querySelector(".pain-bar");
      if (!bar) return;
      const width = `${score}%`;
      bar.style.setProperty("--target-width", width);
      requestAnimationFrame(() => {
        bar.style.width = width;
      });
    });
  };

  if (chart && "IntersectionObserver" in window && !reduceMotion) {
    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBars();
            chartObserver.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    chartObserver.observe(chart);
  } else {
    animateBars();
  }
})();
