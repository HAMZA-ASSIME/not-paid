
    const btnAR = document.getElementById("btnAR");
    const btnFR = document.getElementById("btnFR");
    const btnENG = document.getElementById("btnENG");

    const divAR = document.getElementById("div_ar");
    const divFR = document.getElementById("div_fr");
    const divENG = document.getElementById("div_eng");

    const modalAR = new bootstrap.Modal(document.getElementById("modalAR"));
    const modalFR = new bootstrap.Modal(document.getElementById("modalFR"));
    const modalENG = new bootstrap.Modal(document.getElementById("modalENG"));

    const audioAR = document.getElementById("audioAR");
    const audioFR = document.getElementById("audioFR");
    const audioENG = document.getElementById("audioENG");

    const knifeLeft = document.getElementById("knifeLeft");
    const knifeRight = document.getElementById("knifeRight");

    // Keep track of current language to hide/show and stop audio
    let currentLang = null;

    function stopAllAudios() {
      [audioAR, audioFR, audioENG].forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      // Pause knife animation
      pauseKnifeAnimation();
    }

    function playKnifeAnimation() {
      knifeLeft.style.animationPlayState = "running";
      knifeRight.style.animationPlayState = "running";
    }

    function pauseKnifeAnimation() {
      knifeLeft.style.animationPlayState = "paused";
      knifeRight.style.animationPlayState = "paused";
    }

    function hideAllDivs() {
      [divAR, divFR, divENG].forEach((div) => {
        div.classList.remove("show");
      });
    }

    function hideAllModals() {
      modalAR.hide();
      modalFR.hide();
      modalENG.hide();
    }

    function openLang(lang) {
      if (currentLang === lang) return; // do nothing if same language

      stopAllAudios();
      hideAllDivs();
      hideAllModals();

      setTimeout(() => {
        switch (lang) {
          case "AR":
            divAR.classList.add("show");
            modalAR.show();
            document
              .getElementById("modalAR")
              .addEventListener(
                "shown.bs.modal",
                () => {
                  audioAR.play();
                  playKnifeAnimation();
                },
                { once: true }
              );
            break;
          case "FR":
            divFR.classList.add("show");
            modalFR.show();
            document
              .getElementById("modalFR")
              .addEventListener(
                "shown.bs.modal",
                () => {
                  audioFR.play();
                  playKnifeAnimation();
                },
                { once: true }
              );
            break;
          case "ENG":
            divENG.classList.add("show");
            modalENG.show();
            document
              .getElementById("modalENG")
              .addEventListener(
                "shown.bs.modal",
                () => {
                  audioENG.play();
                  playKnifeAnimation();
                },
                { once: true }
              );
            break;
        }
        currentLang = lang;
      }, 300);
    }

    btnAR.addEventListener("click", () => openLang("AR"));
    btnFR.addEventListener("click", () => openLang("FR"));
    btnENG.addEventListener("click", () => openLang("ENG"));

    // Stop audio and pause animation when modal closes manually
    ["modalAR", "modalFR", "modalENG"].forEach((modalId) => {
      const modalEl = document.getElementById(modalId);
      modalEl.addEventListener("hide.bs.modal", () => {
        stopAllAudios();
      });
    });

    // Initially pause animations
    pauseKnifeAnimation();