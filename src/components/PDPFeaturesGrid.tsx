import React from 'react';
import { Shield, Sparkles, Wrench, Droplets } from 'lucide-react';

export const PDPFeaturesGrid: React.FC = () => {
  const differentiators = [
    {
      icon: Sparkles,
      title: 'Zero-VOC Plant Oil Finishes',
      desc: 'Hand-rubbed natural oils eliminate harmful formaldehyde and toluene off-gassing, keeping indoor bedroom and nursery air pristine.',
      badge: 'Certified Safe'
    },
    {
      icon: Shield,
      title: 'Concealed Carbon Steel Joints',
      desc: 'High-tensile internal metric bolts and acoustic damping pads eliminate friction and squeaks forever, even after 100,000 seating cycles.',
      badge: 'Silent Stability'
    },
    {
      icon: Droplets,
      title: 'Hydrophobic Stain Barrier',
      desc: 'Eco-treated breathable linen weave causes accidental coffee, tea, and wine spills to bead up on the surface for effortless wiping.',
      badge: 'Spill-Resistant'
    },
    {
      icon: Wrench,
      title: 'Precision 15-Minute Assembly',
      desc: 'Precision CNC pre-threaded sockets allow anyone to assemble the frame in under 15 minutes with the included ergonomic hex key.',
      badge: '1-Person Setup'
    }
  ];

  return (
    <section className="mb-14">
      <div className="text-xs font-bold uppercase tracking-wider text-[#5F6B52] mb-1">
        THE HAVENCRAFT CRAFTSMANSHIP STANDARD
      </div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2D42] mb-6">
        Engineered for Decades of Quiet Everyday Comfort
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {differentiators.map((diff, idx) => {
          const Icon = diff.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#E2D9CC] rounded-xl p-5 hover:border-[#5F6B52]/50 transition-all hover:-translate-y-0.5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E2D9CC] flex items-center justify-center text-[#5F6B52] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-[#2B2D42] text-base mb-2">
                  {diff.title}
                </h3>
                <p className="text-xs text-[#2B2D42]/70 leading-relaxed">
                  {diff.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2D9CC]/50">
                <span className="text-[11px] font-semibold text-[#5F6B52]">
                  ✓ {diff.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
