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

  render() {
    const startButton = React.createElement(
      ClockButton,
      {start: () => this.start(), key: 1}
    );
    const stopButton = React.createElement(
      ClockButton,
      {stop: () => this.stop(), key: 2}
    );
    const buttons = React.createElement(
      'div',
      {key: 4},
      [startButton, stopButton]
    );

    return React.createElement('div', null, [this.formattedTime(), buttons]);
  }
}
