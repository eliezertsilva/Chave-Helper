# Testing Guide: Automated Inventory Management

## Prerequisites

- Backend server running on `http://localhost:5000`
- Frontend running on `http://localhost:5173`
- Database synced with ServiceItem model
- At least one client and some products in inventory

## Test Scenarios

### Scenario 1: Add Products to Service Order

**Steps:**

1. Navigate to **Services** page
2. Click **"Nova OS"** button
3. Fill in service details:
   - Select a client
   - Enter description (e.g., "Cópia de chave + troca de fechadura")
   - Enter estimated value
4. Click **"Abrir OS"**
5. In the services table, find the newly created OS
6. Click the **box icon (📦)** in the Actions column
7. In the modal that opens:
   - Search for a product
   - Select product from dropdown
   - Enter quantity
   - Click **"Adicionar"**
8. Repeat step 7 to add more products
9. Verify the total value is calculated correctly
10. Click **"Fechar"**

**Expected Result:**

- Products are successfully added to the service
- Total value is displayed correctly
- Products list shows product name, quantity, unit price, and subtotal

---

### Scenario 2: Complete Service with Sufficient Stock

**Prerequisites:**

- Service order with products added
- Products have sufficient stock

**Steps:**

1. Navigate to **Services** page
2. Find the service order
3. Change status dropdown to **"Concluído"**
4. Wait for confirmation

**Expected Result:**

- ✅ Status changes to "Concluído"
- ✅ Inventory stock is automatically decreased
- ✅ Completion date is set
- Navigate to **Inventory** to verify stock decreased

**Verification:**

```
Before: Product A - Stock: 10
Service uses: 3 units
After: Product A - Stock: 7
```

---

### Scenario 3: Complete Service with Insufficient Stock

**Prerequisites:**

- Service order with products added
- At least one product has insufficient stock

**Steps:**

1. Navigate to **Inventory** page
2. Find a product used in the service
3. Manually reduce its stock to less than required
4. Navigate to **Services** page
5. Try to change service status to **"Concluído"**

**Expected Result:**

- ❌ Status change is blocked
- ❌ Error message appears: "Estoque insuficiente para [Product Name]. Disponível: X, Necessário: Y"
- ✅ Service remains in previous status
- ✅ No stock is decreased

---

### Scenario 4: Remove Product from Service

**Steps:**

1. Navigate to **Services** page
2. Click the **box icon (📦)** on a service
3. In the products list, click the **trash icon (🗑️)** next to a product
4. Confirm deletion
5. Verify product is removed from the list
6. Verify total value is recalculated

**Expected Result:**

- Product is removed from service
- Total value updates correctly
- No inventory changes occur (stock only changes on completion)

---

### Scenario 5: Multiple Products Workflow

**Complete Test:**

1. **Create Service:**

   - Client: "João Silva"
   - Description: "Manutenção completa"
   - Value: R$ 150.00

2. **Add Products:**

   - Chave Tetra (Qty: 2, Price: R$ 15.00) = R$ 30.00
   - Fechadura Yale (Qty: 1, Price: R$ 80.00) = R$ 80.00
   - Cadeado Master (Qty: 3, Price: R$ 25.00) = R$ 75.00
   - **Total: R$ 185.00**

3. **Verify Inventory Before:**

   - Chave Tetra: 50 units
   - Fechadura Yale: 20 units
   - Cadeado Master: 30 units

4. **Complete Service:**

   - Change status to "Concluído"

5. **Verify Inventory After:**
   - Chave Tetra: 48 units (-2)
   - Fechadura Yale: 19 units (-1)
   - Cadeado Master: 27 units (-3)

---

## API Testing (Optional)

### Using Swagger UI

1. Navigate to `http://localhost:5000/api-docs`
2. Find **ServiceItems** section
3. Test endpoints:

**GET /api/service-items/service/{serviceId}**

```json
Response: [
  {
    "id": 1,
    "ServiceId": 1,
    "ProductId": 5,
    "quantity": 2,
    "unitPrice": "15.00",
    "Product": {
      "id": 5,
      "name": "Chave Tetra",
      "stock": 50
    }
  }
]
```

**POST /api/service-items**

```json
Request Body:
{
  "ServiceId": 1,
  "ProductId": 5,
  "quantity": 2,
  "unitPrice": 15.00
}
```

**PUT /api/services/{id}/status**

```json
Request Body:
{
  "status": "completed"
}

Success Response:
{
  "id": 1,
  "status": "completed",
  "completionDate": "2026-01-12T22:56:00.000Z"
}

Error Response (Insufficient Stock):
{
  "message": "Estoque insuficiente para Chave Tetra. Disponível: 1, Necessário: 2"
}
```

---

## Common Issues & Solutions

### Issue 1: Modal doesn't open

**Solution:** Check browser console for errors. Ensure ServiceItemsModal.jsx is in the correct path.

### Issue 2: Products not loading in modal

**Solution:** Verify inventory has products. Check network tab for API errors.

### Issue 3: Stock not decreasing

**Solution:**

- Ensure service has products added
- Check that status changed to "completed" (not "Concluído" in dropdown)
- Verify backend logs for errors

### Issue 4: "Cannot read property 'Product' of undefined"

**Solution:** Ensure ServiceItem model includes Product association in the query.

---

## Success Criteria

✅ Can add products to service orders
✅ Can remove products from service orders
✅ Total value calculates correctly
✅ Stock decreases automatically on completion
✅ Insufficient stock prevents completion
✅ Error messages are clear and helpful
✅ UI is responsive and intuitive

---

## Next Steps After Testing

1. **Add Edit Functionality:** Allow editing service items (change quantity)
2. **Stock Warnings:** Visual indicators when adding products with low stock
3. **Service History:** Show which products were used in completed services
4. **Bulk Operations:** Add multiple products at once
5. **Print Service Order:** Generate PDF with product list
