
class Vehicle {
  constructor(type) {
    this.type = type; 
  }
}

class ParkingSpot {
  constructor(type) {
    this.type = type; 
    this.occupied = false;
  }

  isOccupied() {
    return this.occupied;
  }

  occupy() {
    this.occupied = true;
  }

  vacate() {
    this.occupied = false;
  }
}

class ParkingLot {
  constructor(motorcycleCount, compactCount, largeCount) {
    this.motorcycleSpots = Array.from(
      { length: motorcycleCount },
      () => new ParkingSpot("motorcycle")
    );
    this.compactSpots = Array.from(
      { length: compactCount },
      () => new ParkingSpot("compact")
    );
    this.largeSpots = Array.from(
      { length: largeCount },
      () => new ParkingSpot("large")
    );
    this.vanSpotsTaken = 0;
  }

  park(vehicle) {
    switch (vehicle.type) {
      case "motorcycle":
        return (
          this.parkInFirstAvailable(this.motorcycleSpots) ||
          this.parkInFirstAvailable(this.compactSpots) ||
          this.parkInFirstAvailable(this.largeSpots)
        );
      case "car":
        return (
          this.parkInFirstAvailable(this.compactSpots) ||
          this.parkInFirstAvailable(this.largeSpots)
        );
      case "van":
        return this.parkVan();
      default:
        return false;
    }
  }

  parkInFirstAvailable(spots) {
    for (let spot of spots) {
      if (!spot.isOccupied()) {
        spot.occupy();
        return true;
      }
    }
    return false;
  }

  parkVan() {
    const availableLarge = this.largeSpots.filter((s) => !s.isOccupied());
    if (availableLarge.length >= 3) {
      for (let i = 0, count = 0; count < 3 && i < this.largeSpots.length; i++) {
        if (!this.largeSpots[i].isOccupied()) {
          this.largeSpots[i].occupy();
          this.vanSpotsTaken++;
          count++;
        }
      }
      return true;
    }
    return false;
  }

  countAvailable(spots) {
    return spots.filter((s) => !s.isOccupied()).length;
  }

  totalSpots() {
    return (
      this.motorcycleSpots.length +
      this.compactSpots.length +
      this.largeSpots.length
    );
  }

  remainingSpots() {
    return (
      this.countAvailable(this.motorcycleSpots) +
      this.countAvailable(this.compactSpots) +
      this.countAvailable(this.largeSpots)
    );
  }

  isFull() {
    return this.remainingSpots() === 0;
  }

  isEmpty() {
    return this.remainingSpots() === this.totalSpots();
  }

  isMotorcycleFull() {
    return this.countAvailable(this.motorcycleSpots) === 0;
  }

  getVanSpotsTaken() {
    return this.vanSpotsTaken;
  }
}

const lot = new ParkingLot(2, 3, 6);

lot.park(new Vehicle("motorcycle"));
lot.park(new Vehicle("car"));
lot.park(new Vehicle("van"));

console.log("Total spots:", lot.totalSpots());
console.log("Remaining spots:", lot.remainingSpots());
console.log("Is full:", lot.isFull());
console.log("Is empty:", lot.isEmpty());
console.log("Motorcycle spots full:", lot.isMotorcycleFull());
console.log("Van spots taken:", lot.getVanSpotsTaken());

