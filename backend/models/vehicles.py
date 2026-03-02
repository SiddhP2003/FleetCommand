from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True)
    vehicle_number = Column(String(17), nullable=False)
    model = Column(String(100), nullable=False)
    manufacturer = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
