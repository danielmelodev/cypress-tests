const { defineConfig } = require("cypress");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      cypressSplit(on, config);
      return config;
    },
    baseUrl: "http://localhost:3000",
    experimentalStudio: true,
  },
});
