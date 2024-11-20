# Transaction Management API

This API allows managing financial transactions, including creating, updating, and retrieving transactions by user ID or transaction ID.

---

## Endpoints

### **1. Create Transaction**
**POST** `/api/transactions`

**Description:** Creates a new transaction.

**Request Body (JSON):**
```json
{
    "user_id": "673daecbb6055f5556831db1",
    "amount": 500,
    "transaction_type": "WITHDRAWAL"
}
```

**Response:**
```json
{
    "transaction_id": "673db02c3356960c3de108c2",
    "amount": 500,
    "transaction_type": "WITHDRAWAL",
    "status": "PENDING",
    "user": "673daecbb6055f5556831db1",
    "timestamp": "2024-11-16T10:30:00Z"
}
```

---

### **2. Update Transaction by ID**
**PUT** `/api/transactions/:id`

**Description:** Updates the status of a transaction by its ID.

**Request URL:**  
`http://localhost:4000/api/transactions/673dc5853a9c8c651f0030f`

**Request Body (JSON):**
```json
{
    "status": "COMPLETED"
}
```

**Response:**
```json
{
    "transaction_id": "673dc5853a9c8c651f0030f",
    "amount": 500,
    "transaction_type": "WITHDRAWAL",
    "status": "COMPLETED",
    "user": "673daecbb6055f5556831db1",
    "timestamp": "2024-11-16T10:30:00Z"
}
```

---

### **3. Get Transactions by User ID**
**GET** `/api/transactions`

**Description:** Retrieves all transactions for a specific user.

**Request URL:**  
`http://localhost:4000/api/transactions?user_id=673daecbb6055f5556831db2`

**Query Parameters:**
- `user_id`: The ID of the user whose transactions you want to retrieve.

**Response:**
```json
[
    {
        "transaction_id": "673db02c3356960c3de108c2",
        "amount": 500,
        "transaction_type": "WITHDRAWAL",
        "status": "PENDING",
        "user": "673daecbb6055f5556831db2",
        "timestamp": "2024-11-16T10:30:00Z"
    },
    {
        "transaction_id": "673dc5853a9c8c651f0030f",
        "amount": 1000,
        "transaction_type": "DEPOSIT",
        "status": "COMPLETED",
        "user": "673daecbb6055f5556831db2",
        "timestamp": "2024-11-16T11:00:00Z"
    }
]
```

---

### **4. Get Transaction by ID**
**GET** `/api/transactions/:id`

**Description:** Retrieves a specific transaction by its ID.

**Request URL:**  
`http://localhost:4000/api/transactions/673db02c3356960c3de108c2`

**Response:**
```json
{
    "transaction_id": "673db02c3356960c3de108c2",
    "amount": 500,
    "transaction_type": "WITHDRAWAL",
    "status": "PENDING",
    "user": "673daecbb6055f5556831db1",
    "timestamp": "2024-11-16T10:30:00Z"
}
```


