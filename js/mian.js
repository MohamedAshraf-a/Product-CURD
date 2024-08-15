var productList;

localStorage.getItem("productList") == null
  ? (productList = [])
  : (productList = JSON.parse(localStorage.getItem("productList")));

displayProduct(productList);

function localStorageUpdate() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCateg = document.getElementById("productCateg");
var productDes = document.getElementById("productDes");

var savebtn = document.getElementById("savebtn");

var counter;

function addProduct() {
  if (validateName()&&validatePrice()&&validateCategory() &&validateDescription()  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      categ: productCateg.value,
      des: productDes.value,
    };

    productList.push(product);
    localStorageUpdate();

    displayProduct(productList);
    validateName();

    clearInputs();
    savebtn.classList.add("d-none");
  }
  //  else {alert("Please enter product Name")}
}

function displayProduct(productList) {
  var cartona = ``;

  for (var i = 0; i < productList.length; i++) {
    cartona += `   <tr>
            <td>${i + 1} </td>
            <td>${
              productList[i].newName
                ? productList[i].newName
                : productList[i].name
            }</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].categ}</td>
            <td>${productList[i].des}</td>

            <td> <button class="btn btn-outline-primary" onclick="updateProduct(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
             `;
  }

  document.getElementById("dataList").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorageUpdate();
  console.log(productList);

  displayProduct(productList);
}

function clearInputs() {
  productName.value = ``;
  productPrice.value = ``;
  productCateg.value = ``;
  productDes.value = ``;
}

function updateProduct(index) {
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCateg.value = productList[index].categ;
  productDes.value = productList[index].des;
  savebtn.classList.remove("d-none");

  counter = index;
}

function saveUpdate() {
  productList[counter].name = productName.value;
  productList[counter].price = productPrice.value;
  productList[counter].categ = productCateg.value;
  productList[counter].des = productDes.value;
  localStorageUpdate();
  displayProduct(productList);

  savebtn.classList.add("d-none");
}

function searchProduct(data) {
  var newList = [];

  for (var i = 0; i < productList.length; i++) {
    var newData = data.toLowerCase();
    if (productList[i].name.toLowerCase().includes(data.toLowerCase())) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replaceAll(newData, `<span class="text-danger">${newData}</span>`);
      newList.push(productList[i]);
    }

    displayProduct(newList);
  }
}

function validateName() {
  var regex = /^[A-Za-z]{2,}$/;
  if (regex.test(productName.value)) {


    productName.style.border = "none";
    document.getElementById("invalidName").classList.add("d-none");

    return true;
  } else {

    productName.style.border = "solid 10px red";
    document.getElementById("invalidName").classList.remove("d-none");
    return false;
  }
}
function validatePrice() {
  
  var regex = /^[0-9]{1,4}$/;
  if (regex.test(productPrice.value)) {


    productPrice.style.border = "none";
    document.getElementById("invalidPrice").classList.add("d-none");

    return true;
  } else {

    productPrice.style.border = "solid 4px red";
    document.getElementById("invalidPrice").classList.remove("d-none");
    return false;
  }
}

function validateCategory(){
   
  var regex = /^[A-Z]$/;
  if (regex.test(productCateg.value)) {
    productCateg.style.border = "none";
    document.getElementById("invalidCateg").classList.add("d-none");
    return true;
  } 
  else {

    productCateg.style.border = "solid 4px red";
    document.getElementById("invalidCateg").classList.remove("d-none");
    return false;
  }
}

function validateDescription(){
   
  var regex = /^[\w]{1,}$/;
  if (regex.test(productDes.value)) {


    productDes.style.border = "none";
    document.getElementById("invalidDes").classList.add("d-none");
    return true;
  } else {

    productDes.style.border = "solid 4px red";
    document.getElementById("invalidDes").classList.remove("d-none");
    return false;
  }
}
