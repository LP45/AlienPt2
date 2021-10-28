
window.addEventListener("load", (event) => {
//create space ships class with name, hull, fire power and accuracy as properties 
    class Space_ships{
        constructor(name, hull, firePower, accuracy){
            this.name = name,
            this.hull = hull,
            this.firePower = firePower,
            this.accuracy = accuracy
        }
    }
//create the you space ship name USS Schwarzenegger, hull is 20, fire power is 5 and accuracy rate is .7
var USS_Schwarzenegger = new Space_ships("USS_Schwarzenegger", 20, 5, .7)
//create empty array of alien ship
var alienShip = [] 
//create function to create mulitple alien ships
createAlienShip = (numOfShips) => { 
    for (let i=0; i <= numOfShips-1; i++) { //use for..loop to create array of 6 objects
        var hull = Math.floor(Math.random() * (7 - 3)) + 3  //hull - random number between `3` and `6`
        var firePower= Math.floor(Math.random() * (5 - 2)) + 2  //firepower - random number between `2` and `4`
        //var accuracy = parseFloat((Math.random() * (0.8 - 0.6) + 0.6).toFixed(1)) //accuracy - random number between `.6` and `.8`
        var accuracy = (Math.floor(Math.random() * 3) + 6) / 10;//find this from https://tmdarneille.gitbook.io/seirfx/javascript/oop1/oop-space-battle#build
        alienShip[i] = new Space_ships("Alien ship "+ (i+1), hull , firePower, accuracy) //use Space_ships class to create alien ships
        alienShip.push(alienShip[i]) //and add to alieanShip array
    }
    if (alienShip[numOfShips-1].name == alienShip[numOfShips].name) {  //I don't know why it keep make duplicate last index in alienShip array so I check if any duplicate
        alienShip.pop() //if yes, take the duplicate index out
    }
}

//pop up message "you have 6 alien ships to distoy! You start first. Do you want to attack 1st alien ship?"
//show the USS ship properties in the message
var alienTurn = false
var ussTurn = true
var ussAttack =() =>{
    //if alien ship is a last ship of alienShip array and alienship still has hull and 
    //if random number less than uss accuracy, the attack success
    if (alienShip.length == 1 && alienShip[0].hull > 0 && Math.random()<= USS_Schwarzenegger.accuracy){
        alienShip[0].hull -= USS_Schwarzenegger.firePower  //alien hull subtact by uss fire power
        //alienShip[0].hull -= 10
        alert("Hit the targer, " + alienShip[0].name + " !")
        if(alienShip[0].hull <=0){
            alert("You win the game!!!") 
            alienTurn = false //end the loop
        } else {
            alert(alienShip[0].name + " has " + alienShip[0].hull+ " hull left. Do you want to keep attacking?")
            ussAttack()
        }
    } else if(alienShip.length > 1 && alienShip[0].hull > 0 && Math.random()<= USS_Schwarzenegger.accuracy) { //if random number less than uss accuracy, the attack success
        alienShip[0].hull -= USS_Schwarzenegger.firePower  //alien hull subtact by uss fire power
        //alienShip[0].hull -= 10   //This is for testing
        alert("Hit the targer!")
        alienTurn = false
        ussTurn = true
        
        if (alienShip[0].hull <= 0 && alienShip.length >= 1) {
            alert(alienShip[0].name + " destroyed!")
            alienShip.shift()
            if (confirm("Do you want to keep attacking? click OK to attack or Cancel to retreat")) {
                ussAttack()
            } else {
                alert("Alien ships get away. Game Over!!")
            }
        } else { 
            alert(alienShip[0].name + " has " + alienShip[0].hull+ " hull left. Do you want to keep attacking?")
            ussAttack()
        }   
    } else {
        window.alert("Miss it! Get ready...Alien ship attack!")//if miss, alien turn and call alienAttack function
        alienTurn = true
        ussTurn = false
        alienAttack()
    }   
}
var alienAttack = () => {
    if (USS_Schwarzenegger.hull > 0 && alienTurn == true && Math.random()<= alienShip[0].accuracy) {
       alert("You get hit") 
       USS_Schwarzenegger.hull -= alienShip[0].firePower
       //USS_Schwarzenegger.hull -= 3 //This is for testing
       alienTurn = true
        if(USS_Schwarzenegger.hull > 0 && alienTurn == true) {
            alert("you have "+ USS_Schwarzenegger.hull+ " hull remain! Alien attach again!")
            alienAttack()
        } else {
        alert("your ship destroyed! Game Over")
        }
    } else {
        window.alert("Alien attacks and Miss it!!Now your turn")
        ussTurn= true
        alienTurn= false
        //ask player to attack or not
        if (confirm("Do you want to keep attacking? click OK to attack or Cancel to retreat")) {
            ussAttack()
        } else {
            alert("Alien ships get away. Game Over!!")
        }
    }
}

//create function to start the game
var startGame = () => {
    alert("Alert!!! We detected Romulan ships in Federation territory approaching us with vessel ready to attack!")
//if player answer Yes! to attack 1st alien ship, call ussAttack function
    if (confirm("Shield Up! you have 6 alien ships to distoy! You start first. Do you want to attack 1st alien ship?")) {
        //to reset USS_Schwarzenegger's value to the state when it's first created
        if(USS_Schwarzenegger){
            USS_Schwarzenegger.name ="USS_Schwarzenegger"
            USS_Schwarzenegger.hull = 20
            USS_Schwarzenegger.firePower = 5
            USS_Schwarzenegger.accuracy = .7
            alienShip = []
        }
        alert("You are " + USS_Schwarzenegger.name+ " and has "+ USS_Schwarzenegger.hull + " hull , "+ USS_Schwarzenegger.firePower+ " fire Power, "+
        USS_Schwarzenegger.accuracy+ " accuracy rate! ready to ATTACK!")
        createAlienShip(6) //call createAlienShip function
        //alert(alienShip[0].firePower)//for testing
        ussAttack() //call ussAttack function to start the game
    } else {
        alert("They attack us, You die!! Game Over!!")
    }

}
document.getElementById("startGame").addEventListener("click",startGame)
});