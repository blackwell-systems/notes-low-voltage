/* CR-67 Low Voltage practice quiz — vanilla JS, no build step. */
(() => {
  "use strict";

  const LETTERS = ["A", "B", "C", "D", "E", "F"];
  const STORE_KEY = "cr67_progress_v1";

  const state = {
    all: [],          // full question bank
    queue: [],        // active session order
    idx: 0,
    mode: "quiz",     // "quiz" | "flash"
    answered: {},     // sessionIndex -> chosenOptionIndex
    revealed: {},     // sessionIndex -> bool (flash mode / revealed)
  };

  // ---- Persistent store (missed set + seen set + session history) ----
  const store = loadStore();
  function loadStore() {
    let s;
    try { s = JSON.parse(localStorage.getItem(STORE_KEY)); } catch { s = null; }
    s = s || {};
    s.missed = s.missed || {};
    s.seen = s.seen || {};
    s.history = s.history || [];   // [{ts, correct, answered, pct}]
    s.flagged = s.flagged || {};   // {questionId: true} — "mark for later"
    return s;
  }
  function saveStore() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch {}
  }

  // ---- DOM ----
  const el = (id) => document.getElementById(id);
  const dom = {
    startScreen: el("start-screen"),
    quizScreen: el("quiz-screen"),
    resultsScreen: el("results-screen"),
    bankSummary: el("bank-summary"),
    startBtn: el("start-btn"),
    optShuffle: el("opt-shuffle"),
    optOnlyMissed: el("opt-onlymissed"),
    optOnlyFlagged: el("opt-onlyflagged"),
    optOnlyFlaggedLabel: el("opt-onlyflagged-label"),
    flagBtn: el("flag-btn"),
    resumeLine: el("resume-line"),
    modeQuiz: el("mode-quiz"),
    modeFlash: el("mode-flash"),
    progressFill: el("progress-fill"),
    qCounter: el("q-counter"),
    qId: el("q-id"),
    qText: el("q-text"),
    qMedia: el("q-media"),
    qMediaImg: el("q-media-img"),
    qOptions: el("q-options"),
    qExplanation: el("q-explanation"),
    qExplanationText: el("q-explanation-text"),
    qReferences: el("q-references"),
    prevBtn: el("prev-btn"),
    revealBtn: el("reveal-btn"),
    nextBtn: el("next-btn"),
    scoreLine: el("score-line"),
    scoreBreakdown: el("score-breakdown"),
    reviewMissedBtn: el("review-missed-btn"),
    restartBtn: el("restart-btn"),
    historyPanel: el("history-panel"),
    historyList: el("history-list"),
    historySummary: el("history-summary"),
    clearHistoryBtn: el("clear-history-btn"),
    exitBtn: el("exit-btn"),
    exportBtn: el("export-btn"),
    importBtn: el("import-btn"),
    importFile: el("import-file"),
    dataMsg: el("data-msg"),
  };

  // ---- Load bank ----
  fetch("questions.json")
    .then((r) => r.json())
    .then((data) => {
      state.all = (data.questions || data).filter(
        (q) => q && q.question && Array.isArray(q.options) && q.options.length >= 2 &&
               typeof q.answerIndex === "number" && q.answerIndex >= 0
      );
      const title = (data.meta && data.meta.title) || "CR-67 Low Voltage";
      dom.bankSummary.textContent = `${state.all.length} questions loaded.`;
      dom.startBtn.disabled = state.all.length === 0;
      document.title = `${title} — Practice Quiz`;
      renderMissedOption();
      renderHistory();
      renderFlaggedOption();
    })
    .catch((err) => {
      dom.bankSummary.textContent = "Could not load questions.json — is it deployed alongside index.html?";
      console.error(err);
    });

  // ---- Mode toggle ----
  dom.modeQuiz.addEventListener("click", () => setMode("quiz"));
  dom.modeFlash.addEventListener("click", () => setMode("flash"));
  function setMode(mode) {
    state.mode = mode;
    dom.modeQuiz.classList.toggle("active", mode === "quiz");
    dom.modeFlash.classList.toggle("active", mode === "flash");
    dom.modeQuiz.setAttribute("aria-selected", mode === "quiz");
    dom.modeFlash.setAttribute("aria-selected", mode === "flash");
    // If mid-session, re-render current card under new mode rules.
    if (!dom.quizScreen.classList.contains("hidden")) render();
  }

  // ---- Start ----
  dom.startBtn.addEventListener("click", startSession);
  dom.restartBtn.addEventListener("click", () => { renderHistory(); showScreen("start"); });
  dom.reviewMissedBtn.addEventListener("click", () => {
    dom.optOnlyMissed.checked = true;
    startSession();
  });
  dom.exitBtn.addEventListener("click", () => { renderHistory(); renderFlaggedOption(); showScreen("start"); });

  // ---- Mark for later (flag) ----
  dom.flagBtn.addEventListener("click", () => {
    const q = state.queue[state.idx];
    if (!q) return;
    if (store.flagged[q.id]) delete store.flagged[q.id];
    else store.flagged[q.id] = true;
    saveStore();
    updateFlagBtn(q);
  });

  function updateFlagBtn(q) {
    const on = !!store.flagged[q.id];
    dom.flagBtn.classList.toggle("on", on);
    dom.flagBtn.setAttribute("aria-pressed", on);
    dom.flagBtn.textContent = on ? "★ Marked" : "☆ Mark";
  }

  function renderFlaggedOption() {
    const n = Object.keys(store.flagged).length;
    if (n > 0) {
      dom.optOnlyFlaggedLabel.classList.remove("hidden");
      dom.optOnlyFlaggedLabel.querySelector("span").textContent =
        `Only questions I marked for later (${n})`;
    } else {
      dom.optOnlyFlaggedLabel.classList.add("hidden");
      dom.optOnlyFlagged.checked = false;
    }
  }
  dom.clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Clear your score history? (Your 'missed questions' list is kept.)")) {
      store.history = [];
      saveStore();
      renderHistory();
    }
  });

  function renderMissedOption() {
    const n = Object.keys(store.missed).length;
    if (n > 0) {
      dom.optOnlyMissed.parentElement.classList.remove("hidden");
      dom.resumeLine.textContent = `You have ${n} previously missed question${n === 1 ? "" : "s"}.`;
      dom.resumeLine.classList.remove("hidden");
    } else {
      dom.optOnlyMissed.parentElement.classList.add("hidden");
      dom.resumeLine.classList.add("hidden");
    }
  }

  // ---- Export / import progress ----
  dom.exportBtn.addEventListener("click", () => {
    const payload = {
      app: "cr67-low-voltage-quiz",
      version: 1,
      exportedAt: new Date().toISOString(),
      progress: {
        missed: store.missed,
        seen: store.seen,
        flagged: store.flagged,
        history: store.history,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cr67-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    flashMsg("Progress exported.");
  });

  dom.importBtn.addEventListener("click", () => dom.importFile.click());
  dom.importFile.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const p = data.progress || data;  // also accept a raw store object
        if (!p || typeof p !== "object" || !("missed" in p || "history" in p || "flagged" in p)) {
          throw new Error("unrecognized file");
        }
        const before = {
          m: Object.keys(store.missed).length,
          f: Object.keys(store.flagged).length,
          h: store.history.length,
        };
        // Merge, never overwrite: union the sets, concat + dedupe history by timestamp.
        Object.assign(store.missed, p.missed || {});
        Object.assign(store.seen, p.seen || {});
        Object.assign(store.flagged, p.flagged || {});
        const seenTs = new Set(store.history.map((r) => r.ts));
        (p.history || []).forEach((r) => {
          if (r && typeof r.ts === "number" && !seenTs.has(r.ts)) {
            store.history.push(r);
            seenTs.add(r.ts);
          }
        });
        store.history.sort((a, b) => a.ts - b.ts);
        if (store.history.length > 200) store.history = store.history.slice(-200);
        saveStore();
        renderMissedOption();
        renderHistory();
        renderFlaggedOption();
        const dM = Object.keys(store.missed).length - before.m;
        const dF = Object.keys(store.flagged).length - before.f;
        const dH = store.history.length - before.h;
        flashMsg(`Imported and merged: +${dH} sessions, +${dF} marked, +${dM} missed.`);
      } catch (err) {
        flashMsg("Import failed — that doesn't look like a valid progress file.");
      } finally {
        dom.importFile.value = "";  // let the same file be re-selected later
      }
    };
    reader.readAsText(file);
  });

  let msgTimer;
  function flashMsg(text) {
    dom.dataMsg.textContent = text;
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => { dom.dataMsg.textContent = ""; }, 6000);
  }

  // ---- Score history ----
  function renderHistory() {
    const h = store.history;
    if (!h.length) { dom.historyPanel.classList.add("hidden"); return; }
    dom.historyPanel.classList.remove("hidden");
    const pcts = h.map((r) => r.pct);
    const best = Math.max(...pcts);
    const avg = Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length);
    dom.historySummary.textContent = `${h.length} session${h.length === 1 ? "" : "s"} · best ${best}% · avg ${avg}%`;
    dom.historyList.innerHTML = "";
    h.slice().reverse().slice(0, 10).forEach((r) => {
      const li = document.createElement("li");
      const when = new Date(r.ts).toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
        " " + new Date(r.ts).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
      li.innerHTML = `<span class="h-score">${r.correct}/${r.answered}</span>` +
        `<span class="h-pct">${r.pct}%</span><span class="h-when">${when}</span>`;
      dom.historyList.appendChild(li);
    });
  }

  function startSession() {
    let pool = state.all.slice();
    if (dom.optOnlyFlagged.checked) {
      const flagged = pool.filter((q) => store.flagged[q.id]);
      if (flagged.length) pool = flagged;
    }
    if (dom.optOnlyMissed.checked) {
      const missed = pool.filter((q) => store.missed[q.id]);
      if (missed.length) pool = missed;
    }
    if (dom.optShuffle.checked) shuffle(pool);
    state.queue = pool;
    state.idx = 0;
    state.answered = {};
    state.revealed = {};
    showScreen("quiz");
    render();
  }

  // ---- Navigation ----
  dom.nextBtn.addEventListener("click", () => {
    if (state.idx >= state.queue.length - 1) return finish();
    state.idx++;
    render();
  });
  dom.prevBtn.addEventListener("click", () => {
    if (state.idx > 0) { state.idx--; render(); }
  });
  dom.revealBtn.addEventListener("click", () => {
    state.revealed[state.idx] = true;
    render();
  });

  document.addEventListener("keydown", (e) => {
    if (dom.quizScreen.classList.contains("hidden")) return;
    if (e.key === "ArrowRight") dom.nextBtn.click();
    else if (e.key === "ArrowLeft") dom.prevBtn.click();
    else if (e.key === " " && state.mode === "flash" && !state.revealed[state.idx]) {
      e.preventDefault();
      dom.revealBtn.click();
    } else if (["1", "2", "3", "4", "5", "6"].includes(e.key) && state.mode === "quiz") {
      const i = parseInt(e.key, 10) - 1;
      const q = state.queue[state.idx];
      if (q && i < q.options.length && state.answered[state.idx] === undefined) choose(i);
    }
  });

  // ---- Render current card ----
  function render() {
    const q = state.queue[state.idx];
    if (!q) return;
    const n = state.queue.length;

    dom.qCounter.textContent = `Question ${state.idx + 1} of ${n}`;
    dom.qId.textContent = q.id ? `ID ${q.id}` : "";
    dom.qText.textContent = q.question;
    updateFlagBtn(q);
    dom.progressFill.style.width = `${((state.idx + 1) / n) * 100}%`;

    // Media
    if (q.media) {
      dom.qMediaImg.src = q.media;
      dom.qMedia.classList.remove("hidden");
    } else {
      dom.qMedia.classList.add("hidden");
      dom.qMediaImg.removeAttribute("src");
    }

    const isFlash = state.mode === "flash";
    const chosen = state.answered[state.idx];
    const revealed = isFlash ? !!state.revealed[state.idx] : chosen !== undefined;

    // Options
    dom.qOptions.innerHTML = "";
    q.options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerHTML = `<span class="letter">${LETTERS[i]}</span><span>${escapeHtml(text)}</span>`;
      if (revealed) {
        btn.disabled = true;
        if (i === q.answerIndex) btn.classList.add(isFlash ? "reveal-correct" : "correct");
        else if (!isFlash && i === chosen) btn.classList.add("wrong");
      } else {
        if (isFlash) {
          btn.disabled = true; // flashcards reveal via button/space, not by clicking an option
        } else {
          btn.addEventListener("click", () => choose(i));
        }
      }
      dom.qOptions.appendChild(btn);
    });

    // Reveal button (flash mode only, before reveal)
    dom.revealBtn.classList.toggle("hidden", !(isFlash && !revealed));

    // Explanation
    if (revealed && (q.explanation || (q.references && q.references.length))) {
      dom.qExplanationText.textContent = q.explanation || "";
      dom.qExplanationText.style.display = q.explanation ? "" : "none";
      dom.qReferences.innerHTML = "";
      (q.references || []).forEach((ref) => {
        const chip = document.createElement("span");
        chip.className = "ref-chip";
        chip.textContent = ref;
        dom.qReferences.appendChild(chip);
      });
      dom.qExplanation.classList.remove("hidden");
    } else {
      dom.qExplanation.classList.add("hidden");
    }

    dom.prevBtn.disabled = state.idx === 0;
    dom.nextBtn.textContent = state.idx >= n - 1 ? "Finish" : "Next ›";
  }

  function choose(i) {
    if (state.answered[state.idx] !== undefined) return;
    state.answered[state.idx] = i;
    const q = state.queue[state.idx];
    store.seen[q.id] = true;
    if (i === q.answerIndex) {
      delete store.missed[q.id];
    } else {
      store.missed[q.id] = true;
    }
    saveStore();
    render();
  }

  // ---- Finish / results ----
  function finish() {
    let correct = 0, answered = 0;
    state.queue.forEach((q, i) => {
      if (state.answered[i] !== undefined) {
        answered++;
        if (state.answered[i] === q.answerIndex) correct++;
      }
    });
    if (state.mode === "flash" || answered === 0) {
      // Nothing scored in flashcard mode — just return to start.
      renderHistory();
      showScreen("start");
      return;
    }
    const pct = Math.round((correct / answered) * 100);
    // Log this session to persistent history.
    store.history.push({ ts: Date.now(), correct, answered, pct });
    if (store.history.length > 200) store.history = store.history.slice(-200);
    saveStore();

    dom.scoreLine.textContent = `${correct} / ${answered}  (${pct}%)`;
    const missedNow = Object.keys(store.missed).length;
    const best = Math.max(...store.history.map((r) => r.pct));
    dom.scoreBreakdown.textContent =
      `${answered} answered this session. Best: ${best}%. ` +
      `${missedNow} question${missedNow === 1 ? "" : "s"} still in your missed list.`;
    dom.reviewMissedBtn.classList.toggle("hidden", missedNow === 0);
    showScreen("results");
  }

  // ---- Screens ----
  function showScreen(name) {
    dom.startScreen.classList.toggle("hidden", name !== "start");
    dom.quizScreen.classList.toggle("hidden", name !== "quiz");
    dom.resultsScreen.classList.toggle("hidden", name !== "results");
    window.scrollTo(0, 0);
  }

  // ---- Utils ----
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
})();
