import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = new URL("./dist/", import.meta.url);
const files = [
  "index.html",
  "app.js",
  "styles.css",
  "favicon.svg",
  "manifest.json",
  "sw.js"
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
  await cp(new URL("./" + file, import.meta.url), new URL("./dist/" + file, import.meta.url));
}

console.log("Build ÉCLAT terminé : " + files.length + " fichiers copiés dans dist/");
