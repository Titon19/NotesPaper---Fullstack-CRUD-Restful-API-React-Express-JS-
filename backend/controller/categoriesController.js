import prisma from "../utils/prisma.js";
import { validationResult } from "express-validator";

const errorFieldStatus = 400;
const errorMessageStatus = 500;
const successfullyStatus = 201;

export const getAllCategories = async (req, res) => {
  try {
    const response = await prisma.categories.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(successfullyStatus).json(response);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const getEditCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(successfullyStatus).json(response);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(errorFieldStatus).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const response = await prisma.categories.create({
      data: {
        name: name,
      },
    });
    res.status(successfullyStatus).json(response);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(errorFieldStatus).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { name } = req.body;

  try {
    const response = await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });

    res.status(successfullyStatus).json(response);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.categories.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(successfullyStatus)
      .json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};
