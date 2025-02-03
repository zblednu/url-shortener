const output = document.getElementById("output");
const input = document.getElementById("input");
const button = document.getElementById("button");


async function Get(){
    const data = {
        url: input.value
    };
    input.value = "";
    try {
        console.log(data);
        const res = await fetch('http://localhost:3000', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });
    
        const answer = await res.json();
        console.log(answer);
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
