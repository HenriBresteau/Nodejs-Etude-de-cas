module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "./logs/err.log", // Enregistre les erreurs dans le fichier err.log
      instances: 3, // Lance 3 instances en parallèle
      max_memory_restart: "200M", // Utilise un maximum de 200 Mo de mémoire
    },
  ],
};
