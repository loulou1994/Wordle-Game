"use strict";var guessedWord,guessWord,words=["raise","claim","blame","proud","broad"],regExprson=/^[A-Z]$/,tilesRow=1,tileBoxes=document.querySelector("#tiles1");randomWord(words.length),window.addEventListener("keydown",(function(e){var t=e.key.toLocaleUpperCase();tileBoxes&&("BACKSPACE"===t&&""!=tileBoxes.dataset.letters?removeLetter():tileBoxes.dataset.letters.length<5&&regExprson.test(t)?addLetter(t):5==tileBoxes.dataset.letters.length&&"ENTER"===t&&checkWord())}));var toggleBtn=document.querySelectorAll('.mode-toggle input[type="radio"]'),colorSchemeMedia=window.matchMedia("(prefers-color-scheme: dark)");function randomWord(e){guessWord=words[Math.floor(Math.random()*e)]}function removeLetter(){var e=tileBoxes.dataset.letters.length-1;tileBoxes.dataset.letters=tileBoxes.dataset.letters.slice(0,-1),tileBoxes.children[e].dataset.state="empty",tileBoxes.children[e].firstElementChild.textContent=""}function addLetter(e){var t=tileBoxes.dataset.letters.length;tileBoxes.children[t].firstElementChild.textContent=e,tileBoxes.dataset.letters+=e,tileBoxes.children[t].dataset.state="added",tileBoxes.children[t].classList.add("pop-in"),setTimeout((function(){tileBoxes.children[t].classList.remove("pop-in")}),105)}function checkWord(){for(var e=0;e<5;e++)rowLettersChecking(e,tileBoxes)}function returnState(e){var t=guessWord.toUpperCase(),o=tileBoxes.dataset.letters;return o[e]==t[e]?"found":t.indexOf(o[e])>-1?"misplaced":"absent"}function tileState(e,t){e.classList.add("flip-in"),setTimeout((function(){e.dataset.state=t,e.classList.remove("flip-in"),e.classList.add("flip-out")}),250),setTimeout((function(){return e.classList.remove("flip-out")}),1250)}function checkWin(e){guessWord.toUpperCase()===tileBoxes.dataset.letters?winMsg():tilesRow+1>6?(tileBoxes=null,setTimeout((function(){alert("You ran out of guesses. The correct answer was "+guessWord)}),1e3)):updateRow()}function rowLettersChecking(e,t){setTimeout((function(){tileState(t.children[e],returnState(e)),4==e&&checkWin()}),250*e)}function winMsg(){for(var e=function(e){setTimeout((function(){tileBoxes.children[e].classList.add("leap"),4==e&&(tileBoxes=null)}),250*e)},t=0;t<5;t++)e(t)}function updateRow(){++tilesRow,tileBoxes=document.querySelector("#tiles".concat(tilesRow))}toggleBtn.forEach((function(e){e.addEventListener("change",(function(e){"dark"==e.currentTarget.id?document.documentElement.classList.add("darkmode"):document.documentElement.classList.remove("darkmode")}))})),colorSchemeMedia.addEventListener("change",(function(e){var t=Array.prototype.find.call(toggleBtn,(function(e){return"dark"==e.id}));e.matches?(document.documentElement.classList.add("darkmode"),t.checked=!0):(document.documentElement.classList.remove("darkmode"),t.checked=!1)}));
//# sourceMappingURL=script.js.map