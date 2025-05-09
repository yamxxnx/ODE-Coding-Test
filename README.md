# ODE: Coding Test – Parking Lot Design (JavaScript)

## Overview

This project implements a **Parking Lot System** using object-oriented principles in JavaScript. It simulates how vehicles of different types (motorcycles, cars, vans) can be parked and managed within a parking lot containing multiple types of spots (motorcycle, compact, and large).

---

## Features

- Supports parking of **motorcycles**, **cars**, and **vans**
- Spot types: **Motorcycle**, **Compact**, **Large**
- Van takes up 3 consecutive large spots
- Car can fit in compact or large spots
- Motorcycle can fit anywhere
- Tracks total and remaining spots
- Checks if parking lot or any spot type is full/empty
- Calculates how many spots vans are taking

---

## File Structure

- `task.js` – Main logic implementing the parking system

---

## Code Explanation

### Classes

#### `Vehicle`
Base class with a `type` property.

#### `Motorcycle`, `Car`, `Van`
Extend `Vehicle` with their specific types.

#### `ParkingSpot`
Represents an individual parking spot.
- Has `type`, `isOccupied`, and `vehicle` properties.

#### `ParkingLot`
Main class that:
- Initializes spots
- Manages `parkVehicle(vehicle)` and `removeVehicle(vehicle)`
- Provides utility methods:
  - `getRemainingSpots()`
  - `getTotalSpots()`
  - `isFull()`, `isEmpty()`
  - `areMotorcycleSpotsFull()`
  - `getVanSpotUsage()`
