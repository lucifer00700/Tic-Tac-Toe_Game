const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");



let currentPlayer;
let gameGrid;


const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a func to initialise the game

function initGame() {
    currentPlayer = "X";
    gameGrid =  ["","","","","","","","",""];
    // UI par bh boxes ko empty krana pdega on initialisation
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents =  "all";
        //ek chiz missing h
        // game khtm hone k bad hme boxes ko unki css properties wapis deni hogi
        box.classList = `box box${index+1}`; 
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame(); 

function swapTurn() { 
    if(currentPlayer === "X"){
       currentPlayer = "0";
    }
    else{
       currentPlayer = "X";  
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
     // todo
     let answer = "";
     winningPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            // check if X/0 is winner
            if(gameGrid[position[0]] === "X")
              answer = "X";
            else{
              answer = "0"
            }
             // disable pointer events
             boxes.forEach((box) => {
                box.style.pointerEvents = "none";
             })

            // now we know X/0 is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");   // for green background
            boxes[position[2]].classList.add("win");

        }
     });

     if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // if no winner found then there is a tie
    let fill=0;
    gameGrid.forEach((box) => {
        if(box != "")
             fill++;
    })

    if(fill === 9){
    gameInfo.innerText = `Game Drawn`;
    newGameBtn.classList.add("active");
    }
}
     

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;  //updates the ui
        gameGrid[index] = currentPlayer;  // updates the innner logic
        boxes[index].style.pointerEvents = "none";
        swapTurn(); // swap karo turn ko
        checkGameOver(); // check karo koi jeeta to nhi
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);