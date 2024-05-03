document.querySelector('.test').addEventListener('click', () => {
    document.querySelector('.md-modal').classList.remove('dnone');
    document.querySelector('html').setAttribute('style', 'overflow: hidden;'); // Keeps the screen from scrolling while the modal is open.
});

document.querySelector('.md-modal-background').addEventListener('click', () => {
    document.querySelector('.md-modal').classList.add('dnone');
    document.querySelector('html').removeAttribute('style');
});

document.querySelector('.close-btn').addEventListener('click', () => {
    this.setAttribute('style', 'border: 5px solid black;');
})