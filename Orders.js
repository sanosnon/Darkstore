document.addEventListener("DOMContentLoaded", () => {
    const ordersList = document.getElementById("orders-list");
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    function renderOrders(){
        if(!ordersList) return;
        ordersList.innerHTML = "";

        orders.forEach((order, index)=>{
            const customer = order.customer || {};
            const total = order.items.reduce((sum, i)=> sum + i.price*i.qty, 0);

            ordersList.innerHTML += `
              <tr>
                <td>${index+1}</td>
                <td>${order.date || "N/A"}</td>
                <td>${order.payment || "N/A"}</td>
                <td>$${total}</td>
                <td><button onclick="toggleDetails(${index})">View</button></td>
              </tr>
              <tr class="order-details" id="customer-${index}" style="display:none">
                <td colspan="5">
                  <strong>Customer Info:</strong><br>
                  Name: ${customer.firstName || "N/A"} ${customer.lastName || ""}<br>
                  Country: ${customer.country || "N/A"}<br>
                  Street: ${customer.street || "N/A"}<br>
                  City: ${customer.city || "N/A"}<br>
                  State/Region: ${customer.state || "N/A"}<br>
                  Postcode/ZIP: ${customer.postcode || "N/A"}<br>
                  Phone: ${customer.phone || "N/A"}<br>
                  Email: ${customer.email || "N/A"}<br>
                </td>
              </tr>
              <tr class="order-details" id="items-${index}" style="display:none">
                <td colspan="5">
                  <strong>Order Items:</strong><br>
                  ${order.items.map(i=>`${i.name} x ${i.qty} - $${i.price*i.qty}`).join("<br>")}
                  ${order.notes ? `<br><strong>Notes:</strong> ${order.notes}` : ""}
                </td>
              </tr>
            `;
        });
    }

    window.toggleDetails = function(index){
        const customerRow = document.getElementById(`customer-${index}`);
        const itemsRow = document.getElementById(`items-${index}`);
        const isVisible = customerRow.style.display === "table-row";
        customerRow.style.display = isVisible ? "none" : "table-row";
        itemsRow.style.display = isVisible ? "none" : "table-row";
    }

    renderOrders();
});