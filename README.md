# VeriTrust

## Overview
VeriTrust is a hackathon prototype that demonstrates a new way to verify the authenticity of digital videos. The project focuses on showing how AI analysis and blockchain concepts can be combined to create a transparent trust layer for video content. Instead of labeling videos as simply real or fake, VeriTrust introduces the idea of a verifiable video identity that evolves when the video is edited or modified.

This submission is a front end simulation built to clearly communicate the concept to evaluators in a limited time setting.

---

## Problem Statement
Advances in AI based video generation and editing tools have made it difficult to trust video content shared online. Fake or manipulated videos can spread misinformation, harm public safety, and reduce confidence in journalism, social media, and legal evidence. Existing solutions are often centralized, rely on editable metadata, or provide opaque results without verifiable proof or history tracking.

---

## Proposed Solution
VeriTrust assigns every uploaded video a unique digital identity derived from its visual content. This identity represents the video in a tamper resistant way and is anchored to a simulated blockchain record for immutability and public verification. When a video is edited, the system generates a composite identity that links the original video with its modifications, allowing the video’s lineage to be traced rather than overwritten.

An AI based analysis step estimates whether the video is likely authentic camera footage, edited content, or AI generated media. The final output is a trust score and verification report that communicates credibility and transformation history instead of a binary real or fake decision.

---

## Key Innovation
- Video identity generation based on content rather than filenames or metadata  
- Composite identity that reflects how a video evolves after edits  
- Trust score based evaluation instead of binary classification  
- Combination of AI analysis and blockchain backed verification in a single workflow  
- Focus on transparency, traceability, and public trust  

---

## Demo Scope
This hackathon submission is intentionally limited to a front end demonstration.

The demo simulates:
- Video upload and analysis flow  
- Digital fingerprint generation  
- Blockchain anchoring and verification records  
- AI based authenticity classification  
- Trust score calculation and identity evolution timeline  

No real AI models or blockchain networks are used. All results are generated using mock logic to illustrate the concept clearly.

---

## Technology Stack
- Next.js with App Router  
- JavaScript  
- Tailwind CSS  
- Client side only implementation for now as a demo 

---

## Intended Use Cases
- Journalism and news verification  
- Social media content moderation  
- Public safety and misinformation control  
- Legal and evidentiary media validation  
- Platform independent video trust assessment  

---

## Limitations
This prototype does not claim perfect or universal detection of video manipulation. It is designed to demonstrate a realistic and scalable approach to video authenticity verification, emphasizing accountability and traceability rather than absolute guarantees.

---

## Conclusion
VeriTrust presents a practical and innovative approach to restoring trust in digital video content. By treating video authenticity as a measurable and verifiable property rather than an assumption, the system highlights how future platforms can make media manipulation visible, accountable, and harder to hide. This demo serves as a proof of concept for a larger trust framework that can evolve with advancements in AI and digital media.
