---
title:
  en: "DAFS Project Highlight - Building a Raft-Ready Distributed File System"
  es: "DAFS Proyecto Destacado - Construccion de un sistema de ficheros distribuido listo para Raft"
summary:
  en: "Designed distributed storage boundaries with gRPC contracts, metadata orchestration, and a clear migration path from single-master control to OpenRaft consensus."
  es: "Disene limites de almacenamiento distribuido con contratos gRPC, orquestacion de metadata y una migracion clara desde master unico hacia consenso con OpenRaft."
publishedAt: '2026-03-28'
readingTime: 5 min
tags:
  - Rust
  - gRPC
  - OpenRaft
  - Distributed Systems
repository: https://github.com/Matzull/DAFS
---
DAFS showcases core distributed-systems engineering: defining clear control/data boundaries and preparing metadata operations for consensus.

## Why this project matters

Distributed storage fails when consistency and throughput are mixed carelessly. DAFS addresses that with explicit service roles and protocol contracts.

## What I built

- gRPC service boundaries for metadata orchestration, block transport, and audit logging.
- Streaming data path for efficient block writes/reads.
- Metadata contracts that include placement order, heartbeat health signals, and replication hooks.
- A phased migration strategy from single-master operations to OpenRaft-backed consensus.

## Recruiter view

- **System design depth:** Clear separation of control plane and data plane.
- **Reliability thinking:** Consensus migration planned as safe, incremental milestones.
- **Performance awareness:** Streaming RPCs and tunable metadata server behavior.
- **Production readiness:** Auditability and operational signals included in core contracts.

## Stack

Rust, gRPC/Protobuf, OpenRaft trajectory, and distributed systems patterns for metadata consistency and replication.
