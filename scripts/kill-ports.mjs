import { execSync } from 'node:child_process'

const args = process.argv.slice(2)
const ports = args.length
  ? args.map(Number)
  : Array.from({ length: 11 }, (_, i) => 3000 + i) // 3000..3010

function killPort(port) {
  try {
    if (process.platform === 'win32') {
      // Windows: find PID then kill
      const out = execSync(`netstat -ano | findstr :${port}`, { stdio: ['ignore', 'pipe', 'pipe'] }).toString()
      const pids = Array.from(new Set(out.split(/\r?\n/).map(l => l.trim().split(/\s+/).pop()).filter(Boolean)))
      for (const pid of pids) {
        try { execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' }) } catch {}
      }
    } else {
      // macOS/Linux
      const out = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN | awk 'NR>1 {print $2}'`, { stdio: ['ignore', 'pipe', 'pipe'] }).toString()
      const pids = Array.from(new Set(out.split(/\r?\n/).map(s => s.trim()).filter(Boolean)))
      for (const pid of pids) {
        try { execSync(`kill -9 ${pid}`, { stdio: 'ignore' }) } catch {}
      }
    }
    console.log(`[kill-ports] cleared port ${port}`)
  } catch (e) {
    // no listeners found or command failed; continue
    console.log(`[kill-ports] no listener on ${port}`)
  }
}

for (const p of ports) killPort(p)

