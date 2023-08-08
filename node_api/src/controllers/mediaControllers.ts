import { Request, Response } from "express";
import {
  insertMedia,
  findMediaByID,
  findMediaByName,
  findMediaByType,
} from "../models/mediaModel";

const getByIDController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const media = await findMediaByID(Number(id));
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getByTypeController = async (req: Request, res: Response) => {
  const { type } = req.params;
  if (type !== "book" && type !== "TV" && type !== "movie") {
    res.status(400).json({ error: "Invalid media type" });
  } else {
    try {
      const media = await findMediaByType(type);
      res.status(200).json(media);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};

const getByNameController = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const media = await findMediaByName(name);
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const addMediaController = async (req: Request, res: Response) => {
  const { name, type, link, imgURI } = req.body;

  try {
    const result = await insertMedia({
      name,
      type,
      link,
      imgURI,
    });
    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: "Media added successfully" });
    } else {
      res.status(400).json({ error: "Media not added" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
export {
  getByIDController,
  getByTypeController,
  getByNameController,
  addMediaController,
};
