export const mfConfig = {
  name: "greetingRemote",
  exposes: {
    "./GreetingWidget": "./src/components/GreetingWidget",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
  },
};
