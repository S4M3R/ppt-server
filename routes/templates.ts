import { Router } from "express";

const router = Router("/templates");




router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/", (req, res) => {
  res.send("Hello World");
});

export default router;