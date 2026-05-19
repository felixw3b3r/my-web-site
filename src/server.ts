import express from "express";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));
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

app.get("/", (_req, res) => {
  const projects = getProjects();
  res.render("index", {
    title: "Taha - Yazılım Geliştirici",
    projects: projects.slice(0, 3),
    currentPage: "index",
  });
});

app.get("/projects", (_req, res) => {
  const projects = getProjects();
  const categories = [...new Set(projects.map((p) => p.category))];
  res.render("projects", {
    title: "Projelerim - Taha",
    projects,
    categories,
    selectedCategory: _req.query.category as string | null,
    currentPage: "projects",
  });
});

app.get("/projects/:id", (req, res) => {
  const projects = getProjects();
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).render("404", { title: "Sayfa Bulunamadı" });
  const related = projects.filter(
    (p) => p.category === project.category && p.id !== project.id
  );
  res.render("project", { title: `${project.title} - Taha`, project, related, currentPage: "" });
});

app.get("/about", (_req, res) => {
  res.render("about", { title: "Hakkımda - Taha", currentPage: "about" });
});

app.get("/download", (_req, res) => {
  const projects = getProjects();
  res.render("download", { title: "İndir - Taha", projects, currentPage: "download" });
});

app.get("/contact", (_req, res) => {
  res.render("contact", { title: "İletişim - Taha", currentPage: "contact" });
});

app.use((_req, res) => {
  res.status(404).render("404", { title: "Sayfa Bulunamadı", currentPage: "" });
});

app.listen(PORT, () => {
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
