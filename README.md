# VeriTrust

## Overview
VeriTrust is a hackathon prototype demonstrating a **capture-time authenticity framework** for digital video verification. The project revolves around the idea that for a video to be trusted, its authenticity must start at the moment of capture. 

Original videos are "born" with a hardware-generated identity created by trusted camera hardware (like phones, DSLRs, or CCTV). This Capture ID anchors the original visual data. When a video is edited, instead of losing authenticity, the system traces the edits and appends "Edit IDs", culminating in a Final Composite Trust ID.

This submission is a client-side front-end simulation built to clearly communicate the concept to evaluators in a limited time setting.

---

## Problem Statement
Advances in AI-based video generation and editing tools have made it exceedingly difficult to trust video content shared online. Fake or manipulated videos can spread misinformation, harm public safety, and reduce confidence in journalism, social media, and legal evidence. Existing solutions are often centralized, rely on easily editable metadata, or provide opaque results without verifiable proof or history tracking.

---

## Proposed Solution
VeriTrust operates on the principle of **Capture-Time Authenticity**:
1. **Capture ID (Original Hardware ID):** Authentic videos receive a mandatory cryptographic Capture ID at the time of recording inside the camera hardware.
2. **Edit ID:** When modified, editing software adds Edit IDs that identify what was changed without overwriting the original lineage.
3. **Composite Trust ID:** A combined identity linking the original Capture ID + one or more Edit IDs.

An AI-based analysis step estimates the trust score. If a video lacks a Capture ID completely, it is flagged as synthetic or untrusted by default. The final output is a trust score and verification report that communicates chronological credibility rather than a standard binary real-or-fake decision.

---

## Key Innovation
- **Capture-First Focus:** Authenticity starts at video capture, not upload.
- **Embracing Edits:** Edits are allowed but made visible and traceable via connected Edit IDs.
- **Evolutionary Identity:** Composite identities trace how a video evolves, restoring nuance to the verification process.
- **Blockchain + AI Synchronization:** Combining simulated immutable origin history (blockchain) with synthetic content detection (AI).

---

## Demo Scope
This hackathon submission is intentionally limited to a front-end demonstration of the concept.

The demo simulates:
- Validating the presence of hardware Capture IDs.
- Generating and tracing Edit IDs to build a Composite Trust Score.
- Blockchain anchoring visualizations and network verifications.
- Timeline generation showing how trust changes as edits are introduced.

**Note:** No real hardware, blockchain, or AI models are used in this prototype. All results are generated using deterministic/mocked logic to illustrate the UX and the concept clearly for evaluators.

---

## Technology Stack
- Next.js 15 (App Router)  
- JavaScript  
- Tailwind CSS
- Framer Motion & Lucide Icons
- Client-side only implementation

---

## Intended Use Cases
- Journalism and news verification (tracing field footage to broadcast edits)
- Social media content moderation  
- Public safety and misinformation control  
- Legal and evidentiary media validation  

---

## Conclusion
VeriTrust presents a practical and innovative approach to restoring trust in digital video content by treating authenticity as an evolutionary scale tied to hardware origins. This framework highlights how media manipulation can be made transparent and accountable, serving as a powerful proof of concept for future hardware-to-platform trust layers.
