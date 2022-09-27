let basket = JSON.parse(localStorage.getItem("data")) || [];

  
let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
  };
  
  calculation();