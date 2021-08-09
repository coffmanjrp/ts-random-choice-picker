const tagsEl = document.getElementById('tags') as HTMLDivElement;
const textarea = document.getElementById('textarea') as HTMLTextAreaElement;

textarea.focus();

function createTags(input: string) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim());

  tagsEl.innerHTML = '';

  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag: Element) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag: Element) {
  tag.classList.remove('highlight');
}

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

textarea.addEventListener('keyup', (e) => {
  createTags((e.target as HTMLTextAreaElement).value);

  if (e.key === 'Enter') {
    setTimeout(() => {
      (e.target as HTMLTextAreaElement).value = '';
    }, 10);

    randomSelect();
  }
});
