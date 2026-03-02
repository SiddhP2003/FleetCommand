from sqlalchemy.orm import Session 
from models.vehicles import Vehicle
from schemas.vehicles import VehicleCreate, VehicleUpdate

def create_vehicle(db: Session, vehicle: VehicleCreate, owner_id: int):
    db_vehicle = Vehicle(**vehicle.model_dump(), owner_id=owner_id)
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def get_vehicle(db: Session, vehicle_id: int):
    return db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

def get_vehicles_by_owner(db: Session, owner_id: int):
    return db.query(Vehicle).filter(Vehicle.owner_id == owner_id).all()

def update_vehicle(db: Session, vehicle_id: int, vehicle_update: VehicleUpdate):
    db_vehicle = get_vehicle(db, vehicle_id)
    if not db_vehicle:
        return None
    for key, value in vehicle_update.model_dump(exclude_unset=True).items():
        setattr(db_vehicle, key, value)

    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

# def delete_vehicle(db: Session, vehicle_id: int):
#     db_vehicle = get_vehicle(db, vehicle_id)
#     if not db_vehicle:
#         return None
    
#     db.delete(db_vehicle)
#     db.commit()
#     return db_vehicle
