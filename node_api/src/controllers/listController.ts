import { Request, Response } from "express";
import {
  insertListEntry,
  updateListEntry,
  getListEntry,
} from "../models/listModel";

const addListEntryController = async (req: Request, res: Response) => {
  const { mediaID } = req.body;
  const userID = res.locals.decoded.id;
  try {
    const result = await insertListEntry({
      userID,
      mediaID,
      archived: false,
    });
    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: "List entry added successfully" });
    } else {
      res.status(400).json({ error: "List entry not added" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateListEntryController = async (req: Request, res: Response) => {
  const { entryID } = req.params;
  const id = Number(entryID);

  try {
    const result = await updateListEntry(id);
    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: "List entry updated successfully" });
    } else {
      res.status(400).json({ error: "List entry not updated" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getListEntryController = async (req: Request, res: Response) => {
  const userID = res.locals.decoded.id;

  try {
    const medias = await getListEntry(Number(userID));
    res.status(200).json(medias);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
export {
  addListEntryController,
  updateListEntryController,
  getListEntryController,
};
