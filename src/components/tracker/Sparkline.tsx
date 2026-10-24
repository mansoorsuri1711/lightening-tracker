export default function Sparkline({ bins, marker }: { bins: number[]; marker: number | null }) {
  const max = Math.max(1, ...bins);
  const w = 240;
  const h = 56;
  const bw = w / bins.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" role="img" aria-label="Flashes per minute over the last hour" preserveAspectRatio="none">
      {bins.map((v, i) => {
        const bh = v ? Math.max(1.5, (v / max) * (h - 4)) : 0.8;
        const age = bins.length - 1 - i;
        const fill = age < 5 ? "#ffd84a" : age < 15 ? "#ff9d2e" : age < 35 ? "#ef4a2b" : "#9b2f8f";
        return <rect key={i} x={i * bw + 0.4} y={h - bh} width={bw - 0.8} height={bh} rx={0.8} fill={fill} opacity={v ? 0.95 : 0.25} />;
      })}
      {marker != null && <rect x={marker * bw - 0.6} y={0} width={bw + 1.2} height={h} fill="#fff" opacity={0.22} />}
    </svg>
  );
}
