from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db.session import get_db
from schemas.users import UserCreate, UserUpdate, UserOut
from routers import users as user_crud

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return user_crud.create_user(db, user)

@router.get("/", response_model=List[UserOut])
def get_users(db: Session = Depends(get_db)):
    return user_crud.get_users(db)

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = user_crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

@router.get("{/{email}", response_model=UserOut)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email(db, email)
    if not email:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = user_crud.update_user(db, user_id, user_update)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

# @router.delete("/{user_id}")
# def delete_user(user_id: int, db: Session = Depends(get_db)):
#     user = user_crud.delete_user(db, user_id)
#     if not user:
#         raise HTTPException(status_code=404, detail="User Not Found")
#     return {"message": "User deleted"}


