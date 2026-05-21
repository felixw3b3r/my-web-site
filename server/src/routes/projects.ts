import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Project } from "../models/Project";
import { IProject } from "../types";

const router = Router();

function loadSeedData(): IProject[] {
  const filePath = path.join(__dirname, "..", "..", "..", "data", "projects.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

// GET /api/projects
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let projects;

    if (category) {
      projects = await Project.find({ category: category as string }).sort({ date: -1 });
    } else {
      projects = await Project.find().sort({ date: -1 });
    }

    // Fallback to JSON file if MongoDB is empty
    if (projects.length === 0) {
      const seed = loadSeedData();
      if (category) {
        return res.json(seed.filter((p) => p.category === category));
      }
      return res.json(seed);
    }

    res.json(projects);
  } catch {
    // MongoDB unavailable — fallback to file
    const seed = loadSeedData();
    const { category } = req.query;
    if (category) {
      return res.json(seed.filter((p) => p.category === category));
    }
    res.json(seed);
  }
});

// GET /api/projects/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (project) return res.json(project);

    // Fallback
    const seed = loadSeedData();
    const found = seed.find((p) => p.id === req.params.id);
    if (!found) return res.status(404).json({ error: "Proje bulunamadı" });
    res.json(found);
  } catch {
    const seed = loadSeedData();
    const found = seed.find((p) => p.id === req.params.id);
    if (!found) return res.status(404).json({ error: "Proje bulunamadı" });
    res.json(found);
  }
});

// GET /api/projects/:id/download
router.get("/:id/download", async (req: Request, res: Response) => {
  try {
    let project = await Project.findOne({ id: req.params.id });
    if (!project) {
      const seed = loadSeedData();
      project = seed.find((p) => p.id === req.params.id) as any;
    }

    if (!project || !project.apkFile) {
      return res.status(404).json({ error: "APK dosyası bulunamadı" });
    }

    // Try multiple possible paths to locate the physical APK file
    const possiblePaths = [
      path.join(__dirname, "..", "..", "..", "client", "dist", project.apkFile),
      path.join(__dirname, "..", "..", "..", "client", "public", project.apkFile),
      path.join(__dirname, "..", "..", "..", "public", project.apkFile),
      path.join(__dirname, "..", "..", "client", "dist", project.apkFile),
      path.join(__dirname, "..", "..", "client", "public", project.apkFile),
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
      return res.status(404).json({ error: "APK dosyası sunucuda bulunamadı" });
    }

    const fileName = path.basename(resolvedPath);
    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    
    return res.sendFile(resolvedPath);
  } catch (error) {
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
