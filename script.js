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
  cover.src = book.cover;
  cover.alt = `${book.title} book cover`;
  const fallback = node('p', 'The book cover is currently unavailable.', 'cover-unavailable');
  fallback.hidden = true;
  cover.addEventListener('error', () => {
    cover.hidden = true;
    fallback.hidden = false;
  });
  wrapper.append(cover, fallback);
  return wrapper;
}
for (const book of books) {
  const card = node('a', '', 'book-card');
  card.href = `#book/${encodeURIComponent(book.id)}`;
  const cover = bookCover(book);
  card.append(cover, node('h3', book.title), node('p', book.author));
  shelf.append(card);
}
document.querySelector('#empty').hidden = books.length > 0;
function renderPage() {
  const book = books.find(item => `#book/${encodeURIComponent(item.id)}` === location.hash);
  document.querySelector('.hero').hidden = Boolean(book);
  document.querySelector('.collection').hidden = Boolean(book);
  detail.hidden = !book;
  detail.replaceChildren();
  document.title = book ? `${book.title} · The Enchanted Library` : 'The Enchanted Library';
  if (!book) return;
  const cover = bookCover(book);
  const content = node('div');
  const back = node('a', '← Back to the bookshelf');
  back.href = '#collection';
  content.append(back, node('h1', book.title), node('p', book.author), node('blockquote', book.quote));
  detail.append(cover, content);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', renderPage);
renderPage();
