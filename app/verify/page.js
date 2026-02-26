"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    UploadCloud,
    FileVideo,
    Loader2,
    CheckCircle2,
    ShieldAlert,
    ShieldCheck,
    AlertTriangle,
    Fingerprint,
    Link as LinkIcon,
    Cpu,
    ArrowRight,
    Activity
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// Mock Data Generator for Capture-Time Concept
const generateMockResults = () => {
    const rand = Math.random();
    const isAuthentic = rand < 0.33;
    const isEdited = rand >= 0.33 && rand < 0.66;
    const isUntrusted = rand >= 0.66;

    let score;
    let classification;
    let editDetection;
    let captureId;
    let editId;
    let compositeId;
    let message;

    const generateHex = (len) => [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).toUpperCase();

    const mockCaptureId = `CID-${generateHex(4)}-${generateHex(4)}`;
    const mockEditId = `EID-${generateHex(8)}`;
    const mockCompositeId = `TR-${generateHex(8)}-COMP`;

    if (isAuthentic) {
        score = Math.floor(Math.random() * 10) + 90; // 90-100
        classification = "Authentic Camera Footage";
        editDetection = "None";
        message = "Valid capture-time authenticity ID detected.";
        captureId = mockCaptureId;
        editId = "N/A (No edits)";
        compositeId = captureId;
    } else if (isEdited) {
        score = Math.floor(Math.random() * 20) + 60; // 60-80
        classification = "Edited Original Video";
        editDetection = "Edits Traceable";
        message = "Original capture ID detected, edits identified.";
        captureId = mockCaptureId;
        editId = mockEditId;
        compositeId = mockCompositeId;
    } else {
        // Untrusted / AI
        score = Math.floor(Math.random() * 30) + 5; // 5-35
        classification = "Untrusted / Synthetic Media";
        editDetection = "Origin Unknown";
        message = "No valid capture ID found, content likely synthetic or untrusted.";
        captureId = "MISSING_ID";
        editId = "N/A";
        compositeId = "UNVERIFIED";
    }

    return {
        id: `VT-${generateHex(6)}`,
        score,
        classification,
        editDetection,
        message,
        captureId,
        editId,
        compositeId,
        isAuthentic,
        isEdited,
        isUntrusted,
        blockchain: {
            timestamp: new Date().toISOString(),
            hash: `0x${generateHex(64).toLowerCase()}`,
            network: "Polygon (Simulated)"
        }
    };
};

