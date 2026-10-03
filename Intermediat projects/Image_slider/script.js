const sliderTabs = document.querySelectorAll('.slider-tab');
const sliderIndicator = document.querySelector('.slider-indicator');
const sliderControls = document.querySelector('.slider-controls');



// update the indicator height and width
const updateIndicator = (tab, index) => {
  sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
  sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`


  const scrollLeft = sliderTabs[index].offsetLeft - sliderControls.
  offsetWidth / 2 + sliderTabs[0].offsetWidth / 2;
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });

}

// Initialize Swiper instance
const swiper = new Swiper(".slider-container", {
  effect: "fade",
  speed: 1300, // 1300 ms = 1.3s
  autoplay: {delay: 4000},

  navigation: {
    prevEl: "#slide-prev",
    nextEl: "#slide-next"
  },

  on: {
    // update the indicator on slide change
    slideChange: () => {
      const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
      updateIndicator(sliderTabs[swiper.activeIndex],currentTabIndex);
    },
    reachEnd: () => swiper.autoplay.stop(),
  }

});


// Update the slide and indicator on tab click
sliderTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    swiper.slideTo(index);
    updateIndicator(tab, index);
  });

});


window.addEventListener('resize', () => updateIndicator(sliderTabs[swiperIndex], 0));