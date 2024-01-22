
addEventListener("DOMContentLoaded", (event) => {
    toggleCart();
    mainDesserts();
    const cart = new ShoppingCart();
    addCart(cart);
    clearCart(cart);
    payCart(cart);
});

const products = [
    {
      id: 1,
      name: "Vanilla Cupcakes (6 Pack)",
      price: 12.99,
      category: "Cupcake",
    },
    {
      id: 2,
      name: "French Macaroon",
      price: 3.99,
      category: "Macaroon",
    },
    {
      id: 3,
      name: "Pumpkin Cupcake",
      price: 3.99,
      category: "Cupcake",
    },
    {
      id: 4,
      name: "Chocolate Cupcake",
      price: 5.99,
      category: "Cupcake",
    },
    {
      id: 5,
      name: "Chocolate Pretzels (4 Pack)",
      price: 10.99,
      category: "Pretzel",
    },
    {
      id: 6,
      name: "Strawberry Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 7,
      name: "Chocolate Macaroons (4 Pack)",
      price: 9.99,
      category: "Macaroon",
    },
    {
      id: 8,
      name: "Strawberry Pretzel",
      price: 4.99,
      category: "Pretzel",
    },
    {
      id: 9,
      name: "Butter Pecan Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 10,
      name: "Rocky Road Ice Cream",
      price: 2.99,
      category: "Ice Cream",
    },
    {
      id: 11,
      name: "Vanilla Macaroons (5 Pack)",
      price: 11.99,
      category: "Macaroon",
    },
    {
      id: 12,
      name: "Lemon Cupcakes (4 Pack)",
      price: 12.99,
      category: "Cupcake",
    },
];

const mainDesserts = () => {
    const main = document.querySelector("#mainDesserts");
    products.map(({id,name,price,category})=> {
        main.innerHTML += `
            <div class="col-sm-6">
                <div class="card mb-4" style="box-shadow: 0px 0px 8px 1px rgba(184,134,138,1);">
                    <div class="card-body">
                        <h5 class="card-title fw-bolder">${name}</h5>
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="fst-italic">$${price}</span>
                            <p class="card-text">${category}</p>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                            <button id="${id}" class="btn btn-sm btn-outline-danger btnCart">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>`;
    })
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.shippingcost = 3.99;
    }
    addItems(id,products) {
        const product = products.find(product => id === product.id);
        const { name, price } = product;
        this.items.push(product);
        // currentProduct
        const currentProduct = {};
        this.items.forEach(item=> {
            currentProduct[item.id] = (currentProduct[item.id] || 0) + 1;
        })
        const currentProductCount = currentProduct[product.id];
        // add to ui
        this.addtoUI(id,this.items,name,price,currentProductCount);
        this.calcTotal();
        this.calcShippingCost();
    }
    calcTotal() {
        const total = this.items.reduce((total,item)=>total+item.price,0);
        this.total = parseFloat(total.toFixed(2));
        return this.total;
    }   
    calcShippingCost() {
        this.shippingcost = this.total > 100 ? 0 : 3.99;
        this.total = parseFloat((this.total + this.shippingcost).toFixed(2));
        document.querySelector("#total").textContent='$'+this.total;
        document.querySelector("#shippingcost").textContent='$'+this.shippingcost;
        return this.total;
    }
    addtoUI(id,items,name,price,currentProductCount) {
        const length = items.length;
        document.querySelector("#productslength").textContent=length;
        currentProductCount > 1 
        ? document.querySelector(".times_"+id).textContent = `${currentProductCount}x`
        : document.querySelector(".itemsdiv").innerHTML+=
        `<li class="list-group-item"><span class="times_${id}">${currentProductCount}x</span> ${name} ${price}</li>`;
    }
    clear() {
        if (!this.items.length) {
            alert("Your shopping cart is empty");
            return;
        }
        const dlt = confirm("Are you sure you want to delete the items from your shopping cart?");
        if (dlt) {
            document.querySelector(".itemsdiv").innerHTML='';
            document.querySelector("#productslength").textContent='';
            document.querySelector("#shippingcost").textContent='';
            document.querySelector("#total").textContent='';
            this.items=[];
        }
    }
    pay() {
        if (!this.items.length) {
            alert("Your shopping cart is empty");
            return;
        }
        alert(`Τhe total cost is $${this.total}`)
    }
}

const addCart = (cart) => {
    const btnCart = document.querySelectorAll('.btnCart');
    Array.from(btnCart).forEach(btn=> {
        btn.addEventListener("click",(event)=> {
            cart.addItems(Number(event.target.id), products);
        })
    })
}

const clearCart = (cart) => {
    document.querySelector("#clearcartbtn").addEventListener("click",()=> {
        cart.clear();
    });
}

const payCart = (cart) => {
    document.querySelector("#paybtn").addEventListener("click",()=> {
        cart.pay();
    });
}

const toggleCart = () => {
    document.querySelector("#showcart").addEventListener('click',()=> {
        document.querySelector("#collapseCart").classList.toggle('d-none')
    })
}
