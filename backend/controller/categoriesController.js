const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

const errorFieldStatus = 400;
const errorMessageStatus = 500;
const successfullyStatus = 201;

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(successfullyStatus).json(categories);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.getEditCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(successfullyStatus).json(category);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(errorFieldStatus).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    const category = await prisma.categories.create({
      data: {
        name: name,
      },
    });
    res.status(successfullyStatus).json(category);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(errorFieldStatus).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
      },
    });

    res.status(successfullyStatus).json(category);
  } catch (error) {
    res.status(errorMessageStatus).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
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