export default function VerifyPage() {
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [results, setResults] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (uploadedFile) => {
        if (uploadedFile.type.includes("video/")) {
            setFile(uploadedFile);
            startAnalysis();
        } else {
            alert("Please upload a valid .mp4 or .mov video file.");
        }
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setAnalysisStep(0);
        setIsComplete(false);

        // Simulated Processing Pipeline
        const steps = [
            { delay: 1500, step: 1 }, // 1. Scan for Hardware Capture ID
            { delay: 3500, step: 2 }, // 2. Verify blockchain origin record
            { delay: 6000, step: 3 }, // 3. Trace Edit IDs (if any)
            { delay: 8500, step: 4 }  // Done
        ];

        steps.forEach(({ delay, step }) => {
            setTimeout(() => {
                if (step === 4) {
                    setIsAnalyzing(false);
                    setResults(generateMockResults());
                    setIsComplete(true);
                } else {
                    setAnalysisStep(step);
                }
            }, delay);
        });
    };

    const resetState = () => {
        setFile(null);
        setIsAnalyzing(false);
        setAnalysisStep(0);
        setIsComplete(false);
        setResults(null);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 font-sans pb-20">
            <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/5 bg-neutral-950 top-0 sticky z-50">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                        <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-neutral-300 group-hover:text-white transition-colors">VeriTrust</span>
                </Link>
                <div className="text-sm font-medium text-neutral-500">Verification Portal</div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 mt-12 md:mt-20">

                {/* State 1: Upload */}
                <AnimatePresence mode="wait">
                    {!file && !isAnalyzing && !isComplete && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            className="w-full max-w-2xl mx-auto"
                        >
                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-extrabold mb-4">Verify a Video</h1>
                                <p className="text-neutral-400">Upload a video to check for a valid Capture ID and trace its edit history.</p>
                            </div>

                            <div
                                className="group relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-neutral-700 rounded-3xl bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleFileDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                                    <UploadCloud className="w-10 h-10 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-neutral-200">Drag & Drop video here</h3>
                                <p className="text-sm text-neutral-500 mb-6">Supports .mp4, .mov (Max 100MB)</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="video/mp4,video/quicktime"
                                    className="hidden"
                                />
                                <button className="px-6 py-2.5 bg-neutral-800 text-white font-medium rounded-full border border-neutral-700 group-hover:border-indigo-500/50 transition-colors">
                                    Browse Files
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* State 2: Analyzing */}
                    {isAnalyzing && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="w-full max-w-lg mx-auto mt-20"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                                    <div className="absolute inset-0 border-4 border-neutral-800 rounded-full"></div>
                                    <motion.div
                                        className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                    <FileVideo className="w-10 h-10 text-indigo-400 animate-pulse" />
                                </div>

                                <h2 className="text-3xl font-bold mb-3">Analyzing "{file?.name}"</h2>
                                <p className="text-neutral-400 mb-12">Checking for secure hardware embedded Capture ID...</p>

                                <div className="w-full space-y-5">
                                    {[
                                        { title: "Scanning for Hardware Capture ID...", icon: Cpu },
                                        { title: "Verifying blockchain origin record...", icon: LinkIcon },
                                        { title: "Tracing Edit IDs and modifications...", icon: Activity },
                                        { title: "Calculating final Composite Trust Score...", icon: Fingerprint }
                                    ].map((step, idx) => {
                                        const isActive = analysisStep === idx;
                                        const isDone = analysisStep > idx;
                                        const Icon = step.icon;

                                        return (
                                            <div key={idx} className={clsx(
                                                "flex items-center p-4 rounded-xl border transition-all duration-500",
                                                isActive ? "bg-indigo-500/10 border-indigo-500/30 translate-x-2" :
                                                    isDone ? "bg-white/5 border-white/5 opacity-60" : "bg-transparent border-transparent opacity-30"
                                            )}>
                                                {isDone ? (
                                                    <CheckCircle2 className="w-6 h-6 text-green-400 mr-4" />
                                                ) : isActive ? (
                                                    <Loader2 className="w-6 h-6 text-indigo-400 mr-4 animate-spin" />
                                                ) : (
                                                    <Icon className="w-6 h-6 text-neutral-500 mr-4" />
                                                )}
                                                <span className={clsx(
                                                    "font-medium",
                                                    isActive ? "text-indigo-100" : isDone ? "text-neutral-300" : "text-neutral-500"
                                                )}>
                                                    {step.title}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* State 3: Results Dashboard */}
                    {isComplete && results && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                                <div>
                                    <h1 className="text-4xl font-extrabold mb-2">Video Trust Report</h1>
                                    <p className="text-neutral-400">Analysis complete for <span className="text-white font-medium">{file?.name}</span></p>
                                </div>
                                <button onClick={resetState} className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-lg transition-colors border border-neutral-700">
                                    Verify Another Video
                                </button>
                            </div>

                            {/* Status Banner */}
                            <div className={clsx(
                                "mb-6 p-4 rounded-xl border flex items-center gap-3",
                                results.isAuthentic ? "bg-green-500/10 border-green-500/20 text-green-400" :
                                    results.isEdited ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" :
                                        "bg-red-500/10 border-red-500/20 text-red-400"
                            )}>
                                {results.isAuthentic ? <ShieldCheck className="w-6 h-6" /> :
                                    results.isEdited ? <AlertTriangle className="w-6 h-6" /> :
                                        <ShieldAlert className="w-6 h-6" />}
                                <span className="font-medium">{results.message}</span>
                            </div>

                            {/* Main Result Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                                {/* Score Card */}
                                <div className="col-span-1 md:col-span-1 p-6 bg-neutral-900 border border-white/10 rounded-3xl flex flex-col justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-neutral-400 mb-1">Composite Trust Score</div>
                                        <div className="text-neutral-500 text-xs mb-6">Report ID: {results.id}</div>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className={clsx(
                                            "text-7xl font-black tracking-tighter",
                                            results.score >= 85 ? "text-green-500" : results.score >= 40 ? "text-yellow-500" : "text-red-500"
                                        )}>
                                            {results.score}%
                                        </div>
                                    </div>
                                    <div className="w-full bg-neutral-800 h-2 rounded-full mt-6 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${results.score}%` }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className={clsx(
                                                "h-full rounded-full",
                                                results.score >= 85 ? "bg-green-500" : results.score >= 40 ? "bg-yellow-500" : "bg-red-500"
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Details Card */}
                                <div className="col-span-1 md:col-span-2 p-6 bg-neutral-900 border border-white/10 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-400 mb-2">Provenance Classification</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xl font-bold text-white">
                                            {results.classification}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-400 mb-2">Edit Detection</h3>
                                        <div className="text-xl font-semibold text-white mt-1">
                                            {results.editDetection}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 pt-6 border-t border-white/5">
                                        <h3 className="text-sm font-medium text-neutral-400 mb-4">Evolutionary Identity</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="p-3 bg-neutral-950 rounded-xl border border-white/5">
                                                <div className="text-xs text-neutral-500 mb-1">Capture ID <span className="text-[10px] text-neutral-600">(Hardware)</span></div>
                                                <div className={clsx(
                                                    "font-mono text-xs truncate",
                                                    results.isUntrusted ? "text-red-400" : "text-neutral-300"
                                                )}>{results.captureId}</div>
                                            </div>
                                            <div className="p-3 bg-neutral-950 rounded-xl border border-white/5">
                                                <div className="text-xs text-neutral-500 mb-1">Edit ID(s)</div>
                                                <div className="font-mono text-xs text-neutral-300 truncate">{results.editId}</div>
                                            </div>
                                            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                                <div className="text-xs text-indigo-400 mb-1">Final Composite Trust ID</div>
                                                <div className={clsx(
                                                    "font-mono text-xs truncate",
                                                    results.isUntrusted ? "text-red-400" : "text-indigo-200"
                                                )}>{results.compositeId}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Evolution Timeline & Blockchain Record */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* Timeline */}
                                <div className="p-6 md:p-8 bg-neutral-900 border border-white/10 rounded-3xl">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-indigo-400" />
                                        Trust Evolution Timeline
                                    </h3>

                                    <div className="relative border-l border-neutral-700 ml-3 pl-6 space-y-8">

                                        {results.isUntrusted ? (
                                            <div className="relative">
                                                <div className="absolute w-3 h-3 bg-red-500 rounded-full -left-[30.5px] top-1.5 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                                <h4 className="font-semibold text-white">Missing Capture ID</h4>
                                                <p className="text-sm text-neutral-400 mt-1">No hardware embedded generation ID detected. Content cannot be verified as authentic recording.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="relative">
                                                    <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[30.5px] top-1.5 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                                    <h4 className="font-semibold text-white">Capture Event</h4>
                                                    <p className="text-sm text-neutral-400 mt-1">Hardware Capture ID generated. Original source verified.</p>
                                                    <div className="text-xs font-mono text-neutral-500 mt-2">Score: 100%</div>
                                                </div>

                                                {results.isEdited && (
                                                    <div className="relative">
                                                        <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-[30.5px] top-1.5 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                                                        <h4 className="font-semibold text-white">Edit Event Detected</h4>
                                                        <p className="text-sm text-neutral-400 mt-1">Modifications applied. Edit ID appended to trace lineage securely.</p>
                                                        <div className="text-xs font-mono text-neutral-500 mt-2">Score Adjusted</div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        <div className="relative">
                                            <div className={clsx(
                                                "absolute w-3 h-3 rounded-full -left-[30.5px] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.2)]",
                                                results.isAuthentic ? "bg-green-500 text-green-500 shadow-green-500/50" : results.isEdited ? "bg-yellow-500 shadow-yellow-500/50" : "bg-red-500 shadow-red-500/50"
                                            )}></div>
                                            <h4 className="font-semibold text-white">Final Verification</h4>
                                            <p className="text-sm text-neutral-400 mt-1">Composite trust profile evaluated.</p>
                                            <div className="text-xs font-mono text-neutral-500 mt-2 text-indigo-400">Final Trust Score: {results.score}%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Blockchain Info */}
                                <div className="p-6 md:p-8 bg-neutral-900 border border-white/10 rounded-3xl flex flex-col">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <LinkIcon className="w-5 h-5 text-indigo-400" />
                                        Blockchain Anchoring
                                    </h3>

                                    <div className="flex-1 bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-5">
                                        <div>
                                            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Network</div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
                                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                                {results.blockchain.network}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Timestamp</div>
                                            <div className="text-sm text-neutral-300 font-mono">{results.blockchain.timestamp}</div>
                                        </div>

                                        <div>
                                            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Transaction Hash</div>
                                            <div className="text-xs text-neutral-400 font-mono break-all bg-neutral-900 p-2 rounded border border-neutral-800">
                                                {results.blockchain.hash}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-500 text-center flex items-center justify-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        Cryptographically secured via decentralized consensus
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
