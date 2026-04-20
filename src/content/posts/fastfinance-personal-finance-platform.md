---
title:
  en: "FastFinance Project Highlight - One Finance Core Across Web, Bot, and Mobile"
  es: "FastFinance Proyecto Destacado - Un nucleo financiero para web, bot y movil"
summary:
  en: "Built a multi-channel personal finance platform with shared domain logic, OCR-assisted transaction capture, and API-first delivery."
  es: "Construi una plataforma financiera multicanal con logica de dominio compartida, captura OCR de transacciones y entrega API-first."
publishedAt: '2026-04-20'
readingTime: 4 min
tags:
  - Python
  - FastAPI
  - SQLAlchemy
  - Telegram
  - Kivy
  - OCR
repository: https://github.com/matzull
---
FastFinance demonstrates product engineering across channels: one finance core, multiple user interfaces, and clean API boundaries.

## Why this project matters

This is not only a CRUD app. It combines automation, data quality, and cross-platform delivery in one coherent architecture.

## What I built

- Shared SQLAlchemy domain model used by web API, Telegram bot, and mobile app.
- FastAPI backend for accounts, transactions, subscriptions, budgets, and net-worth insights.
- OCR-assisted ticket capture flow with editable confirmation before persistence.
- Statement import pipeline for CSV/XLSX with column alias normalization.
- Kivy mobile client connected to the same backend contracts.

## Recruiter view

- **Ownership:** Delivered backend, automation channel, and mobile client.
- **Product thinking:** Focused on user speed (chat + OCR) and data correctness (confirm-before-save).
- **Architecture quality:** Reused domain contracts across channels to reduce duplication.
- **Execution:** Built a practical, extensible platform instead of isolated prototypes.

## Stack

Python, FastAPI, SQLAlchemy, Telegram Bot API, PaddleOCR/OpenAI Vision fallback, and Kivy/KivyMD.
