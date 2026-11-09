const datePicker = document.querySelector('#datePicker');
const dateLabel = datePicker.closest('div');
datePicker.addEventListener('change', () => {
  if (!datePicker.value) return;
  const date = new Date(`${datePicker.value}T12:00:00`);
  dateLabel.querySelector('small').textContent = 'OUR DATE';
  datePicker.title = date.toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
});

const events = [...document.querySelectorAll('.event')];
const progressFill = document.querySelector('#progressFill');
const progressText = document.querySelector('#progressText');
function updateProgress() {
  const completed = document.querySelectorAll('.event.done-event').length;
  progressFill.style.width = `${completed / events.length * 100}%`;
  progressText.textContent = `${completed} / ${events.length}`;
}
document.querySelectorAll('.done').forEach(button => button.addEventListener('click', () => {
  const event = button.closest('.event');
  event.classList.toggle('done-event');
  const done = event.classList.contains('done-event');
  button.classList.toggle('is-done', done);
  button.textContent = done ? 'Completed ✓' : 'Mark as done';
  updateProgress();
}));

document.querySelectorAll('[data-selectable]').forEach(card => {
  const button = card.querySelector('.select');
  button.addEventListener('click', () => {
    card.classList.toggle('selected');
    button.textContent = card.classList.contains('selected') ? 'Added to our day ✓' : 'Add to our day';
  });
});

let foodChoice = '';
document.querySelectorAll('[data-food]').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.food-card, .venue-card');
  const label = card.querySelector('b, h4')?.textContent?.trim() || 'Selected option';
  document.querySelectorAll('.food-card.chosen, .venue-card.chosen').forEach(item => {
    item.classList.remove('chosen');
    const b = item.querySelector('button'); if (b) b.textContent = item.classList.contains('venue-card') ? 'Café pick' : 'Choose';
  });
  card.classList.add('chosen');
  button.textContent = card.classList.contains('venue-card') ? 'Picked ✓' : 'Chosen ✓';
  foodChoice = label;
  document.querySelector('#chosen').textContent = `Our pick: ${foodChoice}. We can change it anytime.`;
}));
updateProgress();
