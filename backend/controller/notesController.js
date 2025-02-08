import prisma from "../utils/prisma.js";
import { validationResult } from "express-validator";

import fs from "fs";
import path from "path";
const errorFieldStatus = 400;
const errorMessageStatus = 500;
const successfullyStatus = 201;

export const getAllNotes = async (req, res) => {
  try {
    const response = await prisma.notes.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(successfullyStatus).json(response);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const getEditNote = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.notes.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(successfullyStatus).json(response);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(errorFieldStatus).json({ errors: errors.array() });
  }

  const { title, content, category_id } = req.body;
  const imagePath = req.file && `/uploads/images/${req.file.filename}`;
  try {
    const response = await prisma.notes.create({
      data: {
        title: title,
        content: content,
        category_id: Number(category_id),
        image: imagePath,
      },
    });

    res
      .status(successfullyStatus)
      .json({ data: response, message: "Note created successfully" });
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(errorFieldStatus).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, content, category_id } = req.body;

  try {
    const existNote = await prisma.notes.findUnique({
      where: {
        id: Number(id),
      },
    });

    !existNote && res.status(404).json({ error: "Note not found" });

    let imagePath = existNote.image;

    // mau upload ulang nih request imagenya di update
    if (req.file) {
      // cek dulu nih image tersedia apa ngga
      if (existNote.image) {
        // ambil dari direktori storage
        const oldImagePath = path.join(__dirname, "../public", existNote.image);
        // Kalo misalkan direktori lama atau old tersedia
        if (fs.existsSync(oldImagePath)) {
          // Hapus file dari storage
          fs.unlinkSync(oldImagePath);
        }
      }

      // Kalo udah dihapus nah baru diganti yang baru di bawah ini
      imagePath = `/uploads/images/${req.file.filename}`;
    }

    const response = await prisma.notes.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        content: content,
        category_id: Number(category_id),
        image: imagePath,
      },
    });

    res
      .status(successfullyStatus)
      .json({ data: response, message: "Note updated successfully" });
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const existNote = await prisma.notes.findUnique({
      where: {
        id: Number(id),
      },
    });

    !existNote && res.status(404).json({ error: "Note not found" });

    if (existNote.image) {
      const oldImagePath = path.join(__dirname, "../public", existNote.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await prisma.notes.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(successfullyStatus).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};
