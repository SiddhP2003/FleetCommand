from pydantic import BaseModel, EmailStr
from typing import Optional 

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None 
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class UserOut(UserBase):
    id: int
    is_admin: bool

    class Config: 
        from_attributes = True
        
# class UserWithVehicles(UserOut):
#     vehicles: List[VehicleOut] = []
