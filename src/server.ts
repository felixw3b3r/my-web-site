/* eslint-disable */
// Bu dosya eski EJS tabanlı bir sunucu prototipidir.
// Aktif sunucu: server/src/server.ts
// Bu dosya çalıştırılmamaktadır.

import express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(
  express.static(path.join(__dirname, "..", "public"), {
    setHeaders: (res: Response, filePath: string) => {
      if (filePath.endsWith(".apk")) {
        res.setHeader("Content-Type", "application/vnd.android.package-archive");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${path.basename(filePath)}"`
        );
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  image: string;
  apkFile: string;
  version: string;
  size: string;
  date: string;
  category: string;
}

function getProjects(): Project[] {
  const data = fs.readFileSync(
    path.join(__dirname, "..", "data", "projects.json"),
    "utf-8"
  );
  return JSON.parse(data);
}

app.get("/", (_req: Request, res: Response) => {
  const projects = getProjects();
  res.render("index", {
    title: "Taha - Yazılım Geliştirici",
    projects: projects.slice(0, 3),
    currentPage: "index",
  });
});

app.get("/projects", (_req: Request, res: Response) => {
  const projects = getProjects();
  const categories = [...new Set(projects.map((p) => p.category))];
  res.render("projects", {
    title: "Projelerim - Taha",
    projects,
    categories,
    selectedCategory: (_req.query.category as string) || null,
    currentPage: "projects",
  });
});

// APK indirme API endpoint'i
app.get("/api/projects/:id/download", (req: Request, res: Response) => {
  try {
    const projects = getProjects();
    const project = projects.find((p) => p.id === req.params.id);
    if (!project || !project.apkFile) {
      return res.status(404).send("APK dosyası bulunamadı");
    }

    // Fiziksel APK dosyasını birden fazla konumda ara
    const possiblePaths = [
      path.join(__dirname, "..", "client", "dist", project.apkFile),
      path.join(__dirname, "..", "client", "public", project.apkFile),
      path.join(__dirname, "..", "public", project.apkFile),
    ];

    let resolvedPath = "";
    for (const pPath of possiblePaths) {
      const normalized = path.normalize(pPath);
      if (fs.existsSync(normalized)) {
        resolvedPath = normalized;
        break;
      }
    }

    if (!resolvedPath) {
      return res.status(404).send("APK dosyası sunucuda bulunamadı");
    }

    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${path.basename(resolvedPath)}"`
    );
    return res.sendFile(resolvedPath);
  } catch (_error: unknown) {
    return res.status(500).send("Sunucu hatası");
  }
});

app.get("/projects/:id", (req: Request, res: Response) => {
  const projects = getProjects();
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).render("404", { title: "Sayfa Bulunamadı" });
  const related = projects.filter(
    (p) => p.category === project.category && p.id !== project.id
  );
  res.render("project", {
    title: `${project.title} - Taha`,
    project,
    related,
    currentPage: "",
  });
});

app.get("/about", (_req: Request, res: Response) => {
  res.render("about", { title: "Hakkımda - Taha", currentPage: "about" });
});

app.get("/download", (_req: Request, res: Response) => {
  const projects = getProjects();
  res.render("download", { title: "İndir - Taha", projects, currentPage: "download" });
});

app.get("/contact", (_req: Request, res: Response) => {
  res.render("contact", { title: "İletişim - Taha", currentPage: "contact" });
});

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).render("404", { title: "Sayfa Bulunamadı", currentPage: "" });
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
