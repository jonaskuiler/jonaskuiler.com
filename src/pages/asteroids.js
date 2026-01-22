import * as React from "react";
import { Link } from "gatsby";
import { Reset } from "styled-reset";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../theme";

const Global = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    background-color: #f5f6fa;
    color: #16161d;
    font-family: "Golos Text", sans-serif;
  }
`;

const Page = styled.main`
  min-height: 100vh;
  padding: 2.5rem 1.5rem 4rem;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: #1b2cff;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 3vw, 2.6rem);
  margin: 0;
`;

const Lead = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(22, 22, 29, 0.75);
`;

const GameStage = styled.section`
  position: relative;
  width: 100%;
  height: clamp(360px, 65vh, 560px);
  background: #0b0d12;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 60px rgba(10, 12, 18, 0.2);
`;

const CanvasHost = styled.div`
  position: absolute;
  inset: 0;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Hud = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 1rem;
  z-index: 2;
  color: #ffffff;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
`;

const HudItem = styled.div`
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: rgba(15, 18, 28, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  gap: 0.35rem;
  align-items: center;
`;

const HudLabel = styled.span`
  opacity: 0.7;
`;

const HudValue = styled.span`
  font-weight: 600;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 13, 18, 0.72);
  z-index: 3;
`;

const OverlayCard = styled.div`
  text-align: center;
  color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  background: rgba(15, 18, 28, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.14);
`;

const OverlayTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
`;

const OverlayText = styled.p`
  margin: 0;
  opacity: 0.75;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: #ffffff;
  padding: 1.4rem;
  border-radius: 16px;
  border: 1px solid rgba(22, 22, 29, 0.08);
  box-shadow: 0 16px 30px rgba(10, 12, 18, 0.08);
`;

const InfoTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
`;

const InfoText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: rgba(22, 22, 29, 0.7);
`;

const ControlList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
`;

const ControlItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: rgba(22, 22, 29, 0.75);
`;

const ControlKey = styled.span`
  font-weight: 600;
  color: #16161d;
`;

const FooterNote = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(22, 22, 29, 0.6);
`;

