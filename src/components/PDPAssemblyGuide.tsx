import React, { useState } from 'react';
import { Wrench, CheckCircle2, Clock, FileText, Download } from 'lucide-react';

interface PDPAssemblyGuideProps {
  assemblyDifficulty: string;
  assemblyMinutes: number;
}

export const PDPAssemblyGuide: React.FC<PDPAssemblyGuideProps> = ({
  assemblyDifficulty,
  assemblyMinutes,
}) => {
  const [downloadNotice, setDownloadNotice] = useState(false);

  const steps = [
    {
      step: '01',
      title: 'Unbox & Organize Hardware',
      desc: 'Carefully unpack the pre-assembled solid oak frame and numbered legs onto a soft rug. All 8 high-tensile steel bolts and the ergonomic T-handle hex key are neatly sealed in Compartment A.',
      tip: 'Do not use electric power drills; the precision pre-threaded steel sleeves hand-tighten smoothly.'
    },
    {
      step: '02',
      title: 'Align & Fasten Base Joints',
      desc: 'Slot the angled rear structural leg brace into the seat frame mortise. Thread the four main connecting bolts loosely by finger before tightening each uniformly to ensure millimeter alignment.',
      tip: 'Acoustic silicone vibration dampers are pre-installed inside each joint to eliminate friction.'
    },
    {
      step: '03',
      title: 'Seat Cushion & Relax',
      desc: 'Position the bio-foam contour cushion onto the oak seat slats and engage the discreet bottom grip channels. Give a firm sit down to seat the joints into their final equilibrium.',
      tip: 'Your HavenCraft lounger is immediately ready for everyday relaxation.'
    }
  ];

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <section className="mb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-5 h-5 text-[#5F6B52]" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42]">
              Frictionless 3-Step Assembly Guide
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#2B2D42]/70">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#5F6B52]" />
              <strong>{assemblyMinutes} Minutes Total</strong>
            </span>
            <span>·</span>
            <span>{assemblyDifficulty}</span>
            <span>·</span>
            <span>All Tools & Hardware Included</span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 text-xs font-semibold py-2 px-3.5 rounded-lg border border-[#E2D9CC] bg-white hover:bg-[#FAF8F5] text-[#2B2D42] transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <FileText className="w-4 h-4 text-[#5F6B52]" />
          <span>Assembly Manual (PDF)</span>
          <Download className="w-3.5 h-3.5 text-[#2B2D42]/40" />
        </button>
      </div>

      {downloadNotice && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>HavenCraft-Assembly-Manual-Nordic-Oak-Lounger-v2026.pdf ready for offline reference.</span>
        </div>
      )}

      {/* 3 Step Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-white border border-[#E2D9CC] rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#5F6B52]/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center font-bold text-xs font-mono text-[#5F6B52]">
                  {item.step}
                </span>
                <span className="text-[11px] font-semibold text-[#5F6B52]">
                  ~{Math.round(assemblyMinutes / 3)} mins
                </span>
              </div>
              <h3 className="font-serif font-bold text-[#2B2D42] text-base mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#2B2D42]/70 leading-relaxed mb-4">
                {item.desc}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E2D9CC]/50 text-[11px] text-[#2B2D42]/80">
              <strong className="text-[#5F6B52] block mb-0.5">Pro Tip:</strong>
              {item.tip}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
