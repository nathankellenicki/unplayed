# Unplayed

In 2011, [Shaun Inman](https://web.archive.org/web/20230317115925/https://shauninman.com/archive/2011/04/18/unplayed) shared Unplayed — a single PHP file that loaded markdown files and displayed them as a simple, clean website. It was extremely simple - PHP includes, markdown files, and nothing more.

But time moves on. PHP hosting has become more expensive and harder to find. For better or for worse modern web development has changed. The original Unplayed needed a refresh to work in today's world.

This version brings Unplayed into the modern era while preserving everything that made the original great. Instead of PHP, it uses Node.js to process the same markdown files and generate a static HTML file. The styling is identical. The structure is the same. But now it builds to a single HTML file that can be hosted anywhere, for free.

## How It Works

Unplayed is simple:

* **Markdown files** in the `data/` directory contain your game lists (`unplayed.markdown`, `unbeaten.markdown`, `beaten.markdown`, `abandoned.markdown`)
* **A build script** (`build.js`) processes these markdown files and renders them into a single HTML page using a Mustache template
* **The template** (`views/index.mustache`) contains the original styling and layout, faithfully recreated
* **The output** is a single `dist/index.html` file ready to be hosted anywhere

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/nathankellenicki/unplayed.git
   cd unplayed
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. **Edit your game lists** — Update the markdown files in the `data/` directory:
   - `unplayed.markdown` — Games you want to play
   - `unbeaten.markdown` — Games you're currently playing
   - `beaten.markdown` — Games you've finished
   - `abandoned.markdown` — Games you've given up on

2. **Build the site**:
   ```bash
   npm run build
   ```

3. **Deploy** — The generated `dist/index.html` file can be uploaded to any web host, or served locally by opening it in your browser.

### Markdown Format

Each file follows a simple structure:

```markdown
A description of this category.

- Game Title (Platform) (Optional notes about the game)
- Another Game (Platform)
```

Anything in parentheses after a game title becomes a subtle annotation. Notes are placed on the next line.

## Why Static?

The original PHP version was perfect for its time, but hosting static files is simpler, cheaper, and more reliable today. This version maintains the same philosophy — a personal list that's easy to maintain — while making it trivial to host on GitHub Pages, Netlify, Vercel, or any other static hosting service.

No databases, no user accounts, no tracking, no recommendations. Just your games, your notes, and a clean way to view them.

## License

MIT