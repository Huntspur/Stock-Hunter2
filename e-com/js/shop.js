let cartIcon = document.querySelector('#Login');
let cart = document.querySelector('.cart');
let closeCart= document.querySelector('#close-cart');

cartIcon.onclick = () =>{
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};



if(document.readyState =='loading'){
  document.addEventListener("DOMContentLoaded", ready);

}else{
  ready();
}
function ready(){
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
for (var i = 0; i < removeCartButtons.length; i++) {
  var button = removeCartButtons[i];
  button.addEventListener("click", removeCartItem);
}

var quantInp = document.getElementsByClassName("cart-quantity");
for (var i = 0; i < quantInp.length; i++) {
  var input = quantInp[i]
  input.addEventListener("change", quantityChanged)
}
var addCart = document.getElementsByClassName('add-button')
for (var i = 0; i < addCart.length; i++) {
  var button = addCart[i]
  button.addEventListener("click", addCartClicked)
}
document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)

}
function buyButtonClicked(){
  alert('alert ')
 
}

function quantityChanged(event){
  var input = event.target
  if(isNaN(input.value) || input.value <= 0 ){
    input.value = 1
  }
  updateTotal()
}

function addCartClicked(event){
  var button = event.target
  var shopProducts = button.parentElement
  var title = shopProducts.parentElement.getElementsByClassName('product-title')[0].innerHTML
  var price = shopProducts.parentElement.getElementsByClassName('price')[0].innerHTML
  var productImg = shopProducts.parentElement.getElementsByClassName('img')[0].src;
  addProductToCart(title,price,productImg)
  console.log(title, price,productImg)
  updateTotal()

}

function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box")
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if(cartItemNames[i].innerHTML == title)
    {
      alert('wah wah')
      return;
    }
  }


var cartBoxContent = `
                  
                      <img src="${productImg}" alt="" class="cart-img">
                      <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value = "1" class="cart-quantity" >
                      </div>
                      <img src="/img/trash-alt-svgrepo-com.svg" style="width:50%;" class="cart-remove">
`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}


function removeCartItem(){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  
}

function updateTotal(){
  var cartCont = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartCont.getElementsByClassName('cart-box');
  var total = 0
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceEl =cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
    var price = priceEl.innerHTML
    var quantity = quantityElement.value;
    total = total + price * quantity
  }
    total = Math.round(total * 100)/100

    document.getElementsByClassName('total-price')[0].innerHTML =  total


  


}
