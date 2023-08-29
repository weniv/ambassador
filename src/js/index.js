// 배너
const banner = document.querySelector(".banner");
const bannerList = document.querySelectorAll(".banner-list li");
const bannerBtnList = document.querySelector(".banner-btn-list");
const bannerBtnItems = document.querySelectorAll(".banner-btn");

const setTransformValue = value => {
  bannerList.forEach(item => {
    item.setAttribute("style", `transform: translateX(${value});`);
  });
};

const prevSide = () => {
  const activedBanner = document.querySelector(".banner-list li.active");
  const activedBtn = document.querySelector(".banner-btn.active");

  const dataId = parseInt(activedBanner.getAttribute("data-id"), 0);
  const prevBanner = bannerList[dataId - 1];
  const prevBtn = bannerBtnItems[dataId - 1];
  const lastValue = bannerList.length - 1;

  if (activedBanner) {
    activedBanner.classList.remove("active");
    activedBtn.classList.remove("active");

    if (prevBanner) {
      const translateValue = `-${100 * (dataId - 1)}%`;

      prevBanner.classList.add("active");
      prevBtn.classList.add("active");

      setTransformValue(translateValue);
    } else {
      const translateValue = `-${100 * lastValue}%`;

      bannerList[lastValue].classList.add("active");
      bannerBtnItems[lastValue].classList.add("active");

      setTransformValue(translateValue);
    }
  } else {
    const translateValue = `-${100 * lastValue}%`;

    bannerList[lastValue].classList.add("active");
    bannerBtnItems[lastValue].classList.add("active");
    setTransformValue(translateValue);
  }
};

const nextSide = () => {
  const activedBanner = document.querySelector(".banner-list li.active");
  const activedBtn = document.querySelector(".banner-btn.active");

  const dataId = parseInt(activedBanner.getAttribute("data-id"), 0);
  const nextBanner = bannerList[dataId + 1];
  const nextBtn = bannerBtnItems[dataId + 1];

  if (activedBanner) {
    activedBanner.classList.remove("active");
    activedBtn.classList.remove("active");

    if (nextBanner) {
      const translateValue = `-${100 * (dataId + 1)}%`;

      nextBanner.classList.add("active");
      nextBtn.classList.add("active");

      setTransformValue(translateValue);
    } else {
      bannerList[0].classList.add("active");
      bannerBtnItems[0].classList.add("active");
      setTransformValue(0);
    }
  } else {
    bannerList[0].classList.add("active");
    bannerBtnItems[0].classList.add("active");
    setTransformValue(0);
  }
};

bannerBtnList.addEventListener("click", e => {
  if (e.target.tagName == "BUTTON") {
    const activedBtn = document.querySelector(".banner-btn.active");
    const bannerBtn = e.target;
    const dataId = parseInt(bannerBtn.getAttribute("data-id"), 0);
    const translateValue = `-${100 * dataId}%`;

    if (!bannerBtn.classList.contains("active")) {
      activedBtn.classList.remove("active");
      bannerBtn.classList.add("active");

      setTransformValue(translateValue);
    }
  }
});

let bannerSlide = setInterval(() => {
  nextSide();
}, 7000);

banner.addEventListener("mouseover", () => {
  clearInterval(bannerSlide);
});

banner.addEventListener("mouseout", () => {
  bannerSlide = setInterval(() => {
    nextSide();
  }, 7000);
});

let startPoint = 0;
let endPoint = 0;

banner.addEventListener("touchstart", e => {
  startPoint = e.touches[0].pageX;
});

banner.addEventListener("touchend", e => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevSide();
  } else if (startPoint > endPoint) {
    nextSide();
  }
});

// top 버튼
const topBtn = document.querySelector(".top-btn");
const footer = document.querySelector(".footer");
const copyrightDiv = document.querySelector(".copyright");

// 활성화/비활성화
const activeScrollTopBtn = htmlScrollTop => {
  if (htmlScrollTop > 100) {
    topBtn.classList.add("active");
  } else {
    topBtn.classList.remove("active");
  }
};

// 스크롤이 copyright를 만난 경우에는 copyright 위로 이동
const moveTopBtn = htmlScrollTop => {
  const htmlScrollHeight = document.querySelector("html").scrollHeight;
  const copyrightHeight = copyrightDiv.offsetHeight;

  if (
    htmlScrollHeight - (htmlScrollTop + window.innerHeight) <=
    copyrightHeight
  ) {
    if (window.matchMedia("(max-width: 780px)").matches) {
      topBtn.style.bottom = `${copyrightHeight + 20}px`;
    } else {
      topBtn.style.bottom = `${copyrightHeight + 40}px`;
    }
  } else {
    topBtn.style.bottom = "4rem";
  }
};

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", function () {
  const htmlScrollTop = document.querySelector("html").scrollTop;

  activeScrollTopBtn(htmlScrollTop);
  moveTopBtn(htmlScrollTop);
});

window.addEventListener("resize", function () {
  const htmlScrollTop = document.querySelector("html").scrollTop;

  moveTopBtn(htmlScrollTop);
});

window.addEventListener("load", function () {
  const htmlScrollTop = document.querySelector("html").scrollTop;

  moveTopBtn(htmlScrollTop);
});

// FAQ 리스트 버튼
const faqList = document.querySelector(".faq-list");

faqList.addEventListener("click", e => {
  if (e.target.tagName == "BUTTON") {
    const targetItem = e.target.closest("li");

    if (targetItem.classList.contains("active")) {
      targetItem.classList.remove("active");
    } else {
      targetItem.classList.add("active");
    }
  }
});
