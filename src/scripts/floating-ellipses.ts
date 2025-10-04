import Matter from "matter-js";

export default function FloatingEllipses() {
  const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
  // Engine + world
  const engine = Engine.create();
  engine.gravity.y = 0; // no gravity
  const world = engine.world;

  const canvas = document.getElementById("world") as HTMLCanvasElement;

  const { width: canvasWidth, height: canvasHeight } =
    canvas.getBoundingClientRect();

  const render = Render.create({
    canvas,
    engine,
    options: {
      width: canvasWidth,
      height: canvasHeight,
      background: document.documentElement.classList.contains("dark")
        ? "#e4fe52"
        : "#201409",
      wireframes: false,
    },
  });
  Render.run(render);
  Runner.run(Runner.create(), engine);

  // Boundaries
  let boundaries: Matter.Body[] = [];
  function createBoundaries() {
    // remove old
    World.remove(world, boundaries);
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    boundaries = [
      Bodies.rectangle(w / 2, -25, w, 50, { isStatic: true }),
      Bodies.rectangle(w / 2, h + 25, w, 50, { isStatic: true }),
      Bodies.rectangle(-25, h / 2, 50, h, { isStatic: true }),
      Bodies.rectangle(w + 25, h / 2, 50, h, { isStatic: true }),
    ];
    World.add(world, boundaries);

    // also resize canvas
    render.canvas.width = w;
    render.canvas.height = h;
  }
  createBoundaries();

  let bodies: Matter.Body[] = [];

  function generateShape(position?: { x: number; y: number; angle?: number }) {
    const shape = Bodies.circle(
      position?.x ?? Math.random() * canvasWidth,
      position?.y ?? Math.random() * canvasHeight,
      innerWidth >= 768 ? 100 : 75,
      {
        restitution: 0.3, // softer bounce
        frictionAir: 0.08, // liquid-like drag
        density: 0.002, // lighter feel
        render: {
          fillStyle: "transparent",
          strokeStyle: document.documentElement.classList.contains("dark")
            ? "#201409"
            : "#f1ede9",
          lineWidth: 1,
        },
      },
    );
    Matter.Body.scale(shape, 1.4, 0.75);
    Matter.Body.setAngle(
      shape,
      position?.angle ?? (Math.random() * 2 - 1) * Math.PI,
    );
    return shape;
  }

  bodies = Array.from({ length: 7 }).map(() => generateShape());

  World.add(world, bodies);

  let mouseBody: Matter.Body | undefined = undefined;

  let mouseTarget = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  };

  function handleMouseMove(e: MouseEvent) {
    const { top, left } = canvas.getBoundingClientRect();
    mouseTarget = { x: e.clientX - left, y: e.clientY - top };
  }

  function handleMouseBody() {
    if (window.innerWidth >= 768) {
      if (mouseBody) World.remove(world, mouseBody);
      mouseBody = Bodies.circle(canvasWidth / 2, canvasHeight / 2, 60, {
        inertia: Infinity,
        frictionAir: 0.2,
        render: { visible: false },
      });
      canvas.addEventListener("mousemove", handleMouseMove);
      World.add(world, mouseBody);
    } else {
      if (mouseBody) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        World.remove(world, mouseBody);
      }
    }
  }

  handleMouseBody();

  Events.on(engine, "beforeUpdate", () => {
    if (mouseBody) {
      const dx = mouseTarget.x - mouseBody.position.x;
      const dy = mouseTarget.y - mouseBody.position.y;
      Body.setVelocity(mouseBody, { x: dx * 0.2, y: dy * 0.2 });
    }
    bodies.forEach((body) => {
      const t = engine.timing.timestamp * 0.001;
      const forceMagnitude = 0.02;

      const fx = Math.sin(t + body.id) * forceMagnitude;
      const fy = Math.cos(t * 0.9 + body.id) * forceMagnitude;

      Body.applyForce(body, body.position, { x: fx, y: fy });
    });
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    const { width: canvasWidth, height: canvasHeight } =
      canvas.getBoundingClientRect();

    render.options.width = canvasWidth;
    render.options.height = canvasHeight;

    const newBodies = bodies.map((body) =>
      generateShape({
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
      }),
    );
    World.remove(world, bodies);
    bodies = newBodies;
    World.add(world, bodies);
    createBoundaries();
    handleMouseBody();
  });

  const mutationObserver = new MutationObserver(([entry]) => {
    const dark = (entry.target as HTMLElement).className.includes("dark");
    const newBodies = bodies.map((body) =>
      generateShape({
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
      }),
    );
    render.options.background = dark ? "#e4fe52" : "#201409";
    World.remove(world, bodies);
    bodies = newBodies;
    World.add(world, bodies);
  });

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}
