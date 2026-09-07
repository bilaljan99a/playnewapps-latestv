#!/usr/bin/env node

/**
 * PlayNewApps Amazon Auto-Listing CLI Tool
 * Usage:
 *   node scripts/amazon-auto-list.js <asin_or_url> [--tag=your-tag-20] [--category=tech] [--badge="Best Seller"]
 *   node scripts/amazon-auto-list.js --batch=asins.txt
 */

const fs = require('fs');
const path = require('path');
const { fetchAmazonProduct, saveProduct, extractAsin } = require('../services/amazon-scraper');

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
======================================================
  PlayNewApps Amazon Auto-Listing CLI Tool
======================================================
Usage:
  node scripts/amazon-auto-list.js <asin_or_url> [options]

Options:
  --tag=<tag>         Amazon Associate Tracking Tag (default: process.env.AMAZON_ASSOCIATE_TAG)
  --category=<slug>   Category slug (tech, gaming, lifestyle)
  --badge=<text>      Badge text (e.g., "Prime Deal", "Top Rated", "#1 Best Seller")
  --batch=<file>      Path to text file containing ASINs/URLs (one per line)
  --dry-run           Fetch and print product without saving to database

Examples:
  node scripts/amazon-auto-list.js B09B8V1LZ3
  node scripts/amazon-auto-list.js "https://www.amazon.com/dp/B08N5WRWNW" --badge="Editor's Choice"
  node scripts/amazon-auto-list.js --batch=my-amazon-links.txt
======================================================
`);
    process.exit(0);
  }

  // Parse arguments
  let target = '';
  let customTag = process.env.AMAZON_ASSOCIATE_TAG || '';
  let customBadge = '';
  let customCategory = '';
  let batchFile = '';
  let isDryRun = false;

  for (const arg of args) {
    if (arg.startsWith('--tag=')) {
      customTag = arg.replace('--tag=', '').trim();
    } else if (arg.startsWith('--badge=')) {
      customBadge = arg.replace('--badge=', '').trim();
    } else if (arg.startsWith('--category=')) {
      customCategory = arg.replace('--category=', '').trim();
    } else if (arg.startsWith('--batch=')) {
      batchFile = arg.replace('--batch=', '').trim();
    } else if (arg === '--dry-run') {
      isDryRun = true;
    } else if (!arg.startsWith('--') && !target) {
      target = arg;
    }
  }

  const itemsToProcess = [];

  if (batchFile) {
    const filePath = path.resolve(process.cwd(), batchFile);
    if (!fs.existsSync(filePath)) {
      console.error(`Error: Batch file not found at ${filePath}`);
      process.exit(1);
    }
    const lines = fs.readFileSync(filePath, 'utf8')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));
    itemsToProcess.push(...lines);
    console.log(`[BATCH] Loaded ${itemsToProcess.length} items from ${batchFile}`);
  } else if (target) {
    itemsToProcess.push(target);
  } else {
    console.error('Error: Please specify an Amazon product URL or ASIN, or use --batch=<file>');
    process.exit(1);
  }

  console.log(`[AMAZON] Processing ${itemsToProcess.length} product(s)...`);

  let successCount = 0;

  for (let i = 0; i < itemsToProcess.length; i++) {
    const item = itemsToProcess[i];
    console.log(`\n[${i + 1}/${itemsToProcess.length}] Fetching: ${item}`);

    try {
      const product = await fetchAmazonProduct(item, customTag);
      if (customBadge) product.badge = customBadge;
      if (customCategory) {
        product.categorySlug = customCategory;
        product.category = customCategory.charAt(0).toUpperCase() + customCategory.slice(1);
      }

      console.log(`  ✓ Title:     ${product.title}`);
      console.log(`  ✓ Price:     ${product.salePrice} (List: ${product.originalPrice || 'N/A'})`);
      console.log(`  ✓ Rating:    ${product.rating}★ (${product.reviewsCount} reviews)`);
      console.log(`  ✓ Affiliate: ${product.affiliateUrl}`);

      if (!isDryRun) {
        const result = await saveProduct(product);
        console.log(`  ✓ Status:    Saved to data/products.json (${result.isUpdate ? 'Updated' : 'Created'})`);
        successCount++;
      } else {
        console.log(`  ✓ Status:    Dry run (not saved)`);
      }
    } catch (err) {
      console.error(`  ✗ Failed:    ${err.message}`);
    }
  }

  console.log(`\n[COMPLETE] Successfully processed ${successCount}/${itemsToProcess.length} product(s).`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
