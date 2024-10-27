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

    const steps = this.elem.querySelector(".slider__steps");
    const thumb = this.elem.querySelector(".slider__thumb");

    for (let i = 0; i <= this.steps - 1; i++) {
      const step = createElement(`<span></span>`);
      steps.append(step);
    }

    const firstStep = steps.children[0];
    this.active(firstStep, "slider__step-active");

    thumb.ondragstart = () => false;

    this.elem.addEventListener("click", this.onClick);
    thumb.addEventListener("pointerdown", this.pointerdown);
    document.addEventListener("pointerup", this.pointerup);
  }

  pointerdown = (e) => {
    e.target.style.position = "absolute";
    e.target.style.zIndex = 1000;

    document.addEventListener("pointermove", this.pointermove);
  };

  pointerup = (e) => {
    document.removeEventListener("pointermove", this.pointermove);
    this.createEventSliderChange();
  };

  pointermove = (e) => {
    const percentProgress = this.getPercent(e);
    const [stepProgress] = this.getProgress(e);

    this.active(this.elem, "slider_dragging");

    this.moveAtThumb(percentProgress);
    this.setSliderValue(stepProgress);

    this.createEventSliderChange();
  };

  onClick = (e) => {
    const sliderSteps = this.elem.querySelectorAll("span");
    const sliderStepActive = this.elem.querySelector(".slider__step-active");

    const [stepProgress, percentProgress] = this.getProgress(e);

    this.moveAtThumb(percentProgress);
    this.setSliderValue(stepProgress);
    this.inactive(sliderStepActive, "slider__step-active");
    this.active(sliderSteps[stepProgress + 1], "slider__step-active");

    this.createEventSliderChange();
  };

  getProgress = (e) => {
    const percent = this.getPercent(e);
    const sizeStep = 100 / (this.steps - 1);
    const stepProgress = Math.round(percent / sizeStep);
    const percentProgress = sizeStep * stepProgress;

    return [stepProgress, percentProgress];
  };

  getPercent = (e) => {
    const coordinateXClick = e.clientX - this.elem.getBoundingClientRect().x;
    let percent = Math.round(
      (coordinateXClick * 100) / this.elem.getBoundingClientRect().width
    );

    if (percent > 100) {
      percent = 100;
    } else if (percent < 0) {
      percent = 0;
    }

    return percent;
  };

  moveAtThumb = (percent) => {
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");

    thumb.style.left = `${percent}%`;
    progress.style.width = `${percent}%`;
  };

  setSliderValue(value) {
    const sliderValue = this.elem.querySelector(".slider__value");
    sliderValue.innerHTML = value;
    this.value = value;
  }

  active(element, className) {
    element.classList.add(className);
  }

  inactive(element, className) {
    element.classList.remove(className);
  }

  createEventSliderChange() {
    const eventSliderChange = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });

    this.elem.dispatchEvent(eventSliderChange);
  }
}
