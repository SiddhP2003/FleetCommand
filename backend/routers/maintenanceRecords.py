from sqlalchemy.orm import Session
from models.maintenanceRecords import MaintenanceRecords
from schemas.maintenanceRecords import MaintenanceRecordCreate, MaintenanceRecordUpdate

def create_maintenanceRecord(db: Session, maintenanceRecord: MaintenanceRecordCreate):
    db_record = MaintenanceRecords(**maintenanceRecord.model_dump())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_maintenanceRecord(db: Session, record_id: int):
    return db.query(MaintenanceRecords).filter(MaintenanceRecords.id == record_id).first()

def get_maintenanceRecords_by_vehicle(db: Session, vehicle_id: int):
    return db.query(MaintenanceRecords).filter(MaintenanceRecords.vehicle_id == vehicle_id).all()

def update_maintenanceRecords(db: Session, record_id: int, maintenance_update: MaintenanceRecordUpdate):
    db_record = get_maintenanceRecord(db, record_id)
    if not db_record:
        return None
    
    for key, value in maintenance_update.model_dump(exclude_unset=True).items():
        setattr(db_record, key, value)

    db.commit()
    db.refresh(db_record)
    return db_record

# def delete_maintenanceRecord(db: Session, record_id: int):
#     db_record = get_maintenanceRecord(db, record_id)
#     if not db_record:
#         return None
    
#     db.delete(db_record)
#     db.commit()
#     return db_record


