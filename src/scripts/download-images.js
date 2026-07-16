const fs = require('fs');
const path = require('path');
const https = require('https');

// Define directories to create
const dirs = [
  path.join(__dirname, '../../public/images/products'),
  path.join(__dirname, '../../public/images/categories'),
  path.join(__dirname, '../../public/images/avatars'),
  path.join(__dirname, '../../public/images/hero'),
];

// Ensure directories exist
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Curated high-quality Unsplash image IDs
const productImages = {
  // Men (1 - 11)
  1: "photo-1507679799987-c73779587ccf",
  2: "photo-1617137968427-85924c800a22",
  3: "photo-1501196354995-cbb51c65aaea",
  4: "photo-1624378439575-d8705ad7ae80",
  5: "photo-1576995853123-5a10305d93c0",
  6: "photo-1550246140-5119ae4790b8",
  7: "photo-1581655353564-df123a1eb820",
  8: "photo-1517462964-21fdcec3f25b",
  9: "photo-1531310197839-ccf54624b097",
  10: "photo-1614975058789-41316d0e2e9c",
  11: "photo-1488161628813-04466f872be2",
  // Women (12 - 22)
  12: "photo-1515886657613-9f3515b0c78f",
  13: "photo-1548624149-f9b1859aa7d0",
  14: "photo-1541099649105-f69ad21f3246",
  15: "photo-1610030469983-98e550d6193c",
  16: "photo-1609357605129-26f69add5d6e",
  17: "photo-1583391733956-3750e0ff4e8b",
  18: "photo-1601924994987-69e26d50dc26",
  19: "photo-1516762689617-e1cffcef479d",
  20: "photo-1562273138-f46be4ebdf33",
  21: "photo-1506152983158-b4a74a01c721",
  22: "photo-1598554747436-c9293d6a588f",
  // Kids (23 - 33)
  23: "photo-1519238263530-99bdd11df2ea",
  24: "photo-1607990283143-e81e7a2c93ab",
  25: "photo-1518831959646-742c3a14ebf7",
  26: "photo-1602030028438-4cf153cabb9e",
  27: "photo-1596495578065-6e0763fa1141",
  28: "photo-1519452635265-7b1fbfd1e4e0",
  29: "photo-1540555700478-4be289fbecef",
  30: "photo-1604917621956-10dfa7cce2e7",
  31: "photo-1503919545889-aef636e10ad4",
  32: "photo-1513551573338-10777517767c",
  33: "photo-1516627145497-ae6968895b74"
};

const categoryImages = {
  men: "photo-1492562080023-ab3db95bfbce",
  women: "photo-1494790108377-be9c29b29330",
  kids: "photo-1607990283143-e81e7a2c93ab"
};

const avatarImages = [
  "photo-1500648767791-00dcc994a43e",
  "photo-1534528741775-53994a69daeb",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1494790108377-be9c29b29330",
  "photo-1539571696357-5a69c17a67c6",
  "photo-1544005313-94ddf0286df2"
];

const heroImage = "photo-1483985988355-763728e1935b";

// Helper function to download an image from Unsplash
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch image: Status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

// Download list sequentially to prevent rate limits
async function startDownloads() {
  console.log("Starting image downloads...");

  // 1. Download Product Images
  for (const [id, photoId] of Object.entries(productImages)) {
    const url = `https://images.unsplash.com/${photoId}?w=600&auto=format&fit=crop&q=80`;
    const dest = path.join(__dirname, `../../public/images/products/product-${id}.jpg`);
    try {
      console.log(`Downloading product ${id} main image...`);
      await downloadImage(url, dest);
      
      // Duplicate for gallery components
      const g1Dest = path.join(__dirname, `../../public/images/products/product-${id}-g1.jpg`);
      const g2Dest = path.join(__dirname, `../../public/images/products/product-${id}-g2.jpg`);
      fs.copyFileSync(dest, g1Dest);
      fs.copyFileSync(dest, g2Dest);
    } catch (err) {
      console.error(`Error downloading product ${id}: ${err.message}`);
    }
  }

  // 2. Download Category Images
  for (const [name, photoId] of Object.entries(categoryImages)) {
    const url = `https://images.unsplash.com/${photoId}?w=600&auto=format&fit=crop&q=80`;
    const dest = path.join(__dirname, `../../public/images/categories/${name}.jpg`);
    try {
      console.log(`Downloading category ${name} image...`);
      await downloadImage(url, dest);
    } catch (err) {
      console.error(`Error downloading category ${name}: ${err.message}`);
    }
  }

  // 3. Download Avatar Images
  for (let i = 0; i < avatarImages.length; i++) {
    const url = `https://images.unsplash.com/${avatarImages[i]}?w=150&auto=format&fit=crop&q=80`;
    const dest = path.join(__dirname, `../../public/images/avatars/avatar-${i + 1}.jpg`);
    try {
      console.log(`Downloading avatar ${i + 1} image...`);
      await downloadImage(url, dest);
    } catch (err) {
      console.error(`Error downloading avatar ${i + 1}: ${err.message}`);
    }
  }

  // 4. Download Hero Image
  const heroUrl = `https://images.unsplash.com/${heroImage}?w=1600&auto=format&fit=crop&q=80`;
  const heroDest = path.join(__dirname, `../../public/images/hero/hero-lifestyle.jpg`);
  try {
    console.log(`Downloading hero image...`);
    await downloadImage(heroUrl, heroDest);
  } catch (err) {
    console.error(`Error downloading hero image: ${err.message}`);
  }

  console.log("All image downloads completed successfully!");
}

startDownloads();
