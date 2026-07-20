import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Html,
  Image,
  MeshTransmissionMaterial,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import "./HeroScene3D_copy.css";

function GlassCard({
  imageUrl,
  name = "Alexander Galvez",
  role = "Systems Engineer",
  stack = ["React", "Node.js", "Laravel", "Proxmox"],
  location = "Madrid, España",
  status = "Disponible para proyectos",
}) {
  return (
    <group rotation={[-0.18, 0.33, -0.09]} position={[0.2, 0.05, 0]}>
      {/* resplandor exterior */}
      <RoundedBox
        args={[3.22, 5.08, 0.08]}
        radius={0.26}
        smoothness={10}
        position={[0, 0, -0.14]}
      >
        <meshBasicMaterial color="#69c4ff" transparent opacity={0.22} />
      </RoundedBox>

      {/* borde luminoso */}
      <RoundedBox
        args={[3.08, 4.94, 0.06]}
        radius={0.24}
        smoothness={10}
        position={[0, 0, -0.05]}
      >
        <meshBasicMaterial color="#9edcff" transparent opacity={0.24} />
      </RoundedBox>

      {/* cristal principal */}
      <RoundedBox
        args={[2.94, 4.8, 0.22]}
        radius={0.22}
        smoothness={12}
        position={[0, 0, 0.02]}
      >
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0}
          thickness={1.2}
          ior={1.45}
          chromaticAberration={0.02}
          anisotropy={0.6}
          distortion={0.04}
          distortionScale={0.08}
          samples={10}
          resolution={512}
          color="#d6f4ff"
        />
      </RoundedBox>

      {/* reflejo superior */}
      <mesh position={[0.18, 2.14, 0.11]} rotation={[0, 0, -0.2]}>
        <planeGeometry args={[1.5, 0.08]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </mesh>

      {/* foto */}
      <Image
        url={imageUrl}
        scale={[2.34, 3.2, 1]}
        position={[0, 0.72, 0.12]}
        radius={0.18}
        transparent
      />

      {/* panel inferior */}
      <RoundedBox
        args={[2.42, 1.42, 0.05]}
        radius={0.14}
        smoothness={10}
        position={[0, -1.38, 0.15]}
      >
        <meshStandardMaterial
          color="#06101c"
          transparent
          opacity={0.92}
          metalness={0.1}
          roughness={0.46}
        />
      </RoundedBox>

      {/* línea azul */}
      <mesh position={[0, -0.82, 0.17]}>
        <planeGeometry args={[2.28, 0.018]} />
        <meshBasicMaterial color="#38a5ff" transparent opacity={0.95} />
      </mesh>

      {/* brillo inferior */}
      <mesh position={[0, -2.28, 0.06]}>
        <planeGeometry args={[2.9, 0.12]} />
        <meshBasicMaterial color="#79cfff" transparent opacity={0.2} />
      </mesh>

      {/* logo superior izquierdo */}
      <Html
        transform
        position={[-0.98, 2.08, 0.16]}
        distanceFactor={1.32}
        wrapperClass="hero-card-html"
      >
        <div className="hero-card-logo">X</div>
      </Html>

      {/* contenido */}
      <Html
        transform
        position={[-1.04, -1.24, 0.2]}
        distanceFactor={1.32}
        wrapperClass="hero-card-html"
      >
        <div className="hero-card-ui">
          <p className="hero-card-name">{name}</p>
          <p className="hero-card-role">{role}</p>

          <div className="hero-card-stack">
            {stack.map((item) => (
              <span key={item} className="hero-card-chip">
                {item}
              </span>
            ))}
          </div>

          <div className="hero-card-meta">
            <span className="hero-card-location">{location}</span>
            <span className="hero-card-status">{status}</span>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function HeroScene3D({
  imageUrl,
  name,
  role,
  stack,
  location,
  status,
}) {
  return (
    <div className="hero-r3f-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.9], fov: 29 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#020816"]} />
        <fog attach="fog" args={["#020816", 5.5, 12]} />

        <ambientLight intensity={1} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={2.35}
          color="#b6e3ff"
        />
        <pointLight position={[-3, -1.5, 3]} intensity={1.9} color="#256dff" />
        <pointLight position={[2, 2, 2]} intensity={1.05} color="#7cc8ff" />

        <Sparkles
          count={90}
          scale={[8, 8, 4]}
          size={2.2}
          speed={0.18}
          opacity={0.76}
          color="#69b9ff"
        />

        <Environment preset="city" />

        <GlassCard
          imageUrl={imageUrl}
          name={name}
          role={role}
          stack={stack}
          location={location}
          status={status}
        />
      </Canvas>
    </div>
  );
}
