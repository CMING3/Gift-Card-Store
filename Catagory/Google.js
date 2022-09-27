/**
 * !GoogleCatagoryData
 **/
 let googleItem = [
    {
        id:"google500",
        name:"Google card (HKD500)",
        price:500,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia similique quos officiis dolorum fugit sit.",
        img:"../images/img-3.jpg",
    },
    {
        id:"google100",
        name:"Google card (HKD100)",
        price:100,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia similique quos officiis dolorum fugit sit.",
        img:"../images/img-3.jpg",
    },
    {
        id:"google5000",
        name:"Google card (JPY5000)",
        price:300,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia similique quos officiis dolorum fugit sit.",
        img:"../images/img-4.jpg",
    },
    {
        id:"google3000",
        name:"Google card (JPY3000)",
        price:200,
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia similique quos officiis dolorum fugit sit.",
        img:"../images/img-4.jpg",
    },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let GoogleShop = document.getElementById("GoogleShop");

let generateShop=()=>{
    return ( GoogleShop.innerHTML = googleItem.map((x)=>{
        let{ id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        return`
            <div class="item col-lg-5 col-12 shadow" id=product-id-${id}>
                <img src="${img}" style="width:170px; height:250px">
                <div class="details">
                    <h4>${name}</h4>
                    <p>
                        ${desc}
                    </p>
                    <div class="priceWithQuantity">
                        <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.quantity === undefined ? 0 : search.quantity}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    </div>
                </div>
            </div>
        `;
    }).join(""));
};
generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
  };
  let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.quantity;
    calculation();
  };
  
  let calculation = () => {
    let cartAmount = document.getElementById("cartamount");
    cartAmount.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
  };
  
  calculation();