// Reveal a problem page one stage at a time: hint 1, hint 2, then the full solution.
// Without this script every section is visible, so the page still works on its own.
(function () {
  var hint1Label = document.getElementById("hint-1-label");
  var hint1Card = document.querySelector(".wrap > .card");
  var hint2 = document.getElementById("hint-2");
  var heading = document.querySelector(".wrap > h2");
  if (!hint1Label || !hint1Card || !hint2 || !heading) {
    return;
  }

  var solutionParts = [heading];
  var selectors = [".wrap > .steps", ".wrap > .answer", ".wrap > .watch"];
  for (var i = 0; i < selectors.length; i++) {
    var part = document.querySelector(selectors[i]);
    if (part) {
      solutionParts.push(part);
    }
  }

  var stages = [
    { label: "Show hint 1", parts: [hint1Label, hint1Card] },
    { label: "Show hint 2", parts: [hint2] },
    { label: "Show the step-by-step solution", parts: solutionParts }
  ];

  function setHidden(parts, hidden) {
    for (var j = 0; j < parts.length; j++) {
      parts[j].classList.toggle("is-hidden", hidden);
    }
  }

  for (var s = 0; s < stages.length; s++) {
    setHidden(stages[s].parts, true);
  }

  var bar = document.createElement("div");
  bar.className = "hintbar";
  var nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "next";
  var skipButton = document.createElement("button");
  skipButton.type = "button";
  skipButton.className = "skip";
  skipButton.textContent = "Skip to the solution";
  bar.appendChild(nextButton);
  bar.appendChild(skipButton);
  heading.parentNode.insertBefore(bar, heading);

  var stage = 0;
  nextButton.textContent = stages[stage].label;

  nextButton.addEventListener("click", function () {
    setHidden(stages[stage].parts, false);
    stage = stage + 1;
    if (stage === stages.length) {
      bar.remove();
      return;
    }
    nextButton.textContent = stages[stage].label;
    if (stage === stages.length - 1) {
      skipButton.remove();
    }
  });

  skipButton.addEventListener("click", function () {
    for (var k = 0; k < stages.length; k++) {
      setHidden(stages[k].parts, false);
    }
    bar.remove();
  });
})();
