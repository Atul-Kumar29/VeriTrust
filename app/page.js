"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Upload, Fingerprint, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 overflow-hidden font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Navbar simulation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/5 backdrop-blur-md bg-neutral-950/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
          <span className="text-xl font-bold tracking-tight">VeriTrust</span>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mt-12 md:mt-0"
        >
          <div className="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-medium text-indigo-300 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Hackathon Demo Concept
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            Verifiable Capture-Time <br className="hidden md:block" /> Video Authenticity
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A decentralized trust layer that begins at the moment of recording. Original videos are born with a hardware-generated identity for complete traceability.
          </p>

          <Link href="/verify">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-2xl hover:bg-indigo-500 transition-all shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-in-out skew-x-12" />
              <span className="relative flex items-center justify-center gap-2">
                Verify a Video
                <Activity className="w-5 h-5" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-24 w-full max-w-5xl"
        >
          {[
            {
              icon: Upload,
              title: "1. Upload Video",
              desc: "Drag and drop any video file to begin the verification process. Secure and private."
            },
            {
              icon: Fingerprint,
              title: "2. Generate Trust Identity",
              desc: "We extract and verify the camera's hardware-generated Capture ID anchored to the blockchain."
            },
            {
              icon: Activity,
              title: "3. Trace & Verify",
              desc: "Trace evolutionary edits. Edits don't delete authenticity, they add traceable Edit IDs."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex flex-col items-center p-8 bg-neutral-900/50 border border-white/5 rounded-3xl backdrop-blur-sm transition-all duration-300 shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-100">{item.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
