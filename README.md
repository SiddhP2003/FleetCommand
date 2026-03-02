# 🚗 FleetCommand

A vehicle management system that allows users to:
- Register and manage vehicles  
- Track service and maintenance history  
- Monitor total maintenance costs  
- Manage users and admin roles  

Built with a modern **FastAPI + MySQL backend** and **React + TypeScript frontend**.

---

# 🛠 Technology Stack

## 🔹 Frontend
- React (TypeScript)
- Vite
- Axios (API communication)
- React Router
- shadcn/ui (UI components)
- TailwindCSS
- Lucide React (icons)

## 🔹 Backend
- FastAPI
- SQLAlchemy (ORM)
- Pydantic
- MySQL
- PyMySQL
- Uvicorn (ASGI server)

## 🔹 Database
- MySQL 8+

---

# 🗄 Database Schema Explanation

The system uses three core tables:

---

## 👤 users

Stores registered users.

| Column    | Type          | Description |
|-----------|--------------|------------|
| id        | Integer (PK) | Unique user ID |
| name      | String(255)  | Full name |
| email     | String(255)  | Unique email |
| password  | String(255)  | Hashed password |
| is_admin  | Boolean      | Admin role flag |

**Relationship:**
- One user → Many vehicles

---

## 🚘 vehicles

Stores vehicles owned by users.

| Column          | Type          | Description |
|-----------------|--------------|------------|
| id              | Integer (PK) | Unique vehicle ID |
| vehicle_number  | String       | License / vehicle number |
| model           | String       | Vehicle model |
| manufacturer    | String       | Vehicle manufacturer |
| year            | Integer      | Manufacturing year |
| owner_id        | Integer (FK) | References users.id |

**Relationship:**
- One vehicle → Many maintenance records
- Many vehicles → One user

---

## 🔧 maintenance_records

Stores service history for each vehicle.

| Column        | Type          | Description |
|--------------|--------------|------------|
| id           | Integer (PK) | Unique record ID |
| vehicle_id   | Integer (FK) | References vehicles.id |
| service_type | String       | Type of service |
| service_date | Date         | Date of service |
| description  | Text         | Optional notes |
| cost         | Float        | Service cost |

---

### Logical Relationship

```
User (1) ────< Vehicle (1) ────< MaintenanceRecord
```

---

# Local Setup Instructions

---

# Clone the Repository

```bash
git clone https://github.com/your-username/vehicle-management-system.git
cd vehicle-management-system
```

---

# Backend Setup (FastAPI + MySQL)

## Step 1: Create Virtual Environment

```bash
cd backend
python -m venv venv
```

Activate environment:

**Mac/Linux**
```bash
source venv/bin/activate
```

**Windows**
```bash
venv\Scripts\activate
```

---

## Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

Or manually:

```bash
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv passlib[bcrypt]
```

---

## Step 3: Create MySQL Database

Log into MySQL:

```sql
CREATE DATABASE vehicle_management;
```

---

## Step 4: Configure Environment Variables

Create a `.env` file inside `/backend`:

```
DATABASE_URL=mysql+pymysql://root:password@localhost/vehicle_management
```

Replace `root` and `password` with your MySQL credentials.

---

## Step 5: Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
127.0.0.1:8000
```

Swagger documentation available at:

```
127.0.0.1:8000/docs
```

---

# 3️⃣ Frontend Setup (React + Vite)

## Step 1: Install Dependencies

```bash
cd frontend
npm install
```

---

## Step 2: Configure API Base URL

Open:

```
src/api.ts
```

Ensure:

```ts
baseURL: "http://localhost:8080"
```

---

## Step 3: Run Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:8080
```

---

# 🔐 Enable CORS (Required)

In `backend/app/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
