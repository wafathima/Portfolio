//scene fallback
export default function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#65E5FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dfe8ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#08090D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="160" r="140" fill="url(#coreGrad)" />
        <circle cx="160" cy="160" r="130" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.6" />
        <circle cx="160" cy="160" r="100" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.4" strokeDasharray="3 6" />
        <circle cx="160" cy="160" r="65" stroke="url(#ringGrad)" strokeWidth="1" opacity="0.3" />
        <circle cx="160" cy="160" r="42" stroke="#65E5FF" strokeWidth="1.2" opacity="0.9" />
      </svg>
    </div>
  );
}