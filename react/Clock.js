class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };
  }

  updateTime() {
    this.setState({currentTime: new Date()}, () => {
      this.timeout = setTimeout(() => {
        this.updateTime();
      }, 1000);
    });
  }

  start() {
    requestAnimationFrame(() => this.updateTime());
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  padTime(string) {
    if (string.length <= 1) {
      return `0${string}`;
    }
    return string;
  }

  formattedTime() {
    const { currentTime } = this.state;

    const hours = this.padTime(String(currentTime.getHours()));
    const minutes = this.padTime(String(currentTime.getMinutes()));
    const seconds = this.padTime(String(currentTime.getSeconds()));

    const string = `${hours}:${minutes}:${seconds}`;

    return React.createElement(
      'div',
      {key: 3},
      string
    );
  }

  getVal(type) {
    const { currentTime } = this.state;

    if (type === 'hours') {
      return currentTime.getHours();
    } else if (type === 'minutes') {
      return currentTime.getMinutes()
    } else if (type === 'seconds') {
      return currentTime.getSeconds();
    }
  }

  getDegree(hand, val) {
    if (hand === 'hours') {
      return this.hoursDegree(val);
    } else if (hand === 'minutes' || hand === 'seconds') {
      return this.degree(val);
    }
  }

  degree(val) {
    return val * 6;
  }

  hoursDegree(val) {
    return val * 15;
  }

  handStyles(hand) {
    const val = this.getVal(hand);
    const degree = this.getDegree(hand, val);
    return {
      transform: `rotate(${degree}deg)`
    };
  }

  generateHands() {
    const hoursHand = React.createElement(
      'div',
      {className: 'clock-hand hours', key: 123, style: this.handStyles('hours')}
    );
    const minutesHand = React.createElement(
      'div',
      {className: 'clock-hand hours', key: 234, style: this.handStyles('minutes')}
    );
    const secondsHand = React.createElement(
      'div',
      {className: 'clock-hand seconds', key: 345, style: this.handStyles('seconds')}
    );

    return React.createElement(
      'div',
      {className: 'clock-hand-container', key: 89},
      [
        hoursHand,
        minutesHand,
        secondsHand
      ]
    );
  }

  generateButtons() {
    const startButton = React.createElement(
      ClockButton,
      {start: () => this.start(), key: 1}
    );
    const stopButton = React.createElement(
      ClockButton,
      {stop: () => this.stop(), key: 2}
    );
    return React.createElement(
      'div',
      {key: 4},
      [startButton, stopButton]
    );
  }

  render() {
    const hands = this.generateHands();
    const buttons = this.generateButtons();

    return React.createElement('div', null, [this.formattedTime(), hands, buttons]);
  }
}
