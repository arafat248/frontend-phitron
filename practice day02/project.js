
const allLoadProduct = () => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((data)=>{
                displayproduct(data);
            });
};
const displayproduct = (products) =>{
    const productcontainer = document.getElementById("product-container");
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("card"); 
        div.innerHTML = `
        <img class="img" src=${product.image} alt=""/>
        <h3>price: ${product.price}</h3>
        <h5>${product.title}</h5>
        <p>${product.description.slice(0,40)}</p>
        <button onclick="singleProduct('${product.id}')">Datail</button>
        <button onclick="handleaddtocard('${product.title}',${product.price})" >Add to cart</button>
        `;
        productcontainer.appendChild(div);
    });
};
const handleaddtocard = (name,price) =>{
    const productCount = document.getElementById("count").innerText;
    let convertCount = parseFloat(productCount); 
    convertCount = convertCount + 1;
    document.getElementById("count").innerText = convertCount;
    const container = document.getElementById("card-mani-container");
    console.log(name, price);
    const div = document.createElement("div");
    div.innerHTML=`
    <p>name: ${name}</p>
    <h3 class="price">price: ${price}</h3>
    `;
    container.appendChild(div);
    UpdatTotal();
};
const UpdatTotal = () => {
    const allPrice = document.getElementsByClassName("price");
    let count = 0;
    for(const element of allPrice){
        count = count + parseFloat(element.innerText);
    }
    document.getElementById("total").innerText = count.toFixed(2);
};


const singleProduct = (id) => {
    console.log(id);
    fetch('https://fakestoreapi.com/products/${id}')
            .then((res)=>res.json())
            .then((json)=>console.log(json));

};
allLoadProduct ();