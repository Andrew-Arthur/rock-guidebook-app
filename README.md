# Rock Guidebook

## Introduction

Rock Guidebook was made as a proof of concept for a better alternative to current online guidebook platforms. I have sense slowed development as I discovered the [Kaya](https://kayaclimb.com/) platform, which is exactly what I wanted to create. I am thankful for the lessons this project is teaching me and have had a blast working on it.

## Todo

- Add more climbing data to seeded values
- Improve mapbox logic to calculate bounding box and allow setting default angles for areas
- Finish Route Editor
- Add Route Drawing Tool
- Add Wall Editor/Creator
- Add Area Editor/Creator
- Improve account system

## Setup

### 1. Copy Local Env Template

```bash
npm run setup
```

### 2. Add mapbox private key to .env.local

[Mapbox Console](https://console.mapbox.com/)

### 3. Run docker

```bash
docker compose up
```
