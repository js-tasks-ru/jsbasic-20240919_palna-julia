import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
          <div class="slider__thumb">
            <span class="slider__value">${this.value}</span>
          </div>
          <div class="slider__progress"></div>
          <div class="slider__steps"></div>
        </div>
      `);

    const sliderSteps = this.elem.querySelector(".slider__steps");

    for (let i = 0; i <= this.steps - 1; i++) {
      const step = createElement(`<span></span>`);
      sliderSteps.append(step);
    }

    const firstStep = sliderSteps.children[0];
    this.activeStep(firstStep);

    this.elem.addEventListener("click", this.changeStep);
  }

  changeStep = (e) => {
    const sliderSteps = this.elem.querySelectorAll("span");

    const [valueStep, valueProgress] = this.getValueProgress(e);

    this.changeSliderThumb(valueProgress);
    this.setSliderValue(valueStep);
    this.createEventSliderChange();
    this.inactiveStep();
    this.activeStep(sliderSteps[valueStep + 1]);
  };

  getValueProgress(e) {
    const clientX = e.clientX;
    const coordinatesSliderProgress = this.elem.getBoundingClientRect();
    const coordinateXClick = clientX - coordinatesSliderProgress.x;

    const sizeStepPercent = 100 / (this.steps - 1);
    const percentProgress =
      (coordinateXClick * 100) / coordinatesSliderProgress.width;

    const valueStep = Math.round(percentProgress / sizeStepPercent);
    const valueProgress = sizeStepPercent * valueStep;

    return [valueStep, valueProgress];
  }

  setSliderValue(value) {
    const sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.innerHTML = value;
    this.value = value;
  }

  activeStep(element) {
    element.classList.add("slider__step-active");
  }

  inactiveStep() {
    const sliderStepActive = this.elem.querySelector(".slider__step-active");
    sliderStepActive.classList.remove("slider__step-active");
  }

  changeSliderThumb = (percent) => {
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");

    thumb.style.left = `${percent}%`;
    progress.style.width = `${percent}%`;
  };

  createEventSliderChange() {
    const eventSliderChange = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(eventSliderChange);
  }
}
