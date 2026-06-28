export const mfConfig = {
  name: 'dashboard',
  // greetingRemote is intentionally NOT here — static remotes are pre-fetched
  // at startup by @module-federation/enhanced. It is registered dynamically
  // inside GreetingWidget so the manifest fetch only happens on render and
  // errors are caught gracefully.
  remotes: {},
  exposes: {},
  shared: {
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^7.0.0' },
  },
};
