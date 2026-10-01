import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal 1x1 RGBA PNG buffer structure generator
function createPngBuffer(width, height) {
  // A minimal valid 16x16 / 48x48 / 128x128 PNG buffer generator (uncompressed PNG chunk)
  // For standard Chrome extension placeholder icons, a valid PNG chunk set:
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrLen = Buffer.from([0x00, 0x00, 0x00, 0x0D]);
  const ihdrType = Buffer.from('IHDR', 'binary');
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  
  // Calculate CRC32 for IHDR
  const crc32 = (buf) => {
    let table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[i] = c;
    }
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  };
  
  const ihdrCrc = Buffer.alloc(4);
  ihdrCrc.writeUInt32BE(crc32(Buffer.concat([ihdrType, ihdrData])), 0);
  
  // IDAT chunk with dark grey (#111111) image data
  // Raw uncompressed scanlines: each line has 1 filter byte (0) + width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    rawData[offset] = 0; // filter type 0
    for (let x = 0; x < width; x++) {
      const p = offset + 1 + x * 4;
      rawData[p] = 16;     // R
      rawData[p + 1] = 16; // G
      rawData[p + 2] = 16; // B
      rawData[p + 3] = 255;// A
    }
  }

  // Use zlib createDeflate if needed or zlib.deflateSync
  import('zlib').then(({ deflateSync }) => {
    const compressed = deflateSync(rawData);
    const idatLen = Buffer.alloc(4);
    idatLen.writeUInt32BE(compressed.length, 0);
    const idatType = Buffer.from('IDAT', 'binary');
    const idatCrc = Buffer.alloc(4);
    idatCrc.writeUInt32BE(crc32(Buffer.concat([idatType, compressed])), 0);

    const iend = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);

    const png = Buffer.concat([
      header,
      ihdrLen, ihdrType, ihdrData, ihdrCrc,
      idatLen, idatType, compressed, idatCrc,
      iend
    ]);

    const targetPath = path.resolve(__dirname, `../public/icons/icon${width}.png`);
    fs.writeFileSync(targetPath, png);
    console.log(`Generated ${targetPath}`);
  });
}

createPngBuffer(16, 16);
createPngBuffer(48, 48);
createPngBuffer(128, 128);
