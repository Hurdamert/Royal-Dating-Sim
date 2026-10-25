// Minimal read-only ZIP reader (stored + deflate) built on node:zlib, so the
// content compiler can read members straight from the frozen source archives
// without extracting or rewriting them.
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

const EOCD_SIG = 0x06054b50;
const CEN_SIG = 0x02014b50;
const LOC_SIG = 0x04034b50;

function findEocd(buf) {
  const min = Math.max(0, buf.length - 65557);
  for (let i = buf.length - 22; i >= min; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) return i;
  }
  throw new Error('ZIP end-of-central-directory not found');
}

/** @returns {Map<string, {method:number, compressedSize:number, size:number, offset:number}>} */
export function listZip(buf) {
  const eocd = findEocd(buf);
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== CEN_SIG) throw new Error('Bad central directory entry');
    const method = buf.readUInt16LE(p + 10);
    const compressedSize = buf.readUInt32LE(p + 20);
    const size = buf.readUInt32LE(p + 24);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const offset = buf.readUInt32LE(p + 42);
    const name = buf.subarray(p + 46, p + 46 + nameLen).toString('utf8');
    entries.set(name, { method, compressedSize, size, offset });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

export function readZipMember(buf, name) {
  const e = listZip(buf).get(name);
  if (!e) throw new Error(`ZIP member not found: ${name}`);
  if (buf.readUInt32LE(e.offset) !== LOC_SIG) throw new Error('Bad local header');
  const nameLen = buf.readUInt16LE(e.offset + 26);
  const extraLen = buf.readUInt16LE(e.offset + 28);
  const start = e.offset + 30 + nameLen + extraLen;
  const data = buf.subarray(start, start + e.compressedSize);
  let out;
  if (e.method === 0) out = Buffer.from(data);
  else if (e.method === 8) out = inflateRawSync(data);
  else throw new Error(`Unsupported ZIP method ${e.method} for ${name}`);
  if (out.length !== e.size) throw new Error(`Size mismatch for ${name}`);
  return out;
}

export function openZip(path) {
  const buf = readFileSync(path);
  return {
    names: () => [...listZip(buf).keys()],
    read: (name) => readZipMember(buf, name),
  };
}
