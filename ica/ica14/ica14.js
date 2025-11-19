document.addEventListener("DOMContentLoaded", () => {
  const paths = document.querySelectorAll("#line-animation svg path");
  if (!paths.length) return; // animation section didn't load

  const colors = ["#8f32ff", "#00ffa6", "#ff9b26", "#ff004c", "#00c0ff"];

  const ease = (i) =>
    CustomEase.create(
      "shiftEase" + i,
      `M0,0 C0.6,0.16 ${0.6 - (i + 1) / 8},1 1,1`
    );

  const tl = gsap.timeline({ repeat: -1 });

  paths.forEach((p, i) => {
    const len = p.getTotalLength();

    tl.add(
      gsap
        .timeline()
        .set(p, { stroke: colors[i], x: 0 })
        .from(p, { duration: 2, drawSVG: "0 35", ease: ease(5 - i) })
        .to(
          p,
          { duration: 1.2, drawSVG: `${len - 35} 100%`, ease: ease(i) },
          "-=0.2"
        )
        .to(
          p,
          { duration: 1, stroke: colors[4 - i], x: -200, ease: ease(i) },
          "-=0.1"
        ),
      0
    );
  });
});
