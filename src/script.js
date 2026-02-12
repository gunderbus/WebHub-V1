function openPage(pageId, el) {
  document.querySelectorAll('.page').forEach(p =>
    p.classList.remove('active')
  );

  document.querySelectorAll('nav span').forEach(n =>
    n.classList.remove('active')
  );

  document.getElementById(pageId).classList.add('active');
  el.classList.add('active');
}