const AsteroidsPage = () => {
  const canvasRef = React.useRef(null);
  const [score, setScore] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [wave, setWave] = React.useState(1);
  const [status, setStatus] = React.useState("running");

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let app;
    let destroyed = false;
    const cleanupTasks = [];
    const keys = {
      left: false,
      right: false,
      up: false,
      space: false,
    };

    const bullets = [];
    const asteroids = [];
    const state = {
      score: 0,
      lives: 3,
      wave: 1,
      gameOver: false,
    };

    let ship;
    let lastShotAt = 0;

    const config = {
      ship: {
        radius: 12,
        rotationSpeed: 0.07,
        acceleration: 0.15,
        friction: 0.985,
        maxSpeed: 5.5,
        invulnerableMs: 1500,
      },
      bullet: {
        radius: 2,
        speed: 8.5,
        life: 70,
        cooldown: 180,
      },
      asteroid: {
        minRadius: 16,
        maxRadius: 46,
        baseCount: 5,
        maxSpeed: 1.5,
      },
    };

    const updateHud = () => {
      setScore(state.score);
      setLives(state.lives);
      setWave(state.wave);
      setStatus(state.gameOver ? "gameover" : "running");
    };

    const setup = async () => {
      const PIXI = await import("pixi.js");
      if (destroyed || !canvasRef.current) {
        return;
      }

      const host = canvasRef.current;
      host.innerHTML = "";
      const rect = host.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(320, Math.floor(rect.height));

      app = new PIXI.Application({
        width,
        height,
        backgroundColor: 0x0b0d12,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      });

      host.appendChild(app.view);

      const randomRange = (min, max) => min + Math.random() * (max - min);

      const createStarfield = () => {
        const stars = new PIXI.Graphics();
        const count = Math.max(
          40,
          Math.round((app.screen.width * app.screen.height) / 8000)
        );

        for (let i = 0; i < count; i += 1) {
          const x = Math.random() * app.screen.width;
          const y = Math.random() * app.screen.height;
          const radius = Math.random() * 1.4 + 0.4;
          const alpha = 0.4 + Math.random() * 0.6;
          stars.beginFill(0xffffff, alpha);
          stars.drawCircle(x, y, radius);
          stars.endFill();
        }

        return stars;
      };

      const createShip = (x, y) => {
        const gfx = new PIXI.Graphics();
        gfx.lineStyle(2, 0xffffff, 0.9);
        gfx.moveTo(0, -14);
        gfx.lineTo(10, 12);
        gfx.lineTo(0, 6);
        gfx.lineTo(-10, 12);
        gfx.lineTo(0, -14);
        gfx.closePath();
        gfx.position.set(x, y);
        return {
          gfx,
          vx: 0,
          vy: 0,
          radius: config.ship.radius,
          invulnerableUntil: 0,
        };
      };

      const createAsteroidShape = (radius) => {
        const gfx = new PIXI.Graphics();
        gfx.lineStyle(2, 0xffffff, 0.85);
        gfx.beginFill(0x000000, 0);
        const points = [];
        const vertices = Math.max(7, Math.round(radius / 3));
        for (let i = 0; i < vertices; i += 1) {
          const angle = (i / vertices) * Math.PI * 2;
          const variance = radius * randomRange(0.65, 1.05);
          points.push(Math.cos(angle) * variance, Math.sin(angle) * variance);
        }
        gfx.drawPolygon(points);
        gfx.endFill();
        return gfx;
      };

      const spawnAsteroid = (radius, x, y) => {
        const gfx = createAsteroidShape(radius);
        gfx.position.set(x, y);
        const speed = randomRange(0.35, config.asteroid.maxSpeed);
        const angle = randomRange(0, Math.PI * 2);
        const asteroid = {
          gfx,
          radius,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rotationSpeed: randomRange(-0.02, 0.02),
        };
        asteroids.push(asteroid);
        app.stage.addChild(gfx);
      };

      const wrapEntity = (gfx, radius) => {
        const width = app.screen.width;
        const height = app.screen.height;
        if (gfx.x < -radius) gfx.x = width + radius;
        if (gfx.x > width + radius) gfx.x = -radius;
        if (gfx.y < -radius) gfx.y = height + radius;
        if (gfx.y > height + radius) gfx.y = -radius;
      };

      const removeEntity = (collection, index) => {
        const [entity] = collection.splice(index, 1);
        if (entity) {
          app.stage.removeChild(entity.gfx);
          entity.gfx.destroy();
        }
      };

      const spawnWave = () => {
        const count = config.asteroid.baseCount + state.wave - 1;
        for (let i = 0; i < count; i += 1) {
          let x = 0;
          let y = 0;
          let attempts = 0;
          do {
            x = Math.random() * app.screen.width;
            y = Math.random() * app.screen.height;
            attempts += 1;
          } while (
            Math.hypot(x - ship.gfx.x, y - ship.gfx.y) < 140 &&
            attempts < 25
          );
          const radius = randomRange(
            config.asteroid.minRadius,
            config.asteroid.maxRadius
          );
          spawnAsteroid(radius, x, y);
        }
      };

      const fireBullet = () => {
        const gfx = new PIXI.Graphics();
        gfx.beginFill(0xffffff, 1);
        gfx.drawCircle(0, 0, config.bullet.radius);
        gfx.endFill();
        const directionX = Math.sin(ship.gfx.rotation);
        const directionY = -Math.cos(ship.gfx.rotation);
        gfx.position.set(
          ship.gfx.x + directionX * (ship.radius + 4),
          ship.gfx.y + directionY * (ship.radius + 4)
        );
        const bullet = {
          gfx,
          radius: config.bullet.radius,
          vx: directionX * config.bullet.speed + ship.vx,
          vy: directionY * config.bullet.speed + ship.vy,
          life: config.bullet.life,
        };
        bullets.push(bullet);
        app.stage.addChild(gfx);
      };

      const scoreForRadius = (radius) => {
        if (radius < 22) return 100;
        if (radius < 32) return 60;
        return 30;
      };

      const triggerGameOver = () => {
        state.gameOver = true;
        state.lives = 0;
        for (let i = bullets.length - 1; i >= 0; i -= 1) {
          removeEntity(bullets, i);
        }
        updateHud();
      };

      const resetGame = () => {
        state.score = 0;
        state.lives = 3;
        state.wave = 1;
        state.gameOver = false;
        ship.gfx.position.set(app.screen.width / 2, app.screen.height / 2);
        ship.gfx.rotation = 0;
        ship.vx = 0;
        ship.vy = 0;
        ship.invulnerableUntil =
          performance.now() + config.ship.invulnerableMs;

        for (let i = bullets.length - 1; i >= 0; i -= 1) {
          removeEntity(bullets, i);
        }
        for (let i = asteroids.length - 1; i >= 0; i -= 1) {
          removeEntity(asteroids, i);
        }
        spawnWave();
        updateHud();
      };

      const handleKeyDown = (event) => {
        if (
          ["ArrowLeft", "ArrowRight", "ArrowUp", "Space"].includes(event.code)
        ) {
          event.preventDefault();
        }
        switch (event.code) {
          case "ArrowLeft":
          case "KeyA":
            keys.left = true;
            break;
          case "ArrowRight":
          case "KeyD":
            keys.right = true;
            break;
          case "ArrowUp":
          case "KeyW":
            keys.up = true;
            break;
          case "Space":
            keys.space = true;
            break;
          case "KeyR":
            resetGame();
            break;
          default:
            break;
        }
      };

      const handleKeyUp = (event) => {
        switch (event.code) {
          case "ArrowLeft":
          case "KeyA":
            keys.left = false;
            break;
          case "ArrowRight":
          case "KeyD":
            keys.right = false;
            break;
          case "ArrowUp":
          case "KeyW":
            keys.up = false;
            break;
          case "Space":
            keys.space = false;
            break;
          default:
            break;
        }
      };

      const resize = () => {
        if (!app || !canvasRef.current) return;
        const nextRect = canvasRef.current.getBoundingClientRect();
        const nextWidth = Math.max(320, Math.floor(nextRect.width));
        const nextHeight = Math.max(320, Math.floor(nextRect.height));
        app.renderer.resize(nextWidth, nextHeight);
      };

      const starfield = createStarfield();
      ship = createShip(app.screen.width / 2, app.screen.height / 2);

      app.stage.addChild(starfield);
      app.stage.addChild(ship.gfx);

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      window.addEventListener("resize", resize);

      cleanupTasks.push(() => window.removeEventListener("keydown", handleKeyDown));
      cleanupTasks.push(() => window.removeEventListener("keyup", handleKeyUp));
      cleanupTasks.push(() => window.removeEventListener("resize", resize));

      const tick = (delta) => {
        const now = performance.now();
        if (!state.gameOver) {
          if (keys.left) ship.gfx.rotation -= config.ship.rotationSpeed * delta;
          if (keys.right) ship.gfx.rotation += config.ship.rotationSpeed * delta;
          if (keys.up) {
            ship.vx +=
              Math.sin(ship.gfx.rotation) * config.ship.acceleration * delta;
            ship.vy +=
              -Math.cos(ship.gfx.rotation) * config.ship.acceleration * delta;
          }
          if (keys.space && now - lastShotAt > config.bullet.cooldown) {
            fireBullet();
            lastShotAt = now;
          }
        }

        ship.vx *= config.ship.friction;
        ship.vy *= config.ship.friction;

        const speed = Math.hypot(ship.vx, ship.vy);
        if (speed > config.ship.maxSpeed) {
          const scale = config.ship.maxSpeed / speed;
          ship.vx *= scale;
          ship.vy *= scale;
        }

        if (!state.gameOver) {
          ship.gfx.x += ship.vx * delta;
          ship.gfx.y += ship.vy * delta;
          wrapEntity(ship.gfx, ship.radius);
        } else {
          ship.vx = 0;
          ship.vy = 0;
        }

        const invulnerable = now < ship.invulnerableUntil;
        if (state.gameOver) {
          ship.gfx.alpha = 0.35;
        } else if (invulnerable) {
          ship.gfx.alpha = 0.4 + 0.3 * (1 + Math.sin(now / 120));
        } else {
          ship.gfx.alpha = 1;
        }

        for (let i = bullets.length - 1; i >= 0; i -= 1) {
          const bullet = bullets[i];
          bullet.gfx.x += bullet.vx * delta;
          bullet.gfx.y += bullet.vy * delta;
          bullet.life -= delta;
          if (
            bullet.life <= 0 ||
            bullet.gfx.x < -10 ||
            bullet.gfx.x > app.screen.width + 10 ||
            bullet.gfx.y < -10 ||
            bullet.gfx.y > app.screen.height + 10
          ) {
            removeEntity(bullets, i);
          }
        }

        for (let i = asteroids.length - 1; i >= 0; i -= 1) {
          const asteroid = asteroids[i];
          asteroid.gfx.x += asteroid.vx * delta;
          asteroid.gfx.y += asteroid.vy * delta;
          asteroid.gfx.rotation += asteroid.rotationSpeed * delta;
          wrapEntity(asteroid.gfx, asteroid.radius);
        }

        for (let i = bullets.length - 1; i >= 0; i -= 1) {
          const bullet = bullets[i];
          for (let j = asteroids.length - 1; j >= 0; j -= 1) {
            const asteroid = asteroids[j];
            const dx = bullet.gfx.x - asteroid.gfx.x;
            const dy = bullet.gfx.y - asteroid.gfx.y;
            const hitRadius = bullet.radius + asteroid.radius;
            if (dx * dx + dy * dy <= hitRadius * hitRadius) {
              const hitX = asteroid.gfx.x;
              const hitY = asteroid.gfx.y;
              const hitAsteroidRadius = asteroid.radius;
              removeEntity(bullets, i);
              removeEntity(asteroids, j);

              const nextRadius = hitAsteroidRadius * 0.6;
              if (nextRadius >= config.asteroid.minRadius) {
                spawnAsteroid(nextRadius, hitX, hitY);
                spawnAsteroid(nextRadius, hitX, hitY);
              }

              state.score += scoreForRadius(hitAsteroidRadius);
              updateHud();
              break;
            }
          }
        }

        if (!state.gameOver && !invulnerable) {
          for (let i = asteroids.length - 1; i >= 0; i -= 1) {
            const asteroid = asteroids[i];
            const dx = ship.gfx.x - asteroid.gfx.x;
            const dy = ship.gfx.y - asteroid.gfx.y;
            const hitRadius = ship.radius + asteroid.radius;
            if (dx * dx + dy * dy <= hitRadius * hitRadius) {
              state.lives -= 1;
              if (state.lives <= 0) {
                triggerGameOver();
              } else {
                ship.gfx.position.set(
                  app.screen.width / 2,
                  app.screen.height / 2
                );
                ship.vx = 0;
                ship.vy = 0;
                ship.invulnerableUntil =
                  performance.now() + config.ship.invulnerableMs;
                updateHud();
              }
              break;
            }
          }
        }

        if (!state.gameOver && asteroids.length === 0) {
          state.wave += 1;
          spawnWave();
          updateHud();
        }
      };

      app.ticker.add(tick);
      cleanupTasks.push(() => app.ticker.remove(tick));

      resetGame();
    };

    setup();

    return () => {
      destroyed = true;
      cleanupTasks.forEach((task) => task());
      if (app) {
        app.destroy(true, { children: true });
      }
      if (canvasRef.current) {
        canvasRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <Global />
      <Page>
        <Content>
          <Header>
            <BackLink to="/">Back to home</BackLink>
            <Title>Asteroids in PixiJS</Title>
            <Lead>
              A lightweight Asteroids inspired game built with PixiJS. Pilot the
              ship, clear the field, and see how far you can push the wave
              counter.
            </Lead>
          </Header>

          <GameStage>
            <Hud>
              <HudItem>
                <HudLabel>Score</HudLabel>
                <HudValue>{score}</HudValue>
              </HudItem>
              <HudItem>
                <HudLabel>Lives</HudLabel>
                <HudValue>{lives}</HudValue>
              </HudItem>
              <HudItem>
                <HudLabel>Wave</HudLabel>
                <HudValue>{wave}</HudValue>
              </HudItem>
            </Hud>
            <CanvasHost ref={canvasRef} />
            {status === "gameover" && (
              <Overlay>
                <OverlayCard>
                  <OverlayTitle>Game over</OverlayTitle>
                  <OverlayText>Press R to restart.</OverlayText>
                </OverlayCard>
              </Overlay>
            )}
          </GameStage>

          <InfoGrid>
            <InfoCard>
              <InfoTitle>Controls</InfoTitle>
              <ControlList>
                <ControlItem>
                  <span>Rotate</span>
                  <ControlKey>Left or Right</ControlKey>
                </ControlItem>
                <ControlItem>
                  <span>Thrust</span>
                  <ControlKey>Up</ControlKey>
                </ControlItem>
                <ControlItem>
                  <span>Shoot</span>
                  <ControlKey>Space</ControlKey>
                </ControlItem>
                <ControlItem>
                  <span>Restart</span>
                  <ControlKey>R</ControlKey>
                </ControlItem>
              </ControlList>
            </InfoCard>
            <InfoCard>
              <InfoTitle>Gameplay</InfoTitle>
              <InfoText>
                Destroy asteroids to advance the wave. Larger asteroids split
                into smaller ones, so keep moving and manage your momentum.
              </InfoText>
            </InfoCard>
            <InfoCard>
              <InfoTitle>Tech notes</InfoTitle>
              <InfoText>
                The game uses PixiJS Graphics primitives, a minimal physics
                loop, and a responsive canvas that resizes with the page.
              </InfoText>
            </InfoCard>
          </InfoGrid>

          <FooterNote>
            Tip: use W, A, and D as alternative controls for thrust and
            rotation.
          </FooterNote>
        </Content>
      </Page>
    </ThemeProvider>
  );
};

export default AsteroidsPage;
