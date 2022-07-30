module.exports = {
  apps: [
    {
      name: 'mail-service',
      script: 'npm',
      args: 'run start:prod',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
