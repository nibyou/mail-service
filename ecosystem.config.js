module.exports = {
  apps: [
    {
      name: 'mail-service',
      script: 'npm',
      args: 'run start:prod',
      instances: '1',
      exec_mode: 'fork',
    },
  ],
};
