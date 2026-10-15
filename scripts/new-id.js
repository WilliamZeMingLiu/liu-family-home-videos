// Prints a fresh 6-char base36 video id that isn't already used in src/videos.js.
import { randomInt } from "node:crypto";
import { readFileSync } from "node:fs";

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const source = readFileSync(new URL("../src/videos.js", import.meta.url), "utf8");
const used = new Set([...source.matchAll(/id:\s*"([a-z0-9]{6})"/g)].map((m) => m[1]));

let id;
do {
  id = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
} while (used.has(id));

console.log(id);
