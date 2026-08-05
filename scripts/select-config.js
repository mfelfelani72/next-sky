#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

let chalk;
let select;

async function loadModules() {
  const chalkModule = await import("chalk");
  chalk = chalkModule.default;

  const inquirerModule = await import("@inquirer/prompts");
  select = inquirerModule.select;
}

const CONFIGS_DIR = path.join(__dirname, "../configs");

/* ---------------- CORE ---------------- */

function listConfigs() {
  const files = fs.readdirSync(CONFIGS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => f.replace(".json", ""));
}

function loadConfig(name) {
  const filePath = path.join(CONFIGS_DIR, `${name}.json`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Config "${name}" not found!`);
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveEnvValue(value, env) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (value.dev !== undefined || value.prod !== undefined) {
      return value[env] !== undefined ? value[env] : value.dev || value.prod;
    }
    return value;
  }
  return value;
}

function flattenObject(obj, env) {
  const result = {};

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (value.dev !== undefined || value.prod !== undefined) {
        result[key] = resolveEnvValue(value, env);
      } else {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

/* ---------------- CINEMATIC HELPERS ---------------- */

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getGitBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return null;
  }
}

async function renderHeader(branch) {
  const title = chalk.bold.cyan("⚡ Config Generator");

  const author = chalk.gray("👤 Written by Tewino Team");
  const role = chalk.gray("\n Frontend Lead: Mohammad Felfelani");
  const email = chalk.gray("\n 📧 mfelfelani72@gmail.com");

  console.log("");
  console.log(title);
  await sleep(80);

  console.log(author);
  await sleep(80);

  console.log(role);
  await sleep(80);

  console.log(email);
  await sleep(80);

  if (branch) {
    const color =
      branch === "main" || branch === "master" ? chalk.red : chalk.green;

    console.log(chalk.gray("\n🌿 git branch: ") + color(branch));
  }

  console.log("");
}

function clearScreen() {
  process.stdout.write("\x1Bc");
}

/* ---------------- SELECT ---------------- */

async function selectConfig() {
  const configs = listConfigs();

  if (configs.length === 0) {
    console.error(chalk.red("❌ No config files found"));
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const licenseArg = args.find((arg) => arg.startsWith("--license="));

  if (licenseArg) {
    const selected = licenseArg.split("=")[1];

    if (configs.includes(selected)) return selected;

    console.error(chalk.red(`❌ Config "${selected}" not found`));
    console.log(chalk.yellow(configs.join(", ")));
    process.exit(1);
  }

  const branch = getGitBranch();

  clearScreen();

  await sleep(120);
  await renderHeader(branch);

  await sleep(120);

  console.log(chalk.gray(`📦 ${configs.length} configs available\n`));

  const defaultIndex = configs.includes("dev") ? configs.indexOf("dev") : 0;

  const selected = await select({
    message: chalk.white.bold("Select configuration"),
    default: configs[defaultIndex],
    choices: configs.map((name, index) => ({
      name:
        `${chalk.gray(String(index + 1).padStart(2, " "))}  ` +
        `${index === defaultIndex ? chalk.green.bold(name + " (default)") : chalk.green(name)}`,
      value: name,
    })),
    pageSize: 8,
  });

  console.log(chalk.gray(`\n✓ selected: ${chalk.green.bold(selected)}\n`));

  return selected;
}

/* ---------------- MAIN ---------------- */

async function main() {
  await loadModules();

  const selected = await selectConfig();

  const config = loadConfig(selected);

  const isDocker = process.env.DOCKER_ENV === "true";
  const isProd = process.env.NODE_ENV === "production" || isDocker;
  const env = isProd ? "prod" : "dev";

  const flatConfig = flattenObject(config, env);

  const envVars = {};

  for (const key in flatConfig) {
    if (flatConfig.hasOwnProperty(key)) {
      envVars[`NEXT_PUBLIC_${key}`] = flatConfig[key];
    }
  }

  envVars.NEXT_PUBLIC_SELECTED_CONFIG = selected;

  let envContent = `# Generated from configs/${selected}.json\n`;
  envContent += `# Generated at ${new Date().toISOString()}\n\n`;

  for (const [key, value] of Object.entries(envVars)) {
    if (value !== undefined && value !== null && value !== "") {
      envContent += `${key}="${value}"\n`;
    }
  }

  fs.writeFileSync(path.join(__dirname, "../.env.local"), envContent);

  console.log(chalk.green.bold(`\n✅ .env.local generated from "${selected}"`));

  console.log(chalk.cyan(`📦 License: ${config.LICENSE_NAME || "N/A"}`));

  console.log(chalk.gray(`🌐 env: ${env}\n`));
}

main().catch(console.error);
