const autoGallery = (embla, interval) => {
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

  const prevBtnClick = (btn, embla, autoplayer) => {
    const scrollPrev = () => {
      autoplayer.stop();
      embla.scrollPrev();
    };
    btn.addEventListener("click", scrollPrev, false);
  };

  const nextBtnClick = (btn, embla, autoplayer) => {
    const scrollNext = () => {
      autoplayer.stop();
      embla.scrollNext();
    };
    btn.addEventListener("click", scrollNext, false);
  };

  const disPrevNextBtns = (prevBtn, nextBtn, embla) => {
    return () => {
      if (embla.canScrollPrev()) prevBtn.removeAttribute("disabled");
      else prevBtn.setAttribute("disabled", "disabled");
  
      if (embla.canScrollNext()) nextBtn.removeAttribute("disabled");
      else nextBtn.setAttribute("disabled", "disabled");
    };
  };

const div = document.querySelector(".gallery");
const view = div.querySelector(".gallery__viewport");
const prev = div.querySelector(".gallery__button--prev");
const next = div.querySelector(".gallery__button--next");
const gallery = EmblaCarousel(view);
const player = autoGallery(gallery, 5000);
const disPrevAndNextBtns = disPrevNextBtns(prev, next, gallery);

prevBtnClick(prev, gallery, player);
nextBtnClick(next, gallery, player);

gallery.on("select", disPrevAndNextBtns);
gallery.on("init", disPrevAndNextBtns);

gallery.on("pointerDown", player.stop);
gallery.on("init", player.play);
