const output = document.getElementById("output");
const input = document.getElementById("input");
const button = document.getElementById("button");


input.addEventListener ("keydown", function(event){
    if (event.key === "Enter"){
        button.click();
    }
})

