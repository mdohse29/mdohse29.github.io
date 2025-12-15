import { mkBtn, mkElem, nestElem, mkP } from '/scripts/crtElm-mod-min.js';
const qContainer = document.querySelector('.q-container');
let qData = null;
const score = {
    correct: 0,
    incorrect: 0,
    total: 0,
    attempts: 0,
    max_attempts: 2
}

async function getData(){
    try{
        const resp = await fetch('./quiz-data.json');
        if (resp.ok){
            return resp.json();
        }
    }catch(err){
        console.error(err);
    }
    return null;
}

async function triviaAPI(){
    try{
        const resp = await fetch('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple');
        if (resp.ok){
            const {results} = await resp.json();
            const data = {
                title:'Movie Trivia',
                intro:'Click Start To Begin<br>Good Luck!',
                questions:[]
            }
            for (const item of results){
                const question = {
                    question: item.question,
                    options: []
                }
                question.options.push({value: item.correct_answer, correct:true})
                for (const ans of item.incorrect_answers){
                    question.options.push({value: ans, correct: false});
                }
                question.options = shuffleArray(question.options);
                data.questions.push(question);
            }
            return data;
        }
    }catch(err){
        console.error(err);
    }
    const backUp = await getData();
    console.log('Loading Backup Data!');
    return backUp;
}

function nxtBtn(){
    const prompt = qContainer.querySelector('.inner-prompt');
    const qIdent = parseInt(prompt.dataset.ident);
    showCorrect();
    [...qContainer.querySelectorAll('button')].forEach(btn=>{btn.disabled = true;});
    prompt.append(mkBtn({id:'next', ...(qIdent<score.total)?{class:'nxt', inner:'Next ->'}:{class:'nxt complete', inner:'Complete'}, listeners:[{type:'click', execute:function(){this.remove();loadQuestion();}}]}));
}

function shuffleArray(array) {
    const fresh = [...array]; // I added so it doesn't mutate the original array
    // AI generated Fisher-Yates shuffle implementation :-(
    for (let i = fresh.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fresh[i], fresh[j]] = [fresh[j], fresh[i]];  // Using deconstructing assignment to swap elements
        // This method avoids the need for a temporary variable
    }
    return fresh;
}

function answerSelect(ev){
    ev.stopPropagation();
    const self = this;
    score.attempts++;
    if (self.correct){
        score.correct++;
        self.classList.add('correct');
        nxtBtn();
    }else{
        score.incorrect++;
        self.classList.add('incorrect');
        self.disabled = true;
        if (score.attempts >= score.max_attempts)
            nxtBtn();
    }
}

function loadQuestion(){
    score.attempts = 0;
    const prompt = qContainer.querySelector('.inner-prompt');
    const opts = qContainer.querySelector('.q-opts');
    prompt.replaceChildren();
    opts.replaceChildren();
    if (qData.questions.length){
        const question = qData.questions.shift();
        prompt.dataset.ident = (score.total - qData.questions.length);
        nestElem([
            prompt,
            mkP({inner:question.question})
        ])
        nestElem([
            opts,
            shuffleArray(question.options.map(q=>{
                return mkBtn({class:'ans-opt', prop:{correct:q.correct}, inner:q.value, listeners:[{type:'click', execute:answerSelect}]});
            }))
        ])
    }else{
        nestElem([
            prompt,
            mkP({class:'game-over', inner:`THE END<br><sup>You got ${score.correct} out of ${score.total} correct!</sup>`})
        ])
        nestElem([
            opts,
            mkBtn({inner:'RESET', listeners:[{type:'click', execute:function(){location.reload()}}]})
        ])
    }
}

function showCorrect(){
    [...document.querySelectorAll('.ans-opt')].forEach(op=>{
        if (op.correct){
            op.classList.add('correct');
        }else{
            op.classList.add('incorrect');
        }
    })
}

window.onload = async ()=>{
    // qData = await getData();
    qData = await triviaAPI();
    console.log(qData)  
    const intro = qContainer.querySelector('.intro');
    const title = qContainer.querySelector('.q-title');
    intro.addEventListener('transitionend', function(){this.remove()});
    score.total = qData.questions.length;
    if (qData.title){
        nestElem([
            title,
            mkElem({elemType:'h2', inner:qData.title})
        ])
    }
    loadQuestion();
    if (qData.intro){
        nestElem([
            intro,
            [
                mkElem({elemType:'h2', inner:qData.intro}),
                mkBtn({inner:'Start', listeners:[{type:'click', execute:function(){this.parentElement.classList.add('slide-up')}}]})
            ]
        ]);
    }else{
        intro.classList.add('slide-up')
    }
    window.API = { // for testing
        loadQuestion,
        showCorrect
    }
}
