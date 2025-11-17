module.exports = {
  apps: [
    {
      name: "propozly-new", // *this one
      watch: false,
      max_memory_restart: "1000M",
      interpreter: "node@22.21.0",
      cwd: "./",
      script: "./.output/server/index.mjs",
      args: "start",
      interpreter_args: "--harmony",
      error_file: "./pm2-error.log",
      env: {
        PORT: 3311, // *this one
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3311, // *this one
        NODE_ENV: "production",
      },
    },
  ],
}
