const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

const fetchRandomQuote=async()=>{
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote..."
    quoteBtn.disabled=true;
    try {
        const response = await fetch("https://api.quotable.io/random");
        if(!response.ok){
            throw new Error("Failed to fetch quote");
        }
        const result= await response.json();
        quoteText.innerText= result.content;
        authorName.innerText= result.author;
    } catch (error) {
        console.error("Error fetching quote:",error);
    } finally{
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
        quoteBtn.disabled = false;
    }
}

speechBtn.addEventListener("click", ()=>{
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`  )
    synth.speak(utterance);
})

copyBtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(quoteText.innerText);
})

twitterBtn.addEventListener("click",()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl,"_blank");
})



quoteBtn.addEventListener("click",fetchRandomQuote);
fetchRandomQuote();