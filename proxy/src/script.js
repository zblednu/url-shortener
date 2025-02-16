const output = document.getElementById("output");
const input = document.getElementById("input");
const button = document.getElementById("button");
const short = document.getElementById("short");
const errorMessage = document.getElementById("error-message");

function Validation(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

async function Get(){
    const data = {
        url: input.value.trim()
    };
    if (!Validation(data.url)) {
        short.style.visibility = "hidden";
        errorMessage.style.display = "block";
        input.value = "";
        return;
    } 
    input.value = "";
    errorMessage.style.display = "none"; 
    short.style.opacity = "0";
    short.style.visibility = "visible"; 
    
        setTimeout(() => {

            short.style.opacity = "1";
        }, 10);
     
    try {
        const res = await fetch(window.location.origin, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });


	const currentDom = window.location.origin;
    	
        const answer = await res.json();
        console.log(answer);
        errorMessage.style.display = "none"; 
	    const shortUrl = currentDom + "/" + answer.url;
        output.href = shortUrl;
	    output.textContent = shortUrl;
        
        short.style.opacity = "0";
        short.style.visibility = "visible"; 
        setTimeout(() => {
            short.style.opacity = "1";
        }, 10);  
    } catch (error) {
        console.error('Error:', error);
    }
    
}

button.addEventListener('click', Get);
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        Get(); 
    }
});
