import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`Index module processed ${req.url}`);
});

export { router };
