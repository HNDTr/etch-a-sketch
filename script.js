let container = document.querySelector('.container');
let rainbowButton = document.querySelector('#Rainbow');
let buttons = document.querySelectorAll('button');
let gridBoxes;
let rainbowActive = false;
let showGrid = false;
let darken = false;


//Default generate 10 x 10 grid 
for(let i = 1; i <= (960/(960/10)); i ++){
    for(let i = 1; i <= 10; i++){
        let grid = document.createElement('div');
        grid.setAttribute('style', `width:${960/10}px; height: ${960/10}px; box-sizing: border-box;`);
        grid.setAttribute('class', 'gridBox');
        grid.addEventListener('mouseenter', () => {
            grid.style.backgroundColor = 'black';
        });
        container.appendChild(grid);
    }
    gridBoxes = document.querySelectorAll('.gridBox');
}

function newSketch(){
    let userInput = prompt('Number of squares per rows? (min: 1, max: 100)');
    container.innerHTML = '';
    while ( parseInt(userInput) > 100 || parseInt(userInput) < 1){
        userInput = prompt('Please input valid number! (min: 1, max: 100)');
    }
    if (!userInput){
        userInput = 10
    }
    let numberOfRows = 960/(960/userInput);
    for(let i = 1; i <= (numberOfRows); i ++){
        for(let i = 1; i <= (userInput); i++){
            let grid = document.createElement('div');
            grid.setAttribute('style', `width:${960/userInput}px; height: ${960/userInput}px; box-sizing: border-box;`);
            grid.setAttribute('class', 'gridBox');
            grid.addEventListener('mouseenter', () => {
                grid.style.backgroundColor = 'black';
            });
            container.appendChild(grid);

            if (rainbowActive) {
                grid.addEventListener('mouseenter', applyRainbowColor);
            } else {
                grid.addEventListener('mouseenter', applyDefaultColor);
            }
            if (showGrid){
                grid.classList.add('showGrid');
            } else {
                grid.classList.remove('showGrid');
            }
        }
    }
    gridBoxes = document.querySelectorAll('.gridBox');
}

buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.setAttribute('style', 'background-color: green; cursor: pointer; color: white;')
    });
    button.addEventListener('mouseleave', () => {
        button.setAttribute('style', 'background-color: default;')
    });
})




rainbowButton.addEventListener('click', () => {
    rainbowButton.classList.toggle('active');
})

function showGrids(){
    let gridButton = document.querySelector('#showGrids')
 
    showGrid = !showGrid;
    gridButton.classList.toggle('active');
    gridBoxes.forEach((grid) => {
        grid.classList.toggle('showGrid');
    })
}

function opacityDecrease(event) {
    let currentOpacity = parseFloat(event.target.style.opacity) || 0;
    currentOpacity = Math.min(1, currentOpacity + 0.1);
    event.target.style.opacity = currentOpacity;
}

function darkening(){
    let darkenButton = document.querySelector('#Darken');
    console.log(darkenButton)
    darken = !darken;
    darkenButton.classList.toggle('active');
    gridBoxes.forEach((grid) => {
        grid.removeEventListener('mouseenter', opacityDecrease);

        if (darken){
            grid.addEventListener('mouseenter', opacityDecrease);
        }
    })
}

// Event handlers for coloring modes
function applyRainbowColor(event) {
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);
    event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function applyDefaultColor(event) {
    event.target.style.backgroundColor = 'black';
}



// Toggle function
function rainbow() {
    rainbowActive = !rainbowActive;
    gridBoxes.forEach((gridBox) => {
        gridBox.removeEventListener('mouseenter', applyRainbowColor);
        gridBox.removeEventListener('mouseenter', applyDefaultColor);
        
        if (rainbowActive) {
            gridBox.addEventListener('mouseenter', applyRainbowColor);
        } else {
            if (darken){
                gridBox.addEventListener('mouseenter', opacityDecrease);
            } else {
                gridBox.addEventListener('mouseenter', applyDefaultColor);
            }
        }
    });
}

function colorGrid(){
    gridBoxes.forEach((grid) => {
        let randomR = Math.floor(Math.random() * 256);
        let randomG = Math.floor(Math.random() * 256);
        let randomB = Math.floor(Math.random() * 256);
        grid.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    })
}


let buttonsContainer = document.querySelector('.buttons');
buttonsContainer.addEventListener('click', (e) => {
    let target = e.target;

    switch(target.id){
        case 'newSketch':
            newSketch();
            break;
        case 'showGrids':
            showGrids();
            break;
        case 'Rainbow':
            rainbow();
            break;
        case 'Darken':
            darkening();
            break;
        case 'Fill':
            colorGrid();
            break
    }
})