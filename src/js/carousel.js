const autoplay = (embla, interval) => {
    let timer = 0;
  
    const play = () => {
      stop();
      requestAnimationFrame(() => (timer = window.setTimeout(next, interval)));
    };
  
    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
  
    const next = () => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
      play();
    };
  
    return { play, stop };
  };

  const listenForPrevBtnClick = (btn, embla, autoplayer) => {
    const scrollPrev = () => {
      autoplayer.stop();
      embla.scrollPrev();
    };
    btn.addEventListener("click", scrollPrev, false);
  };

  const listenForNextBtnClick = (btn, embla, autoplayer) => {
    const scrollNext = () => {
      autoplayer.stop();
      embla.scrollNext();
    };
    btn.addEventListener("click", scrollNext, false);
  };

  const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
    return () => {
      if (embla.canScrollPrev()) prevBtn.removeAttribute("disabled");
      else prevBtn.setAttribute("disabled", "disabled");
  
      if (embla.canScrollNext()) nextBtn.removeAttribute("disabled");
      else nextBtn.setAttribute("disabled", "disabled");
    };
  };

const wrap = document.querySelector(".embla");
const viewPort = wrap.querySelector(".embla__viewport");
const prevBtn = wrap.querySelector(".embla__button--prev");
const nextBtn = wrap.querySelector(".embla__button--next");
const embla = EmblaCarousel(viewPort);
const autoplayer = autoplay(embla, 4000);
const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);

listenForPrevBtnClick(prevBtn, embla, autoplayer);
listenForNextBtnClick(nextBtn, embla, autoplayer);

embla.on("select", disablePrevAndNextBtns);
embla.on("init", disablePrevAndNextBtns);

embla.on("pointerDown", autoplayer.stop);
embla.on("init", autoplayer.play);
