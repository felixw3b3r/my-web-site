import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import projectsRouter from "./routes/projects";

const app = express();
const PORT = process.env.PORT || 1600;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/taha-portfolio";

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:1500" }));
app.use(express.json());

// Serve static files from client build in production
const clientBuild = path.join(__dirname, "..", "..", "client", "dist");
if (fs.existsSync(clientBuild)) {
  app.use(
    express.static(clientBuild, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".apk")) {
          res.setHeader("Content-Type", "application/vnd.android.package-archive");
          res.setHeader("Content-Disposition", `attachment; filename="${path.basename(filePath)}"`);
        }
      },
    })
  );
}

// API routes
app.use("/api/projects", projectsRouter);

// Serve client index.html for non-API routes in production
app.get("*", (_req, res) => {
  const indexHtml = path.join(clientBuild, "index.html");
  if (fs.existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.json({ message: "Taha Portfolio API" });
  }
});

// MongoDB connection (non-blocking — server works without it)
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB bağlandı");
    const seedData = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "..", "data", "projects.json"),
        "utf-8"
      )
    );
    const ProjectModel = mongoose.model("Project");
    const activeIds = seedData.map((p: any) => p.id);
    for (const p of seedData) {
      await ProjectModel.updateOne({ id: p.id }, { $set: p }, { upsert: true });
    }
    await ProjectModel.deleteMany({ id: { $nin: activeIds } });
    console.log("Seed verileri senkronize edildi");
  })
  .catch(() => console.log("MongoDB yok — JSON dosyası kullanılıyor"));

app.listen(PORT, () => {
  console.log(`API sunucusu: http://localhost:${PORT}`);
});
