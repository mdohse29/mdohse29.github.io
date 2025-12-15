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

function nxtBtn(){
    const prompt = qContainer.querySelector('.inner-prompt');
    const qIdent = parseInt(prompt.dataset.ident);
    showCorrect();
    [...qContainer.querySelectorAll('button')].forEach(btn=>{btn.disabled = true;});
    prompt.append(mkBtn({id:'next', ...(qIdent<score.total)?{class:'nxt', inner:'Next ->'}:{class:'nxt complete', inner:'Complete'}, listeners:[{type:'click', execute:function(){this.remove();loadQuestion();}}]}));
}

function shuffleArray(array) {
    // AI generated Fisher-Yates shuffle implementation :-(
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Using deconstructing assignment to swap elements
        // This method avoids the need for a temporary variable
    }
    return array;
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
    qData = await getData();
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
