let container = document.querySelector('.container');

function newSketch(){
    let userInput = prompt('Number of squares per rows? (min: 1, max: 100)');
    container.innerHTML = '';
    while (parseInt(userInput) > 100 || parseInt(userInput) < 1){
        userInput = prompt('Number of squares per rows? (max: 100');
    }
    let numberOfRows = 960/(960/userInput);
    for(let i = 1; i <= (numberOfRows); i ++){
        for(let i = 1; i <= (userInput); i++){
            let grid = document.createElement('div');
            grid.setAttribute('style', `width:${960/userInput}px; height: ${960/userInput}px;`);
            grid.addEventListener('mouseenter', () => {
                grid.setAttribute('class', 'coloring');
            })
            container.appendChild(grid);
        }
    }
}

let newSketchButton = document.querySelector('.newSketch');
newSketchButton.addEventListener('mouseenter', () => {
    newSketchButton.setAttribute('style', 'background-color: green; cursor: pointer; color: white;')
});
newSketchButton.addEventListener('mouseleave', () => {
    newSketchButton.setAttribute('style', 'background-color: default;')
});