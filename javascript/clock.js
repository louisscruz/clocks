class Clock {
  constructor(el, start, stop) {
    this.el = el;
    this.generateDisplayElement();
    this.generateButtons();
    this.installListeners();
  }

  generateDisplayElement() {
    const element = document.createElement('div');
    this.el.appendChild(element);

    this.displayElement = element;
  }

  generateButtons() {
    this.createButton('start');
    this.createButton('stop');
  }

  createButton(text) {
    const button = document.createElement('button');
    button.innerHTML = text;

    this.el.appendChild(button);

    this[text] = button;
  }

  installListeners() {
    this.el.addEventListener('click', (e) => {
      if (e.target === this.start) {
        this.end();
        this.begin();
      } else if (e.target === this.stop) {
        this.end();
      }
    });
  }

  currentTime() {
    return new Date();
  }

  renderCurrentTime() {
    this.displayElement.innerHTML = this.currentTime();
  }

  updateTime() {
    this.renderCurrentTime();
    this.timeout = setTimeout(() => {
      requestAnimationFrame(() => this.updateTime());
    }, 1000);
  }

  begin() {
    requestAnimationFrame(() => this.updateTime());
  }

  end() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
