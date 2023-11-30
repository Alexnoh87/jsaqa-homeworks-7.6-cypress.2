const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "if2qfn",
  e2e: {
    baseUrl: "https://qamid.tmweb.ru/",
  },
});
