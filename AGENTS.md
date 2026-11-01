# Working on this repo

This is a static study site for a middle-school MATHCOUNTS student. GitHub Pages publishes the `docs/` folder on `main`. There is no framework and no build step for the site itself: every page is hand-written HTML with one shared stylesheet per folder.

## Rules

- Readers are middle-school students. Use short sentences and plain words, and explain every step. Do not skip arithmetic.
- Check every answer with a quick script before publishing. A wrong answer here does real harm.
- No em-dashes and no emojis anywhere. Use a colon, a comma or two sentences instead.
- Write special characters as HTML entities (`&minus;`, `&times;`, `&deg;`, `&radic;`, `&sup2;`). The locked solutions page requires ASCII-only source.
- Keep links relative so the site works both from `file://` and on GitHub Pages.

## Adding a problem set

1. Create `docs/problem-set-N/` and copy `style.css` and `print/print.css` from the newest set.
2. Write `index.html` with one concept card per problem. Each card links to its solution page.
3. Write one solution page per problem, `0X-topic.html`, matching the existing ones. In order: `.problem` (the question), then three collapsed `<details class="reveal">` sections: `Hint 1` holding the concept `.card`, `Hint 2` holding one paragraph, and `Step-by-step solution` holding `<h2>Step by step</h2>`, `.steps`, `.answer` and `.watch`. They start closed and need no script.
4. Make the print pages by stripping the nav from each solution page, then remove the `<details>` and `<summary>` wrappers so the print copy shows everything:

   ```bash
   cd docs/problem-set-N
   for f in 0*.html; do
     sed -e '/<nav class="pager">/,/<\/nav>/d' -e '/<div class="prevnext">/,/<\/div>/d' \
         -e 's/style.css/print.css/' -e 's/<title>/<title>A4 print: /' "$f" > "print/$f"
   done
   ```

   Fix any `src="images/..."` paths in `print/` to `../images/...`. Then write `print/cards.html` (all cards on one sheet) and `print/index.html`.
5. Add a card for the new set to `docs/index.html`.
6. Add one new practice question per problem to the question bank (below).

## Question bank

- `docs/question-bank/index.html` lists the practice questions. It is plain HTML.
- `docs/question-bank/solutions.html` is generated. Do not edit it by hand.
- The source of the solutions is `private/solutions-content.html`. It is git-ignored so the solutions are not readable on GitHub. Edit it, then rebuild:

  ```bash
  python3 tools/build_solutions.py
  ```

- The page stores the password and the content as base64. This keeps the answers out of casual sight. Anyone who reads the page source and decodes the base64 can still get past it, so treat it as a speed bump.
- If `private/` is lost, recover it by decoding `CONTENT_B64` from `solutions.html`.

## Checking before you push

- Open each new page in a browser. Click through hint 1, hint 2 and the solution.
- Check that every relative link resolves.
- After pushing, wait for the Pages build (`gh api repos/aarora79/Aadit-math/pages/builds/latest`) and load the live URL.
