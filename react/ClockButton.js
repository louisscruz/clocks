const ClockButton = (props) => {
  const action = props.start ? props.start : props.stop;
  const text = props.start ? 'start' : 'stop';
  
  return React.createElement(
    'button',
    {
      onClick: action
    },
    text
  );
}
