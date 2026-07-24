import {
  Braces,
  FileCode2,
  FileJson2,
  FileText,
  Folder,
  FolderOpen,
  Minus,
  Plus,
  Settings2,
} from "lucide-react";
import styles from "./ProjectFoldersModule.module.css";

function getNodeIcon(node) {
  if (node.type === "folder") return Folder;

  if (node.name.endsWith(".php")) return FileCode2;
  if (node.name.endsWith(".json")) return FileJson2;
  if (node.name.endsWith(".md")) return FileText;
  if (node.name.toLowerCase().includes("docker")) return Settings2;

  return Braces;
}

function getFileKind(node) {
  if (node.type === "folder") return "folder";
  if (node.name === ".env" || node.name === ".env.example") return "env";
  if (node.name.endsWith(".blade.php")) return "blade";
  if (node.name.endsWith(".php")) return "php";
  if (node.name.endsWith(".json")) return "json";
  if (node.name.endsWith(".md")) return "md";
  if (node.name.toLowerCase().includes("docker")) return "docker";
  return "default";
}

function FileRow({ node, depth = 0 }) {
  const Icon = getNodeIcon(node);
  const kind = getFileKind(node);

  return (
    <li className={styles.treeItem} style={{ "--depth": depth }}>
      <div
        className={`${styles.treeRow} ${styles.treeFileRow} ${styles[`kind${kind[0].toUpperCase()}${kind.slice(1)}`] || ""}`}
      >
        <span className={styles.treeIndent} />
        <span className={styles.treeIcon}>
          <Icon size={14} />
        </span>
        <span className={styles.treeLabel}>{node.name}</span>
      </div>
    </li>
  );
}

function FolderNode({ node, depth = 0, defaultOpen = false }) {
  const hasChildren = node.children?.length > 0;

  if (!hasChildren) {
    return <FileRow node={node} depth={depth} />;
  }

  return (
    <li className={styles.treeItem} style={{ "--depth": depth }}>
      <details className={styles.treeDetails} open={defaultOpen}>
        <summary className={`${styles.treeRow} ${styles.kindFolder}`}>
          <span className={styles.treeToggle}>
            <Plus size={12} className={styles.treePlus} />
            <Minus size={12} className={styles.treeMinus} />
          </span>

          <span className={styles.treeIconWrap}>
            <Folder size={14} className={styles.treeFolderClosed} />
            <FolderOpen size={14} className={styles.treeFolderOpen} />
          </span>

          <span className={styles.treeLabel}>{node.name}</span>
        </summary>

        <ul className={styles.treeList}>
          {node.children.map((child) => (
            <FolderNode
              key={`${node.name}-${child.name}`}
              node={child}
              depth={depth + 1}
              defaultOpen={depth < 1}
            />
          ))}
        </ul>
      </details>
    </li>
  );
}

function ProjectFoldersModule({
  title = "Estructura del Proyecto",
  tree = [],
  className = "",
}) {
  return (
    <article className={`${styles.panel} ${styles.treeModule} ${className}`}>
      <div className={styles.panelHeader}>
        <h3>{title}</h3>
      </div>

      <div className={styles.treePanel}>
        <ul className={styles.treeList}>
          {tree.map((node) => (
            <FolderNode key={node.name} node={node} depth={0} defaultOpen />
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ProjectFoldersModule;
