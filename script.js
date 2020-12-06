const open = document.querySelector('#open'),
      close = document.querySelector('#close'),
      container = document.querySelector('.container');

open.addEventListener('click', () => {
    container.classList.add('show-nav');
})

close.addEventListener('click', () => {
    container.classList.remove('show-nav');
})