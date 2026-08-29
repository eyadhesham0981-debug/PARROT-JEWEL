// =========================
// PARROT JEWEL
// MAIN JAVASCRIPT
// =========================

// =========================
// ELEMENTS
// =========================

const mobileMenuBtn = 
document.querySelector(".mobile-menu-btn");
const mainNav = 
document.querySelector(".main-nav");

const cartPanel = 
document.querySelector(".cart-panel");
const overlay = 
document.querySelector(".overlay");

const cartItems = 
document.querySelector(".cart-items");
const cartCount = 
document.getElementById("cartCount");
const cartTotal = 
document.getElementById("cartTotal");

const cartButton = 
document.getElementById("cartBtn");

 // =========================
 // CART DATA
 // =========================

 let cart = [];

 // =========================
 // MOBILE MENU
 // =========================

 if (mobileMenuBtn && mainNav) {

    mobileMenuBtn.addEventListener("click", () => {

        mainNav.classList.toggle("open");
    });

 }

 // =========================
 // CLOSE MOBILE MENU
 // =========================

 if (mainNav) {

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");
        });

    });

 }

 // =========================
 // CART OPEN
 // =========================

 function openCart() {

    if (cartPanel) {
        cartPanel.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("active");
    }

}

// =========================
// CART CLOSE
// =========================

function closeCart() {

    if (cartPanel) {
        cartPanel.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }

}

// =========================
// CART BUTTON
// =========================

if (cartButton) {

    cartButton.addEventListener("click", openCart);

}

const cartCloseButton = 
document.querySelector(".cart-header button");

if (cartCloseButton) {

    cartCloseButton.addEventListener("click", closeCart);

}

if (overlay) {

    overlay.addEventListener("click", closeCart);

}

// =========================
// PRODUCT FILTERS
// =========================

const filterButtons = 
document.querySelectorAll(".filter-btn");
const productCards = 
document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = 
        button.dataset.filter;

        productCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter

            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});

// =========================
// ADD TO CART
// =========================

document.querySelectorAll(".add-cart-btn").forEach(button => {


    button.addEventListener("click", function () {

        // تحديد كارت المنتج الي تم الضغط علية
        const productCard = 
        this.closest(".product-card");

        if (!productCard) {
            return;
        }

        // اسم المنتج
        const titleElement = 
        productCard.querySelector(".product-title");

        const title =  
        titleElement
                  ?
titleElement.textContent.trim()
            : "منتج";

            // سعر المنتج
            const priceElement = 
    productCard.querySelector(".product-price");

    const price = 
    priceElement
                ?
    priceElement.textContent.trim()
                : "0ج.م";

                // صورة المنتج
                const imageElement = 
            productCard.querySelector("img");

            const image = 
    imageElement
               ? imageElement.src 
               : "";

               // هل المنتج موجود بالفعل في السلة؟
               const existingProduct = 
cart.find(
        item => item.title
=== title
);

if (existingProduct) {


existingProduct.quantity += 1;

} else {

    cart.push({
        title: title,
        price: price,
        image: image,
        quantity: 1
    });

}

// تحديث السلة والعداد والسعر
updateCart();

// فتح السلة 
openCart();

    });

});

// =========================
// UPDATE CART
// =========================

function updateCart() {

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <div class="empty-cart">
        <span>🛒</span>
        <p>السلة فارغة</p>
        
        </div>
        `;

    } else {

        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            const cartItem = 

            document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
            <div style="
            display:flex;
            align-items:center;
            gap:10px;
            margin-bottom:15px;">
            
            <img
            src="${item.image}"
            alt="${item.title}"
            style="
            width:65px;
            height:65px;
            object-fit:cover;
            border-radius:10px;">
            
            <div style="flex:1;">
            
            <strong>${item.title}</strong>
            
            <p>
            style="margin:4px 0;">
            ${item.price}</p>
            
            <small>
            الكمية:
            ${item.quantity}</small>
            
            </div>
            
            <button
            type="button"
            
            onclick="removeFromCart(${index})"
            style="background:#f3f4f6;
            border-radius:8px;
            padding:7px;
            border:0;
            cursor:pointer;">
            🗑</button>
            
            </div>
            
            `;

            cartItems.appendChild(cartItem);

        });

    }

    updateCartCount();

    updateCartTotal();

}

// =========================
// CART COUNT
// =========================

function updateCartCount() {

    if (!cartCount) {
        return;
    }

    const count = 
    cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    cartCount.textContent = count;

}

// =========================
// CART TOTAL
// =========================

function updateCartTotal() {

    if (!cartTotal) {
        return;
    }

    let total = 0;

    cart.forEach(item => {

    // تحويل السعر الي رقم بأمان 
    let price = 0;

    if (typeof item.price === "number") {
        price = item.price;
    } else if (typeof item.price === "string") {
        price = parseFloat(
            item.price
                      .replace(/[^\d.]/g, "")
        ) || 0;

    }

    // حساب السعر × الكمية
    const quantity = 
    Number(item.quantity) || 1;

    total += price *
    quantity;
});

// عرض الإجمالي 
cartTotal.textContent = `${total.toLocaleString("en-US")}
ج.م`;
}

// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}

// =========================
// DETAILS
// =========================

document.querySelectorAll("details-btn").forEach(button => {

    button.addEventListener("click", function () {

        const productCard = 
        this.closest(".product-card");

        if (!productCard) {
            console.error("لم يتم العثور علي بطاقة المنتج.");
            return;
        }

        const title = 

        productCard.querySelector(".product-title")?.textContent.trim() || "منتج";

        const description = 

        productCard.querySelector(".product-description")?.textContent.trim() || "لا يوجد وصف للمنتج دة.";

        const price = 

        productCard.querySelector(".product-price")?.textContent.trim() || "غير محدد";

        alert(
            "🦜 PARROT JEWEL\n\n"
            +
            "📦" + title +
            "\n\n" +
            "📝" + description +
            "\n\n" +
            "💰 السعر:" + price
        );

    });

});

// =========================
// CHECKOUT
// =========================

const checkoutButton = 
document.querySelector(".checkout-btn");

if (checkoutButton) {

    checkoutButton.onclick = 
    function () {

        if (cart.length === 0) {
         alert("السلة فارغة.");
            return;

        }

        alert("لإتمام الطلب يرجي التواصل مع هذا الرقم عبر الواتساب 01104085045.");
    };

}

// =========================
// INITIAL UPDATE
// =========================

updateCart();

console.log("PARROT JEWEL JavaScript is running!");