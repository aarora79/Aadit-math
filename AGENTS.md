# Working on this repo

This is a static study site for a middle-school MATHCOUNTS student. GitHub Pages publishes the `docs/` folder on `main`. There is no framework and no build step for the site itself: every page is hand-written HTML with one shared stylesheet per folder.

## Rules

- Write for an average 8th grader. Make every page as simple as possible: short sentences, plain words, one idea per step, and no skipped arithmetic. If a step needs a picture to make sense, draw one.
- Check every answer with a quick script before publishing. A wrong answer here does real harm.
- No em-dashes and no emojis anywhere. Use a colon, a comma or two sentences instead.
- Write special characters as HTML entities (`&minus;`, `&times;`, `&deg;`, `&radic;`, `&sup2;`). The locked solutions page requires ASCII-only source.
- Keep links relative so the site works both from `file://` and on GitHub Pages.
- Every geometry solution shows figures, drawn as inline SVG inside the solution steps:
  - Label every side of every shape, including sides that repeat. A rectangle split into pieces gets its widths on both the top and the bottom and its heights on both the left and the right.
  - Use the same letters the steps use (`w`, `4w`, `h`, `k`, `a`, `c`). Mark a side that is still unknown with `?`.
  - Show each length as a dimension line beside its side, with an arrowhead at both ends and the label next to the line. Draw one arrowed line per piece, so a width of 4w and a width of w get separate arrows that meet at the dividing line.
  - Write each piece's area rule inside it (for example `4w &times; h`) under its value.
  - Mark right angles with a small square, and mark the given angles.
  - Draw a setup figure with the unknowns, then a second figure once they are found, with the values filled in.
  - Wrap each one as `<div class="figure">...<p class="figcap">caption</p></div>`. The caption says in plain words what the labels mean, and says "Not to scale" when it is not.
  - This applies to problem set pages, their print copies and the question bank solutions.

## Adding a problem set

1. Create `docs/problem-set-N/` and copy `style.css` and `print/print.css` from the newest set.
2. Write `index.html` with one concept card per problem. Each card links to its solution page.
3. Write `refresher.html`, the page the student reads before the problems. It teaches each idea the problems rely on, starting from the basics, with a table at the top that maps each idea to the problems that use it. Each idea gets an `<h2>`, one `.card` (numbered `R1`, `R2`, ...) with a short explanation and a worked example, then a "Check yourself" question with its answer in a collapsed `<details class="reveal">` whose summary is `Show the answer`. Check every answer with a script. Link it from the top of `index.html` as `Start here` (a `.golink` button), from every pager as `Refresher`, and from problem 1's back link. Add it to `print/index.html` too.
4. Write one solution page per problem, `0X-topic.html`, matching the existing ones. In order: `.problem` (the question), then three collapsed `<details class="reveal">` sections: `Hint 1` holding the concept `.card`, `Hint 2` holding one paragraph, and `Step-by-step solution` holding `<h2>Step by step</h2>`, `.steps`, `.answer` and `.watch`. They start closed and need no script.
5. Make the print pages by stripping the nav from each solution page and the refresher, then remove the `<details>` and `<summary>` wrappers so the print copy shows everything:

   ```bash
   cd docs/problem-set-N
   for f in 0*.html refresher.html; do
     sed -e '/<nav class="pager">/,/<\/nav>/d' -e '/<div class="prevnext">/,/<\/div>/d' \
         -e '/<summary>Hint 2<\/summary>/,/<\/details>/d' \
         -e 's#<summary>Show the answer</summary>#<p><strong>Answer:</strong></p>#' \
         -e '/<details class="reveal">/d' -e '/<summary>/d' -e '/<\/details>/d' \
         -e 's/style.css?v=4/print.css/' -e 's/<title>/<title>A4 print: /' "$f" > "print/$f"
   done
   ```

   Fix any `src="images/..."` paths in `print/` to `../images/...`. Then write `print/cards.html` (all cards on one sheet) and `print/index.html`.
6. Add a card for the new set to `docs/index.html`.
7. Add one new practice question per problem to the question bank (below).

## Concept toolbox

The home page has a "Concept toolbox" section of quick concept cards, one idea each, that are not tied to a problem set. Each card lives in `docs/concepts/`.

1. Write `docs/concepts/topic-name.html`. Start with a `.card` holding the quick summary, then build the idea up from the basics in short numbered `<h2>` sections, with worked examples and figures where they help. End with "Check yourself" questions whose answers sit in `<details class="reveal">` with the summary `Show the answer`. Check every answer with a script.
2. Link to the problem set pages that use the idea.
3. Make the print copy in `docs/concepts/print/` with the same `sed` command as the problem sets, plus `-e '/A4 print version/d'`. Then change links to `../problem-set-...` into `../../problem-set-...`.
4. Add a card for it to the toolbox grid in `docs/index.html`, numbered `C1`, `C2`, and so on.

Formulas with a fraction use `<div class="formula">` with `<span class="frac"><span class="top">...</span><span class="bottom">...</span></span>`. Those styles are in `docs/concepts/style.css`, and also in `docs/problem-set-1/style.css`, which the home page uses.

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
