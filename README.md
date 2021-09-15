## Install

$ git clone https://github.com/AnnieDoDo/Inventory-system.git

$ npm install

$ node index.js

## Database Schema
### Inventory
 Table Inventory | type | feature 
------|----------------|---------------  
id | TEXT | primary key | NOT NULL
name | TEXT | NOT NULL
current_inventory | INTEGER | NOT NULL
default_inventory | INTEGER | NOT NULL
preorder | INTEGER | NOT NULL
created_at | INTEGER | NOT NULL | unix time
updated_at | INTEGER | NOT NULL | unix time

## API

### Environments

| Name |  Url |
| -- | -- |
| localhost | localhost:3500 |

### GET /
Get all inventory quantity
**Resource URL**
`/`

**Query Key**
| Name | Format | Required | Description |
| -- | -- | -- | -- |


**Example Request**
`http://{localhost}/`

**Example Response**
* Success
```json=
{
    "result":
    [
        {"id":"item5","currentInventory":50,"defaultInventory":50},
        {"id":"item1","currentInventory":10,"defaultInventory":10},
        {"id":"item2","currentInventory":20,"defaultInventory":20},
        {"id":"item3","currentInventory":30,"defaultInventory":30},
        {"id":"item4","currentInventory":40,"defaultInventory":40}
    ]
}
```

* Error
```json
{
    "result": false,
    "message": "Error: Get Inventory Error",
    "error": "",
}
```
### POST /
Create new inventory
**Resource URL**
`/`

**Query Key**
| Name | Format | Required | Description |
| -- | -- | -- | -- |

**Request Body**
| Name | Format | Required | Description |
| -- | -- | -- | -- |
| name | STRING | YES | set the name of the  inventory 
| number | INTGER | YES | set the number of the default inventory

**Example Request**
`http://{localhost}/`

```json
{
    "name": "item6",
    "number": 60
}
```
**Example Response**

* Success
```json
{
    "result": true,
    "message": "Success"
}
```

* Error
```json
{
    "result": false,
    "message": "Please fill name and number",
}

{
    "result": false,
    "message": "Error: Create New Inventory Error",
    "error": "",
}

```

### PUT /
Update current inventory or pre-oder quantity
**Resource URL**
`/`

**Query Key**
| Name | Format | Required | Description |
| -- | -- | -- | -- |

**Request Body**
| Name | Format | Required | Description |
| -- | -- | -- | -- |
| name | STRING | YES
| preorder | INTGER | OPTIONAL | If you bring this parameter and the inventory is sufficient, you will add the exact number to the pre-order quantity; otherwise, the system will minus current inventory by 1.


**Example Request**
`http://{localhost}/`

```json
{
    "name": "item5",
    "preoder": 5
}
```

**Example Response**
* Success
```json
{
    "result": true,
    "message": "Success"
}
```
```json
{
    "result": true,
    "message": "Success: No rows update",
}
```
* Error
```json
{
    "result": false,
    "message": "Error: Update Inventory Error",
    "error": "",
}
```