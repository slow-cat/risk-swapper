// ==UserScript==
// @name         Annoying Image Swapper
// @namespace    https://github.com/slow-cat/risk-swapper
// @version      0.2
// @description  Highlight two image buttons in blue, then swap them periodically
// @author       slow-cat
// @match        https://gakunin.ealps.shinshu-u.ac.jp/idp/Authn/External?conversation=*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const SWAP_INTERVAL_MS = 4000;
  const HIGHLIGHT_MS = 900;
  const OUTLINE_STYLE = '';'3px solid #0066ff';

  function pickTwo(buttons) {
    if (buttons.length < 2) return null;
    const i = Math.floor(Math.random() * buttons.length);
    let j = i;
    while (j === i) j = Math.floor(Math.random() * buttons.length);
    return [buttons[i], buttons[j]];
  }

  function swapImageAndOnclick(a, b) {
    const imgA = a.style.backgroundImage;
    const imgB = b.style.backgroundImage;
    const bgcA = a.style.backgroundColor;
    const bgcB = b.style.backgroundColor;
    const clickA = a.getAttribute('onclick');
    const clickB = b.getAttribute('onclick');
    const idA = a.getAttribute('id');
    const idB = b.getAttribute('id');

    a.style.backgroundImage = imgB;
    b.style.backgroundImage = imgA;

    a.style.backgroundColor = bgcB;
    b.style.backgroundColor = bgcA;

    if (clickB === null) a.removeAttribute('onclick');
    else a.setAttribute('onclick', clickB);

    if (clickA === null) b.removeAttribute('onclick');
    else b.setAttribute('onclick', clickA);

    if (idB === null) a.removeAttribute('id');
    else a.setAttribute('id', idB);

    if (idA === null) b.removeAttribute('id');
    else b.setAttribute('id', idA);
  }
  function runOnce() {
    const buttons = [...document.querySelectorAll('#imatrix_div .input_imgdiv_class')];
    const pair = pickTwo(buttons);
    if (!pair) return;

    const [a, b] = pair;
    a.style.outline = OUTLINE_STYLE;
    b.style.outline = OUTLINE_STYLE;
    a.style.backgroundColor = 'blue';
    b.style.backgroundColor = 'blue';

    setTimeout(() => {
      swapImageAndOnclick(a, b);
    a.style.backgroundColor = 'white';
    b.style.backgroundColor = 'white';
      a.style.outline = '';
      b.style.outline = '';
    }, HIGHLIGHT_MS);
  }

  function startWhenReady() {
    const t = setInterval(() => {
      const count = document.querySelectorAll('#imatrix_div .input_imgdiv_class').length;
      if (count >= 2) {
        clearInterval(t);
        setInterval(runOnce, SWAP_INTERVAL_MS);
      }
    }, 250);
  }

  startWhenReady();
})();
