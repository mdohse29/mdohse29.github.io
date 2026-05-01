const md_toggle_functions = {
    md_toggle_switch: (ev)=>{
        if (ev.ctrlKey && ev.target.dataset.locked != undefined) {
            ev.target.dataset.locked = ev.target.dataset.locked != 'true';
            if (!ev.target.checked) {
                ev.preventDefault();
            }
            return;
        }
        if (ev.target.dataset.locked === 'true') {
            ev.preventDefault();
            return;
        }
    },
    md_toggle_label: (ev)=>{
        ev.preventDefault();
        const new_ev = new Event('click', { bubbles: false });
        new_ev.ctrlKey = ev.ctrlKey;
        if (!ev.target.nextElementSibling.hasAttribute('data-locked') || (ev.target.nextElementSibling.dataset.locked === 'false')) {
            if (!ev.ctrlKey || !ev.target.nextElementSibling.checked) {
                ev.target.nextElementSibling.checked = !ev.target.nextElementSibling.checked;
                ev.target.nextElementSibling.dispatchEvent(new Event('change'));
            }
        }
        ev.target.nextElementSibling.dispatchEvent(new_ev);
    }
}
