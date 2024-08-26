import { defineConfig } from "cypress";
import dotenv from 'dotenv';

dotenv.config()

export default defineConfig({
  watchForFileChanges:false,
  defaultCommandTimeout:10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
    // baseUrl: process.env.BASE_URL,
    env: {
      // API_BASE_URL: 'http://localhost:8080/',
      API_BASE_URL: process.env.VITE_BASE_URL,
      AUTH_TOKEN: process.env.AUTH_TOKEN,
    },
  },
});