// Add the user's selected books and exact quotes here when supplied.
// Each entry: { id, title, author, cover, quote }.
const books = [{
  id: 'once-upon-a-broken-heart',
  title: 'Once Upon a Broken Heart',
  author: 'Stephanie Garber',
  cover: 'https://images.macmillan.com/folio-assets/macmillan_us/frontbookcovers/1000H/9781250268396.jpg',
  quote: 'i believe there are far more possibilities than happily every after or tragedy. every story has the potential for infinite endings',
}];
const shelf = document.querySelector('#books');
const detail = document.querySelector('#book-detail');
function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function bookCover(book) {
  const wrapper = node('div', '', 'cover-frame');
  const cover = node('img');
  cover.alt = `${book.title} book cover`;
  cover.hidden = true;
  const fallback = node('div', '', 'cover-unavailable');
  fallback.append(node('span', '✧', 'fallback-star'), node('p', book.title, 'fallback-title'), node('p', book.author, 'fallback-author'), node('small', 'Cover image unavailable'));
  cover.addEventListener('load', () => {
    cover.hidden = false;
    fallback.hidden = true;
  });
  cover.addEventListener('error', () => {
    cover.hidden = true;
    fallback.hidden = false;
  });
  wrapper.append(cover, fallback);
  cover.src = book.cover;
  return wrapper;
}
for (const book of books) {
  const card = node('a', '', 'book-card');
  card.href = `#book/${encodeURIComponent(book.id)}`;
  const cover = bookCover(book);
  const content = node('div', '', 'card-content');
  content.append(node('p', '01 / THE ENCHANTED COLLECTION', 'eyebrow'), node('p', 'A fairy tale with a dangerous heart', 'book-kicker'), node('h3', book.title), node('p', `by ${book.author}`, 'book-author'), node('blockquote', book.quote), node('span', 'Step into the story  ›', 'story-link'));
  card.append(cover, content);
  shelf.append(card);
}
document.querySelector('#empty').hidden = books.length > 0;
function renderPage() {
  const book = books.find(item => `#book/${encodeURIComponent(item.id)}` === location.hash);
  document.querySelector('.hero').hidden = Boolean(book);
  document.querySelector('.collection').hidden = Boolean(book);
  document.querySelector('.ribbon').hidden = Boolean(book);
  document.querySelector('.about').hidden = Boolean(book);
  detail.hidden = !book;
  detail.replaceChildren();
  document.title = book ? `${book.title} · The Enchanted Library` : 'The Enchanted Library';
  if (!book) return;
  const cover = bookCover(book);
  const content = node('div');
  const back = node('a', '← Back to the bookshelf');
  back.href = '#collection';
  content.append(back, node('p', 'A TALE OF LOVE, BARGAINS & MAGIC', 'eyebrow'), node('h1', book.title), node('p', `by ${book.author}`, 'book-author'), node('div', '✧  ─────────  ✧', 'quote-divider'), node('blockquote', book.quote), node('p', 'Words to carry with you, long after the last page.', 'quote-note'));
  detail.append(cover, content);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', renderPage);
renderPage();
