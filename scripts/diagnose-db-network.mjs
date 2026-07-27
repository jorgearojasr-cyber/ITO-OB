// Diagnóstico TEMPORAL de red -- agregado para aislar el P1001 de
// prisma migrate deploy en el build de Vercel (conexión directa a Neon
// falla desde el build, pero funciona igual desde una máquina local con
// la misma credencial). Nunca imprime la URL completa ni la credencial
// -- solo host, puerto, IPs resueltas y resultado de un connect TCP
// crudo. Se borra este archivo y la referencia en package.json una vez
// que tengamos el diagnóstico.
import dns from "node:dns/promises";
import net from "node:net";

function parseHostPort(urlString, label) {
  if (!urlString) {
    console.log(`[net-diag] ${label}: variable no definida`);
    return null;
  }
  try {
    const u = new URL(urlString);
    return { host: u.hostname, port: Number(u.port) || 5432, label };
  } catch {
    console.log(`[net-diag] ${label}: no se pudo parsear la URL`);
    return null;
  }
}

function tcpConnect(host, port, label, family) {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = net.createConnection({ host, port, family, timeout: 5000 });
    socket.on("connect", () => {
      console.log(`[net-diag] ${label} TCP OK en ${Date.now() - start}ms (conectó a ${socket.remoteAddress})`);
      socket.destroy();
      resolve();
    });
    socket.on("timeout", () => {
      console.log(`[net-diag] ${label} TCP TIMEOUT después de ${Date.now() - start}ms`);
      socket.destroy();
      resolve();
    });
    socket.on("error", (e) => {
      console.log(`[net-diag] ${label} TCP FALLA en ${Date.now() - start}ms: ${e.code || e.message}`);
      resolve();
    });
  });
}

async function checkTarget(target) {
  if (!target) return;
  const { host, port, label } = target;
  console.log(`[net-diag] ${label} -> host=${host} port=${port}`);

  let addrs;
  try {
    addrs = await dns.lookup(host, { all: true });
    console.log(
      `[net-diag] ${label} DNS resuelve a: ${addrs.map((a) => `${a.address}(v${a.family})`).join(", ")}`,
    );
  } catch (e) {
    console.log(`[net-diag] ${label} DNS FALLA: ${e.code || e.message}`);
    return;
  }

  // Prueba cada IP resuelta por separado, por familia -- así se aísla si
  // el problema es específico de IPv4, de IPv6, o de ambos (en vez de
  // dejar que net.createConnection/happy-eyeballs elija una sola).
  const v4 = addrs.find((a) => a.family === 4);
  const v6 = addrs.find((a) => a.family === 6);
  if (v4) await tcpConnect(v4.address, port, `${label} [IPv4 directo ${v4.address}]`);
  if (v6) await tcpConnect(v6.address, port, `${label} [IPv6 directo ${v6.address}]`);
}

console.log("[net-diag] inicio");
await checkTarget(parseHostPort(process.env.DATABASE_URL, "pooled(DATABASE_URL)"));
await checkTarget(parseHostPort(process.env.DATABASE_URL_UNPOOLED, "directo(DATABASE_URL_UNPOOLED)"));
console.log("[net-diag] fin");
