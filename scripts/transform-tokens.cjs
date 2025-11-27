#!/usr/bin/env node

/**
 * Figma Tokens to CSS Transformer
 *
 * Converts figmaToken.json to CSS custom properties in tokens/color.css
 * Used by GitHub Actions to automate design token synchronization
 */

const fs = require('fs');
const path = require('path');

const TOKENS_FILE = path.join(__dirname, '../figmaToken.json');
const TOKENS_DIR = path.join(__dirname, '../packages/after/src/tokens');
const COLOR_CSS_FILE = path.join(TOKENS_DIR, 'color.css');

// Token type to CSS comment mapping (only colors)
const TOKEN_CATEGORIES = {
  'color-primary': 'Colors - Primary',
  'color-secondary': 'Colors - Secondary',
  'color-success': 'Colors - Success',
  'color-danger': 'Colors - Danger',
  'color-warning': 'Colors - Warning',
  'color-info': 'Colors - Info',
  'color-gray': 'Colors - Gray',
  'color-white': 'Colors - White',
};

/**
 * Categorize token by its name prefix
 */
function categorizeToken(tokenName) {
  const name = tokenName.replace('--', '');
  for (const [prefix, category] of Object.entries(TOKEN_CATEGORIES)) {
    if (name.startsWith(prefix)) {
      return category;
    }
  }
  return 'Other';
}

/**
 * Read and parse figmaToken.json
 */
function readTokens() {
  try {
    const content = fs.readFileSync(TOKENS_FILE, 'utf8');
    const tokens = JSON.parse(content);
    return tokens.global || {};
  } catch (error) {
    console.error('❌ Error reading tokens file:', error.message);
    process.exit(1);
  }
}

/**
 * Group tokens by category (filter only color tokens)
 */
function groupTokens(tokens) {
  const grouped = {};

  for (const [name, token] of Object.entries(tokens)) {
    // Only process color tokens
    if (!name.startsWith('--color-')) {
      continue;
    }

    const category = categorizeToken(name);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({ name, ...token });
  }

  return grouped;
}

/**
 * Parse existing @theme block from color.css to preserve non-Figma tokens
 */
function parseExistingTheme() {
  try {
    if (!fs.existsSync(COLOR_CSS_FILE)) {
      return {};
    }

    const content = fs.readFileSync(COLOR_CSS_FILE, 'utf8');
    const themeMatch = content.match(/@theme\s*\{([^}]*)\}/s);

    if (!themeMatch) {
      return {};
    }

    const themeContent = themeMatch[1];
    const tokens = {};
    let currentCategory = 'Other';

    // Parse line by line
    const lines = themeContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();

      // Check for category comment
      if (trimmed.startsWith('/* ') && trimmed.endsWith(' */')) {
        currentCategory = trimmed.slice(3, -3).trim();
        continue;
      }

      // Parse token: --name: value;
      const tokenMatch = trimmed.match(/^(--[\w-]+):\s*(.+?);$/);
      if (tokenMatch) {
        const [, name, value] = tokenMatch;
        if (!tokens[currentCategory]) {
          tokens[currentCategory] = [];
        }
        tokens[currentCategory].push({ name, value, type: 'existing' });
      }
    }

    return tokens;
  } catch (error) {
    console.warn('⚠️  Could not parse existing theme, starting fresh');
    return {};
  }
}

/**
 * Merge Figma tokens with existing tokens (Figma tokens take precedence)
 */
function mergeTokens(existingTokens, newTokens) {
  const merged = { ...existingTokens };

  // Add or update with new Figma tokens
  for (const [category, tokens] of Object.entries(newTokens)) {
    if (!merged[category]) {
      merged[category] = [];
    }

    // Create a map of existing token names in this category
    const existingNames = new Set(
      merged[category].map(t => t.name)
    );

    // Update existing or add new tokens
    for (const newToken of tokens) {
      const existingIndex = merged[category].findIndex(t => t.name === newToken.name);

      if (existingIndex !== -1) {
        // Update existing token
        merged[category][existingIndex] = { ...newToken, type: 'figma' };
      } else {
        // Add new token
        merged[category].push({ ...newToken, type: 'figma' });
      }
    }
  }

  return merged;
}

