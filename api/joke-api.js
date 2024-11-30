async function getRandomJoke(){
    let response = await fetch("https://official-joke-api.appspot.com/random_joke");

    if (response.ok){
        return response.json();
    }else{
        return null;
    }
}
