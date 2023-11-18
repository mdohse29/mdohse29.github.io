$(document).ready(function(){
    $('.tab').click(function(){
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        
    });
});

// The javascript equivalent below

// window.onload = () => {
//     let tabs = document.querySelectorAll('.tab');
//     for (let tab of tabs){
//         console.log(tab);
//         tab.addEventListener('click', () => {
//             tab.parentElement.querySelector('.active').classList.remove('active');
//             tab.classList.add('active');
//         });
//     }
// }