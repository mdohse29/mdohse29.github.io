let buttons = document.querySelectorAll('#addItem, #addSub');

buttons.forEach(button => {
    
    if (button.id === 'addItem'){
        button.addEventListener('click', function(){
            let input = document.querySelector('#item');
            let item = input.value;

            if ((item) && (!dupeCheck(item))){
                // input.classList.remove('is-danger');

                if (item.includes(',')){

                    let items = item.split(',');

                    for (let i of items){

                        if (!dupeCheck(i.trim())){

                            document.querySelector('#list').appendChild(createItem(i.trim()));
                            setCookie();

                        }

                    }

                }else{

                    document.querySelector('#list').appendChild(createItem(item.trim()));
                    setCookie();

                }

            }else{

                input.classList.add('is-danger')
                console.log("Empty or duplicate Item. Nothing Added.");

            }

            input.value = '';
            document.querySelector('#item').focus();

        })
    }else{
        let input = document.querySelector('#item');
        let item = input.value;

        if ((item) && (!dupeCheck(item))){
            // input.classList.remove('is-danger');

            if (item.includes(',')){

                let items = item.split(',');

                for (let i of items){

                    if (!dupeCheck(i.trim())){

                        parentItem.appendChild(createItem(i.trim(), true));
                        setCookie();

                    }

                }

            }else{

                parentItem.appendChild(createItem(item.trim(), true));
                setCookie();

            }

        }else{

            input.classList.add('is-danger')
            console.log("Empty or duplicate Item. Nothing Added.");

        }

        input.value = '';
        document.querySelector('#item').focus();
    }

})