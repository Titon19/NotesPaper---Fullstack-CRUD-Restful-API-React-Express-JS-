const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

const errorFieldStatus = 400;
const errorMessageStatus = 500;
const successfullyStatus = 201;

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await prisma.notes.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(notes);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.getEditNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await prisma.notes.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(errorFieldStatus).json({ errors: errors.array() });
  }

  const { title, content, category_id } = req.body;
  try {
    const note = await prisma.notes.create({
      data: {
        title: title,
        content: content,
        category_id: Number(category_id),
      },
    });
    res
      .status(successfullyStatus)
      .json({ data: note, message: "Note created successfully" });
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(errorFieldStatus).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, content, category_id } = req.body;

  try {
    const note = await prisma.notes.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        content: content,
        category_id: Number(category_id),
      },
    });

    res
      .status(successfullyStatus)
      .json({ data: note, message: "Note updated successfully" });
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
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
