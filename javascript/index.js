document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('clock');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');

  const clock = new Clock(element);
});
