import { Request, Response } from "express";
import {
  insertDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
  findDiaryEntryByEvent,
} from "../models/diaryModel";

const addEntryController = async (req: Request, res: Response) => {
  const { mediaID, event, notes, entryDate } = req.body;
  const userID = res.locals.decoded.id;

  try {
    const result = await insertDiaryEntry({
      userID,
      mediaID,
      event,
      notes,
      entryDate,
    });

    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: "Media added successfully" });
    } else {
      res.status(400).json({ error: "Media not added" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateEntryController = async (req: Request, res: Response) => {
  const { mediaID, event, notes, entryDate, logID } = req.body;
  const userID = res.locals.decoded.id;
  try {
    const result = await updateDiaryEntry({
      userID,
      mediaID,
      event,
      notes,
      entryDate,
      logID,
    });

    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: "Entry updated successfully" });
    } else {
      res.status(400).json({ error: "Entry not updated" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteEntryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteDiaryEntry(Number(id));
    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: "Entry deleted successfully" });
    } else {
      res.status(400).json({ error: "Entry not deleted" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getStartedController = async (req: Request, res: Response) => {
  const userID = res.locals.decoded.id;

  try {
    const resultStarted = await findDiaryEntryByEvent("started", userID);
    const resultRestarted = await findDiaryEntryByEvent("restarted", userID);
    const result = resultStarted.concat(resultRestarted);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getCompletedController = async (req: Request, res: Response) => {
  const userID = res.locals.decoded.id;

  try {
    const result = await findDiaryEntryByEvent("completed", userID);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export {
  addEntryController,
  updateEntryController,
  deleteEntryController,
  getStartedController,
  getCompletedController,
};
