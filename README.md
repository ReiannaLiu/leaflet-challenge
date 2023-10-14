# Earthquake Visualization with Leaflet

## Table of Contents

- [Earthquake Visualization with Leaflet](#earthquake-visualization-with-leaflet)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Instructions](#instructions)
    - [Part 1: Create the Earthquake Visualization](#part-1-create-the-earthquake-visualization)
      - [1. Dataset Acquisition](#1-dataset-acquisition)
      - [2. Visualization Details](#2-visualization-details)
    - [Part 2: Gather and Plot More Data (Optional)](#part-2-gather-and-plot-more-data-optional)
      - [1. Tectonic Plates Data](#1-tectonic-plates-data)
      - [2. Additional Features](#2-additional-features)
  - [Resources](#resources)

## Introduction

This project provides a visualization of earthquake data using the Leaflet library. The visualization showcases the magnitude and depth of earthquakes and their relationship with tectonic plates.

## Instructions

### Part 1: Create the Earthquake Visualization

#### 1. Dataset Acquisition

- The dataset is sourced from the USGS, which provides earthquake data in various formats, updated every 5 minutes.
- The chosen dataset for this project is "All Earthquakes from the Past Months".
  
#### 2. Visualization Details

- The map is created using Leaflet and plots all the earthquakes from the dataset based on their longitude and latitude.
- Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.
- Popups have been included to provide additional information about the earthquake when its associated marker is clicked.
- A legend has been added to the bottom right of the map to provide context for the map data.

### Part 2: Gather and Plot More Data (Optional)

#### 1. Tectonic Plates Data

- Data on tectonic plates is sourced from [this GitHub repository](https://github.com/fraxen/tectonicplates).
- The tectonic plates dataset is plotted on the map in addition to the earthquakes to illustrate the relationship between tectonic plates and seismic activity.

#### 2. Additional Features

- Three different base maps have been provided: Satellite, Grayscale, and Outdoors.
- Both the earthquake and tectonic plates datasets have been placed into separate overlays that can be toggled on and off independently.
- Layer controls have been added to the map for better user interaction.

## Resources

- [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- [Tectonic Plates Data on GitHub](https://github.com/fraxen/tectonicplates)

---

**Note**: This project is for educational purposes. Always refer to the USGS website for official and up-to-date earthquake information.