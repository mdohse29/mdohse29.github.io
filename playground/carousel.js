document.getElementById('next').addEventListener('click', ()=>{
    let active = document.querySelector('.ss-item.active');
    active.classList.remove('active');
    active.nextElementSibling.classList.add('active');
})