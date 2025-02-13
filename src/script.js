const output = document.getElementById("output");
const input = document.getElementById("input");
const button = document.getElementById("button");
const short = document.getElementById("short");

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
        alert("Please enter a valid URL.");
        input.value = "";
        return;
    }
    input.value = "";  
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
	    const shortUrl = currentDom + "/" + answer.url;
        output.href = shortUrl;
	    output.textContent = shortUrl;
        short.style.display = "block";  
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
