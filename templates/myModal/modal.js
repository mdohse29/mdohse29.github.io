document.querySelector('.test').addEventListener('click', () => {
    document.querySelector('.md-modal').classList.remove('dnone');
});

document.querySelector('.md-modal-background').addEventListener('click', () => {
    document.querySelector('.md-modal').classList.add('dnone');
});