import {
  Braces,
  FileCode2,
  FileText,
  Folder,
  FolderOpen,
  Settings2,
} from "lucide-react";
import ProjectFoldersModule from "./ProjectFoldersModule";
import styles from "./ProjectShowcase.module.css";

const projectTree = [
  {
    type: "folder",
    name: "app",
    children: [
      { type: "folder", name: "Filament" },
      {
        type: "folder",
        name: "Http",
        children: [
          { type: "folder", name: "Controllers" },
          { type: "folder", name: "Requests" },
          { type: "folder", name: "Resources" },
        ],
      },
      { type: "folder", name: "Models" },
    ],
  },
  {
    type: "folder",
    name: "config",
    children: [
      { type: "file", name: "app.php" },
      { type: "file", name: "cors.php" },
      { type: "file", name: "database.php" },
      { type: "file", name: "mail.php" },
      { type: "file", name: "queue.php" },
      { type: "file", name: "sanctum.php" },
      { type: "file", name: "scramble.php" },
    ],
  },
  {
    type: "folder",
    name: "resources",
    children: [
      {
        type: "folder",
        name: "views",
        children: [
          { type: "file", name: "backend-home.blade.php" },
          { type: "folder", name: "emails" },
          { type: "file", name: "welcome.blade.php" },
        ],
      },
    ],
  },
  {
    type: "folder",
    name: "routes",
    children: [
      { type: "file", name: "api.php" },
      { type: "file", name: "web.php" },
      { type: "file", name: "console.php" },
    ],
  },
  { type: "file", name: "Dockerfile" },
  { type: "file", name: "docker-compose.yml" },
  { type: "file", name: "README.md" },
];

const highlightedCode = [
  "Route::middleware('auth:sanctum')->group(function () {",
  "  Route::post('/projects', [ProjectController::class, 'store']);",
  "  Route::put('/projects/{id}', [ProjectController::class, 'update']);",
  "  Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);",
  "});",
  "",
  "Route::get('/portfolio-home', [PortfolioController::class, 'home']);",
  "Route::get('/projects/{slug}', [ProjectController::class, 'show']);",
];

const technologies = [
  { name: "Laravel", value: 95 },
  { name: "PHP 8.4", value: 92 },
  { name: "PostgreSQL", value: 88 },
  { name: "Neon", value: 84 },
  { name: "Render", value: 86 },
  { name: "Docker", value: 90 },
  { name: "Sanctum", value: 82 },
  { name: "Filament", value: 80 },
  { name: "Scramble", value: 78 },
  { name: "Resend", value: 76 },
];

function getNodeIcon(node) {
  if (node.type === "folder")
    return node.children?.length ? FolderOpen : Folder;
  if (node.name.endsWith(".php")) return FileCode2;
  if (node.name.endsWith(".md")) return FileText;
  if (node.name.includes("docker")) return Settings2;
  return Braces;
}

function TreeNode({ node, depth = 0 }) {
  const Icon = getNodeIcon(node);

  return (
    <li className={styles.treeItem} style={{ "--depth": depth }}>
      <div className={styles.treeRow}>
        <Icon size={14} />
        <span>{node.name}</span>
      </div>

      {node.children?.length ? (
        <ul className={styles.treeList}>
          {node.children.map((child) => (
            <TreeNode
              key={`${node.name}-${child.name}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function ProjectShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <ProjectFoldersModule tree={projectTree} />

        <article className={`${styles.panel} ${styles.codePanel}`}>
          <div className={styles.panelHeader}>
            <h3>Código Destacado</h3>
            <span className={styles.fileBadge}>routes/api.php</span>
          </div>

          <div className={styles.codeBlock}>
            {highlightedCode.map((line, index) => (
              <div key={`${line}-${index}`} className={styles.codeLine}>
                <span className={styles.lineNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <code>{line || " "}</code>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Tecnologías Utilizadas</h3>
          </div>

          <div className={styles.techList}>
            {technologies.map((item) => (
              <div key={item.name} className={styles.techItem}>
                <div className={styles.techMeta}>
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className={styles.techBar}>
                  <span style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default ProjectShowcase;
