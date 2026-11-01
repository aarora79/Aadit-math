# Aadit math

Study pages for MATHCOUNTS practice, published with GitHub Pages at https://aarora79.github.io/Aadit-math/.

Each problem set takes the problems from one worksheet and turns each problem into a concept card and a worked solution. A problem page opens with only the question. The reader can ask for a first hint, then a second hint, then the step-by-step solution.

The question bank has one new practice question for every problem type in the sets. Its hints and solutions sit on a separate page that asks for a password.

## Layout

| Path | What it holds |
|------|---------------|
| `docs/` | The published site. GitHub Pages serves this folder from `main`. |
| `docs/problem-set-N/` | One worksheet: `index.html` holds the cards, `0X-*.html` the solution pages, `print/` the A4 versions. |
| `docs/question-bank/` | Practice questions and the locked solutions page. |
| `docs/hints.js` | Reveals hint 1, hint 2 and the solution one click at a time. |
| `tools/build_solutions.py` | Builds the locked solutions page from `private/solutions-content.html`, which is not committed. |

## Viewing locally

The pages are plain HTML with no build step. Open `docs/index.html` in a browser.

## Adding to the site

See [AGENTS.md](AGENTS.md) for how to add a problem set or new question bank entries.
