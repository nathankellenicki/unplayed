const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const typogr = require('typogr');
const mustache = require('mustache');

function formatText(str) {
  return str.replace(/\(([^)]+)\)/g, '<span>$1</span>');
}

function processMarkdown(content) {
  const withTypography = typogr(content).chain().smartypants().amp().initQuotes().value();
  const htmlContent = marked(withTypography, {
    mangle: false,
    headerIds: false
  });
  return formatText(htmlContent);
}

async function build() {
  try {
    console.log('Building...');

    // Create dist directory if it doesn't exist
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Read all markdown files
    const unplayedContent = fs.readFileSync(path.join(__dirname, 'data', 'unplayed.markdown'), 'utf8');
    const unbeatenContent = fs.readFileSync(path.join(__dirname, 'data', 'unbeaten.markdown'), 'utf8');
    const beatenContent = fs.readFileSync(path.join(__dirname, 'data', 'beaten.markdown'), 'utf8');
    const abandonedContent = fs.readFileSync(path.join(__dirname, 'data', 'abandoned.markdown'), 'utf8');

    // Process markdown content
    const processedUnplayed = processMarkdown(unplayedContent);
    const processedUnbeaten = processMarkdown(unbeatenContent);
    const processedBeaten = processMarkdown(beatenContent);
    const processedAbandoned = processMarkdown(abandonedContent);

    // Read the template
    const templateContent = fs.readFileSync(path.join(__dirname, 'views', 'index.mustache'), 'utf8');

    // Render template with processed content
    const html = mustache.render(templateContent, {
      unplayed: processedUnplayed,
      unbeaten: processedUnbeaten,
      beaten: processedBeaten,
      abandoned: processedAbandoned
    });

    // Write the generated HTML to dist/index.html
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');

    console.log('Built successfully! Output: dist/index.html');
  } catch (error) {
    console.error('Error building:', error);
    process.exit(1);
  }
}

build();
