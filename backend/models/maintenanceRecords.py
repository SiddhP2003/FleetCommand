from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey
from db.base import Base

class MaintenanceRecords(Base):
    __tablename__ = "maintenance_records"

    id = Column(Integer, primary_key=True)
    service_date = Column(Date, nullable=False)
    service_type = Column(String(100), nullable=False)
    description = Column(String(255))
    cost = Column(Float, nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
