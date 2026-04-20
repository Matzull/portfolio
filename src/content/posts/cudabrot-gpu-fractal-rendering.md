---
title:
  en: "CUDAbrot Deep Dive - Interactive Mandelbrot Rendering with CUDA + Win32"
  es: "CUDAbrot en Profundidad - Renderizado interactivo de Mandelbrot con CUDA + Win32"
summary:
  en: "Code-level review of CUDAbrot: GPU kernel structure, supersampling strategy, and interactive controls through a native Win32 app."
  es: "Revision a nivel de codigo de CUDAbrot: estructura del kernel GPU, estrategia de supersampling y controles interactivos en una app Win32 nativa."
publishedAt: '2026-03-28'
readingTime: 7 min
tags:
  - CUDA
  - C++
  - Win32
  - GPU
  - Fractals
repository: https://github.com/Matzull/CUDAbrot
---
CUDAbrot is an interactive Mandelbrot renderer built around a simple objective: keep the hot path on the GPU while preserving a responsive desktop exploration experience.

## Rendering objective

Fractal rendering is a great workload for data-parallel execution. Each pixel can be computed independently, so the design naturally maps to CUDA threads.

The implementation focuses on a direct pipeline:

1. map screen coordinates into complex-plane bounds,
2. run escape-time iterations per sample,
3. accumulate and color each pixel,
4. display the frame through Win32 drawing APIs.

## GPU kernel design

The kernel in `Render.cu` is straightforward and effective:

- each CUDA thread maps to a pixel,
- a 4-sample supersampling pattern (`sppx`/`sppy`) computes anti-aliased color,
- escape-time iteration (`converges`) determines intensity,
- final color mapping converts iteration result into grayscale RGB.

The value of this design is clarity: compute logic is explicit, so profiling and optimization targets are easy to identify.

## Coordinate mapping and escape logic

Two details matter most:

- `mapper(...)` transforms pixel-space coordinates into complex-plane bounds,
- `converges(...)` iterates `z = z^2 + c` up to the configured iteration cap.

This is the canonical Mandelbrot method in a massively parallel execution model.

## Interactive desktop controls

`main.cpp` wires the renderer into a Win32 message loop and keyboard controls:

- arrow keys move the viewport,
- numpad +/- zooms,
- numpad 0/1 changes iteration budget,
- numpad 2 exports bitmap,
- numpad 3 runs benchmark mode.

These controls turn rendering into exploration, not just offline image generation.

## Key engineering choices

- GPU-first compute path keeps iteration math where it belongs.
- 4x supersampling improves edge quality with limited complexity cost.
- Low abstraction overhead in C++/CUDA/WinAPI makes performance behavior transparent.

## Constraints and tradeoffs

- currently tied to Windows + CUDA tooling,
- grayscale colormap is simple but visually limited,
- host-device memory copies happen per frame (fine for current scope, but a tuning target).

## Next improvements

- add continuous zoom animation with adaptive iteration depth,
- move toward smoother continuous coloring palettes,
- benchmark shared-memory variants and occupancy-tuned block sizes,
- profile async stream-based copies to reduce frame latency.

The current implementation already demonstrates the core value of GPU acceleration clearly. Future versions can focus on visual richness and frame-time consistency while preserving this simple architecture.
