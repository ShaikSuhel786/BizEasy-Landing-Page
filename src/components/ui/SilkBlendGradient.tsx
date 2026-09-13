export default function SilkBlendGradient({ visible }: { visible: boolean }) {
  return (
    <>
      <div 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundColor: "#F7F3FF",
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.500'/></svg>"), radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(180deg, #F7F3FF 5%, #083DA9 52%, #02006F 70%, #000000 100%)`,
          backgroundSize: "120px 120px, auto, auto",
          backgroundBlendMode: "overlay, normal, normal"
        }}
      />

      {visible && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] z-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,255,255,0.1) 0%, transparent 80%)",
          }}
        />
      )}
    </>
  );
}
