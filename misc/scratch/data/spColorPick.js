let colorPicker = function(){
    const colorSelect = document.querySelector('select');
    let currentValue = colorSelect.value;

    colorSelect.addEventListener('change', () => {
        let setting = colorSelect.value;
        let textArea = document.querySelector('#TextArea');
        textArea.classList.remove(currentValue);
        colorSelect.querySelector('option[value="' + currentValue + '"]').removeAttribute('selected');
        textArea.classList.add(setting);
        colorSelect.querySelector('option[value="' + setting + '"]').setAttribute('selected', '');
        currentValue = setting;
        textArea.focus();
    });
};