//Event listener for submit button to get user input for fetch word function
function startSearch() {
    const search = document.querySelector("#submit-button")
    const input = document.querySelector("#new-word")

    search.addEventListener("click", (event) => {
        event.defaultPrevented();
        fetchWordData(input.value)
    })
}
startSearch();

//fetch data from API
async function fetchWordData(word) {
    //error handle invalid input and extra spaces
    if(word !== " ") {
    displayError('Field Empty: Please enter a word')
    return; 
  }
  //fetch dictionary api
	try{
		const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if(!respond.ok) {
        displayError(`HTTP error! Status: ${response.status}`);
        }
		const data = await response.json();
		displayWordInfo(data)
	}
	catch (error) {
        displayError('Failed to load data. Please try again!')
		console.error('Error finding word data', error);
	}
};

//To dispay word info:
function displayWordInfo(data) {  
    removeErrorMessages();

    const wordName = document.querySelector("#word-name")
    wordName = data[0].word
    const wordInfo = document.querySelector("#word-info")

    //definitions
    const pronunciation = data[0].phonetic;
    const partOfSpeech = data[0].meanings.partOfSpeech;
    const definitions = data[0].meanings.definitions;

    //add elements to DOM
    const pronunciationDetails = document.createElement('li')
    pronunciationDetails.textContent = (`Pronunciation: ${pronunciation}`)
    
    const partOfSpeechDetails = document.createElement('li')
    partOfSpeechDetails.textContent = (`Part of Speech: ${partOfSpeech}`)

    const definitionDetails = document.createElement('li')
    definitionDetails.textContent = (`Defintions: ${definitions}`)

    wordInfo.appendChild(pronunciationDetails, partOfSpeechDetails, definitionDetails);
};

//Dispay audio:
function displayAudio(data) {
const audio = document.querySelector("#word-audio")
const audioInfo = document.createElement('audio')
audio.src = data[0].phonetics[0].audio;
audio.append(audioInfo)
};

//Display error messages in a dedicated section of the page for error. hide or shoe error css
function displayError(message) {
  const displayErrorMessage = document.querySelector("#error-message")
  displayErrorMessage.classList.remove('hidden')
  displayErrorMessage.textContent = message;
}

function removeErrorMessages() {
  const removeErrorMessage = document.querySelector("#error-message") 
  removeErrorMessage.classList.add('hidden')
  removeErrorMessage.textContent = "";
}
