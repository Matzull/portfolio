---
title:
  en: "DAFS Architecture Deep Dive - Building a Raft-Ready Distributed File System in Rust"
  es: "DAFS en Profundidad - Construyendo un sistema de ficheros distribuido listo para Raft en Rust"
summary:
  en: "What I found after inspecting DAFS internals: gRPC contracts, metadata flows, replication hooks, and the path from single-master to OpenRaft."
  es: "Lo que encontre tras inspeccionar DAFS por dentro: contratos gRPC, flujos de metadata, hooks de replicacion y el camino de master unico a OpenRaft."
publishedAt: '2026-03-28'
readingTime: 9 min
tags:
  - Rust
  - gRPC
  - OpenRaft
  - Distributed Systems
repository: https://github.com/Matzull/DAFS
---
Building a distributed file system is mostly an exercise in disciplined boundaries: what must be strongly consistent, what can be streamed, and what can fail without losing recoverability. This project is designed around that idea by separating metadata orchestration, block transport, and audit logging.

## The core problem being solved

A file system at scale needs to answer two very different classes of questions:

- **Control questions:** where is file metadata, who owns what, which blocks compose a file, which nodes are healthy.
- **Data questions:** how bytes move efficiently between clients and storage nodes.

Trying to solve both in one service usually creates coupling and bottlenecks. The architecture here avoids that by keeping the control path and data path distinct.

## Service boundaries

The Protobuf contract is already designed like a production control plane:

- `MetadataService` manages namespace operations (`CreateFile`, `GetFileMetadata`, `DeleteFile`, `ListDirectory`, `RenameFile`) and node orchestration (`Heartbeat`, `AllocateBlocks`, `SetFileStatus`).
- `DataNodeService` uses streaming RPCs for block transfers (`WriteBlock` client streaming, `ReadBlock` server streaming).
- `AuditService` isolates low-latency immutable operation logging.

This split is essential for scalability: metadata requests remain small and consistency-focused, while byte transport remains throughput-focused.

## Metadata engine and operational behavior

The metadata server is intentionally configuration-heavy, which is a good sign for system software:

- block size and replication defaults,
- channel capacities for WAL/audit/replication workers,
- auth and JWT settings,
- Raft bootstrap and cluster parameters.

In practice, this lets you tune behavior under different constraints: local testing, noisy environments, or higher fan-out replication conditions.

## Consensus transition strategy

One of the most important engineering decisions is the migration strategy toward consensus:

1. isolate command/state-machine abstractions,
2. implement durable OpenRaft storage and snapshots,
3. wire Raft network transport,
4. route metadata writes through leader-only `client_write`,
5. migrate WAL reality into replicated state,
6. make client and datanodes leader-aware.

This phased rollout is exactly how high-risk distributed changes should be delivered: incremental, testable milestones with clear rollback surfaces.

## Why the protocol details are important

`dfs.proto` includes details that prevent common DFS pitfalls:

- `BlockAssignment` carries `order` and `block_size`, so clients can reconstruct file order deterministically.
- heartbeats report resource usage (`cpu_usage`, `free_space`, `used_space`, `addr`) enabling scheduler-level decisions.
- streaming write metadata allows offset-aware writes and append scenarios.
- explicit `ReplicateBlocks` and `ConfigureNode` RPCs give the metadata layer control over data placement lifecycle.

These fields look small, but they are what make recovery and operability realistic. Without explicit ordering, assignment, and health semantics, distributed storage quickly becomes ambiguous under failure.

## Tradeoffs and engineering lessons

- A single-master phase is a practical way to move quickly before introducing consensus complexity.
- The hard part is not adding Raft itself, but preserving throughput while tightening consistency semantics for metadata mutations.
- Audit and replication workers as explicit subsystems improve observability and reduce the chance of hidden coupling.

## What comes next

- expose a clean leader discovery endpoint for both clients and datanodes,
- add end-to-end fault-injection tests around upload + failover,
- ship metrics for commit index lag and replication queue depth,
- harden snapshot lifecycle and state bootstrap tooling.

The architecture already has the right primitives. The next milestone is execution quality: consistency guarantees, failover behavior, and operational confidence under load.