/**
 * Generate @theme block CSS content for colors
 */
function generateThemeCSS(groupedTokens) {
  const lines = ['@theme {'];

  // Define category order (colors only)
  const categoryOrder = [
    'Colors - Primary',
    'Colors - Secondary',
    'Colors - Success',
    'Colors - Danger',
    'Colors - Warning',
    'Colors - Info',
    'Colors - Gray',
    'Colors - White',
    'Other'
  ];

  for (const category of categoryOrder) {
    const tokens = groupedTokens[category];
    if (!tokens || tokens.length === 0) continue;

    lines.push(`\t/* ${category} */`);

    for (const token of tokens) {
      lines.push(`\t${token.name}: ${token.value};`);
    }
    lines.push('');
  }

  lines.push('}');

  return lines.join('\n');
}

/**
 * Write color tokens to color.css file
 */
function updateCSS(newThemeBlock) {
  try {
    // Ensure tokens directory exists
    if (!fs.existsSync(TOKENS_DIR)) {
      fs.mkdirSync(TOKENS_DIR, { recursive: true });
      console.log('✅ Created tokens directory');
    }

    let content = '';

    if (fs.existsSync(COLOR_CSS_FILE)) {
      content = fs.readFileSync(COLOR_CSS_FILE, 'utf8');
    }

    // Find @theme block using regex
    const themeRegex = /@theme\s*\{[^}]*\}/s;

    if (themeRegex.test(content)) {
      // Replace existing @theme block
      content = content.replace(themeRegex, newThemeBlock);
      console.log('✅ Updated existing @theme block in color.css');
    } else {
      // Create new file with @theme block
      content = newThemeBlock + '\n';
      console.log('✅ Created new color.css with @theme block');
    }

    fs.writeFileSync(COLOR_CSS_FILE, content, 'utf8');
    console.log('✅ color.css file updated successfully');

  } catch (error) {
    console.error('❌ Error updating color.css file:', error.message);
    process.exit(1);
  }
}

/**
 * Generate summary of changes
 */
function generateSummary(groupedTokens) {
  const totalTokens = Object.values(groupedTokens).reduce(
    (sum, tokens) => sum + tokens.length,
    0
  );

  console.log('\n📊 Token Transformation Summary:');
  console.log(`   Total tokens: ${totalTokens}`);

  for (const [category, tokens] of Object.entries(groupedTokens)) {
    if (tokens.length > 0) {
      console.log(`   - ${category}: ${tokens.length}`);
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 Starting Figma Token Transformation...\n');

  // Check if tokens file exists
  if (!fs.existsSync(TOKENS_FILE)) {
    console.error(`❌ Token file not found: ${TOKENS_FILE}`);
    process.exit(1);
  }

  // Parse existing tokens from color.css
  const existingTokens = parseExistingTheme();
  console.log(`📖 Found ${Object.values(existingTokens).flat().length} existing color tokens in color.css`);

  // Read and process new Figma tokens
  const newTokens = readTokens();
  console.log(`📥 Read ${Object.keys(newTokens).length} tokens from figmaToken.json`);

  const groupedNewTokens = groupTokens(newTokens);
  const colorTokenCount = Object.values(groupedNewTokens).flat().length;
  console.log(`🎨 Filtered ${colorTokenCount} color tokens`);

  // Merge existing with new tokens (new tokens take precedence)
  const mergedTokens = mergeTokens(existingTokens, groupedNewTokens);
  console.log(`🔄 Merged into ${Object.values(mergedTokens).flat().length} total color tokens`);

  const themeCSS = generateThemeCSS(mergedTokens);

  // Update color.css file
  updateCSS(themeCSS);

  // Print summary
  generateSummary(mergedTokens);

  console.log('\n✨ Transformation complete!\n');
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { readTokens, groupTokens, generateThemeCSS };
