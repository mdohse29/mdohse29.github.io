axios.get("https://mdohse29.github.io/misc/data/archive.txt")
.then( data => {
    let titles = data.data.split("\n");
    for (let i in titles){
        console.log(titles[i]);
    }
})