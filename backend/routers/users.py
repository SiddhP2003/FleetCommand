from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models.users import User
from schemas.users import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def hash_password(password: str):
#     return pwd_context.hash(password)

def create_user(db: Session, user: UserCreate):
    db_user = User(
        name = user.name,
        email = user.email,
        password = user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_users(db: Session):
    return db.query(User).all()

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    for key, value in user_update.model_dump(exclude_unset=True).items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user

# def delete_user(db:Session, user_id: int):
#     db_user = get_user(db, user_id)
#     if not db_user:
#         return None
    
#     db.delete(db_user)
#     db.commit()
#     return db_user
