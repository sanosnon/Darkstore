/* ========= PRODUCTS ========= */
let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name_en: "Cargo Pants", name_ar: "بنطال كارغو", price: 45, category: "pants", img:"images/pants.jpg", discount: 0, status: "", stock: 10 },
  { id: 2, name_en: "Slim Jeans", name_ar: "بنطال جينز", price: 60, category: "pants", img:"images/pants.jpg", discount: 0, status: "", stock: 5 },
  { id: 3, name_en: "Running Shoes", name_ar: "حذاء جري", price: 85, category: "footwear", img:"images/footwear.jpg", discount: 0, status: "", stock: 8 },
  { id: 4, name_en: "Winter Boots", name_ar: "جزمة شتوي", price: 95, category: "footwear", img:"images/footwear.jpg", discount: 0, status: "out", stock: 0 },
  { id: 5, name_en: "Black Balaclava", name_ar: "بالاكلافا أسود", price: 20, category: "balaclava", img:"images/balaclava.jpg", discount: 0, status: "", stock: 15 },
  { id: 6, name_en: "Thermal Balaclava", name_ar: "بالاكلافا حراري", price: 25, category: "balaclava", img:"images/balaclava.jpg", discount: 0, status: "", stock: 12 }
];

/* ========= DOM ========= */
const adminProductList = document.getElementById("admin-product-list");
const addBtn = document.getElementById("add-product-btn");

/* ========= RENDER ========= */
function renderAdminProducts(){
  adminProductList.innerHTML = "";
  products.forEach(p=>{
    adminProductList.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name_en}</td>
        <td>${p.name_ar}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.discount}</td>
        <td>${p.status || ""}</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* ========= ADD / UPDATE PRODUCT ========= */
addBtn.onclick = ()=>{
  const name_en = document.getElementById("prod-name-en").value.trim();
  const name_ar = document.getElementById("prod-name-ar").value.trim();
  const price = parseFloat(document.getElementById("prod-price").value);
  const category = document.getElementById("prod-category").value;
  const img = document.getElementById("prod-img").value.trim();
  const discount = parseFloat(document.getElementById("prod-discount").value) || 0;
  const statusInput = document.getElementById("prod-status").value;
  let stock = parseInt(document.getElementById("prod-stock").value) || 0;

  if(!name_en || !name_ar || !price || !category || !img) return alert("Fill all fields!");

  let existing = products.find(p=>p.name_en===name_en);
  if(existing){
    existing.name_ar = name_ar;
    existing.price = price;
    existing.category = category;
    existing.img = img;
    existing.discount = discount;
    existing.stock = stock;
    // تحديث الحالة تلقائياً إذا Stock صفر
    existing.status = stock === 0 ? "out" : statusInput;
  } else {
    const id = products.length ? products[products.length-1].id +1 : 1;
    const status = stock === 0 ? "out" : statusInput;
    products.push({id,name_en,name_ar,price,category,img,discount,status,stock});
  }

  localStorage.setItem("products", JSON.stringify(products));
  renderAdminProducts();
  alert("Product saved!");
  clearForm();
}

/* ========= EDIT PRODUCT ========= */
function editProduct(id){
  const p = products.find(x=>x.id===id);
  document.getElementById("prod-name-en").value = p.name_en;
  document.getElementById("prod-name-ar").value = p.name_ar;
  document.getElementById("prod-price").value = p.price;
  document.getElementById("prod-category").value = p.category;
  document.getElementById("prod-img").value = p.img;
  document.getElementById("prod-discount").value = p.discount;
  document.getElementById("prod-status").value = p.status || "";
  document.getElementById("prod-stock").value = p.stock || 0;
}

/* ========= DELETE PRODUCT ========= */
function deleteProduct(id){
  if(!confirm("Are you sure?")) return;
  products = products.filter(p=>p.id!==id);
  localStorage.setItem("products", JSON.stringify(products));
  renderAdminProducts();
}

/* ========= CLEAR FORM ========= */
function clearForm(){
  document.getElementById("prod-name-en").value = "";
  document.getElementById("prod-name-ar").value = "";
  document.getElementById("prod-price").value = "";
  document.getElementById("prod-category").value = "";
  document.getElementById("prod-img").value = "";
  document.getElementById("prod-discount").value = "";
  document.getElementById("prod-status").value = "";
  document.getElementById("prod-stock").value = "";
}

/* ========= INIT ========= */
renderAdminProducts();