let basket = JSON.parse(localStorage.getItem("data")) || [];
let subTotal = document.getElementById("subtotal-number"); 
let calculation = () => {
    let cartAmount = document.getElementById("cartamount");
    cartAmount.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
  };
  
  calculation();

let itemCard = document.getElementById("cart-item-inner");

let generateCartItem =()=>{
  return(itemCard.innerHTML=basket.map((x)=>{
    let {id, quantity}=x;
    let search = productData.find((y) => y.id === id) || [];
    return`
    <div class="col-lg-10 col-12" id="cart-item-card">
      <img src="${search.img}" style="width:110px; height:170px">
      <div class="detail">
        <h5>${search.name}</h5>
        <br>
        <div class="priceWithQuantity">
          <h4>$ ${search.price}</h4>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${quantity}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
        <br>
        <button type="button" class="btn btn-danger" onclick="removeItem(${id})">Delete Item</button>
      </div>
    </div>
    `;
  }).join(""));
}
generateCartItem();

let increment = (id) => {
  let selectedItem = id;
  let search=basket.find((x)=>x.id===selectedItem.id);

  if(search===undefined){
      basket.push({
          id:selectedItem.id,
          quantity:1,
      });
  }
  else{
      search.quantity+=1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.quantity === 0) return;
  else {
    search.quantity -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.quantity !== 0);
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.quantity;
  calculation();
  totalPrice();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  totalPrice();
};

let clearCart = () => {
  basket = [];
  generateCartItem();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  totalPrice();
};

let totalPrice =()=>{
  let amount = basket.map((x)=>{
    let {id, quantity} = x;
    let search = productData.find((y) => y.id === id)||[];
    return search.price*quantity;
  })
  .reduce((x, y)=> x + y, 0);
  subTotal.innerHTML=amount;
};
totalPrice();