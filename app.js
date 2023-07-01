/*
*/
let cart = document.querySelector("header .right .cart-icon");
let decreaseCartedItems = document.querySelector(".decreaseCartedItems");
let increaseCartedItems = document.querySelector(".increaseCartedItems");
let numberOfCartedItemss = document.querySelector(".numberOfCartedItems");
let numberOfCartedItems = Number(numberOfCartedItemss.innerHTML);
let button = document.querySelector(".button");
let numberOfCartM = document.querySelector("#number-of-cart");
let notificationCount = 0;
let normalImage = document.querySelector(".normal-image");
let actualPrice = Number(document.querySelector(".actual-price span").innerHTML);
let message = document.querySelector(".message");

// let numberOfCartMessage = numberOfCartM.innerHTML;
let data;
let arrayOfData = [];
let displayCartedItems;

//numberOfCartedItems
cart.onclick = ()=>{
    document.querySelector(".cart-info").classList.toggle("hide");
}

function cartCalculation(element, bool){
    /* 
        element is the button, and bool is to know if to increase
        or decrease
    */
   element.onclick = ()=>{
       bool ? numberOfCartedItems++ : numberOfCartedItems--
       if(numberOfCartedItems === -1) {
           numberOfCartedItems = 0
        }
       numberOfCartedItemss.innerHTML = numberOfCartedItems;
   }
}
cartCalculation(increaseCartedItems, true);
cartCalculation(decreaseCartedItems, false);

button.onclick = ()=> {
    if(!numberOfCartedItems) return;
    createHTMLText()
    if(!notificationCount){
        numberOfCartM.style.display = "none"
    }
    else{
        numberOfCartM.style.display = "block"
    }
    numberOfCartM.innerHTML = notificationCount;
}
//addNotification()
// 

function createHTMLText(){
    data = {
        img: normalImage.getAttribute("src"),
        num: numberOfCartedItems,
        price: `${actualPrice}.00`,
        amount: `${(numberOfCartedItems * actualPrice)}.00`,
        id: arrayOfData.length
    }
    arrayOfData.push(data);
    // console.log(arrayOfData.length)
    notificationCount = arrayOfData.length;
    // console.log(notificationCount)
    const checkOut = `<button style="padding: 10px 20px; width:95%; margin: 10px; border-radius: 5px;"> Checkout </button>`
    let virtualDom =  arrayOfData.map((datum) =>{
        return `
        <div style="padding: 8px 5px;" class="div" id=a${datum.id}>
            <div class="right">
                <img class="goods-img" src=${datum.img} alt="" width="50px">
                <div class="text header-txt" style="font-size: 9px;">
                    <h2>Fall Limited Edition Sneakers</h2>
                    <h2>$${datum.price} x ${datum.num} <b>$${datum.amount}</b></h2>
                </div>
                <img id="a${datum.id}" style="margin-left: 10px;" class="del-btn" src = "icon-delete.svg"/>
            </div>
        </div>
    `
    }).join("")
    
    
    message.innerHTML = `<div class="over-flow">${virtualDom}</div>${checkOut}`

    deleteItem()
      
}


function deleteItem(){
    let deleteBtn = document.querySelectorAll(".del-btn");
    
    deleteBtn.forEach((btn) =>{
        btn.onclick = (e)=>{
            /*
            Pseudocode:
                        Get the id of the targeted button
                        Get the div of the parentElement
                        newArray = Filter out the button that doesn't contain the id of the clicked
                        Delete the div of parentElement from DOM
                        arrayOfData = newArray


            */
            let id = e.target.id
            const neededElementClassName = e.target.parentElement.className;
            const buttonToBeDeleted =  document.querySelector(`.${neededElementClassName} #${id}`);
            
            
            let newArray = arrayOfData.filter(item => `a${item.id}` !== id);
            buttonToBeDeleted.remove();
            arrayOfData = newArray;
           
            notificationCount--
            numberOfCartM.innerHTML = notificationCount;
            if(!notificationCount){
                numberOfCartM.style.display = "none"
                message.innerHTML = "Your cart is empty"
            }
            else{
                numberOfCartM.style.display = "block"
            }
        }  
        
    })
    
}

const images = document.querySelectorAll(".thumbmail-images-image");
const topImage = document.querySelector(".normal-image");

images.forEach((image, index) =>{
    image.onclick = (e)=> {
        let src = e.target.src;
        topImage.src = src;
    }
})

const navBtn = document.querySelector("#menu-btn");
const middleLinksContainer = document.querySelector(".middle");
navBtn.addEventListener("click", navBar)
function navBar(){
    navBtn.classList.toggle("close");
    middleLinksContainer.classList.toggle("back")
}