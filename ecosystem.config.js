module.exports = {
  apps: [
    {
      name: "new-rmw",
      script: "npm",
      args: "start",
      // 1 vCPU / 1 GB VPS: cluster + build often OOM and leaves a broken .next/static (CSS 400s).
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: "3000",
      },
      max_memory_restart: "800M",
    },
  ],
};