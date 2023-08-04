// @ts-check
// @ts-ignore
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.log(`npm_execpath: `, process.env.npm_execpath);
  console.warn(`\u001b[33mThis repository requires using pnpm as the package manager ` + ` for scripts to work properly.\u001b[39m\n`);
  process.exit(1);
}
