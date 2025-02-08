import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

import { NODE_ENV, REFRESH_TOKEN_SECRET } from "../utils/config.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // cek apakah email sudah terdaftar
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // kalo ada tampilin pesan user sudah terdaftar
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return res
      .status(200)
      .json({ data: response, message: "User created successfully" });
  } catch (error) {
    console.log(error.response?.data?.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // cari user berdasarkan email yang terdaftar apakah ada
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // Kalo gaada tampilin pesan user gaada
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Cek password apakah password di request body sama dengan password di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Kalo ga sama tampilin pesan password salah
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Melakukan generate token
    // Ambil data generate token dan refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Simpan refresh tokennya di database
    const responseToken = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      Secure: NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Simpan refreshtoken di cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      Secure: NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      data: responseToken,
      accessToken: accessToken,
      message: "Login success",
    });
  } catch (error) {
    console.log(error.response);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized | Token tidak tersedia" });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (!payload) {
      return res
        .status(401)
        .json({ message: "Unauthorized | Token tidak valid" });
    }

    const user = await prisma.users.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized | Token tidak valid" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error.response);
    return res.status(500).json({ message: "Refresh token tidak valid" });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.sendStatus(204);
  }

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    await prisma.users.update({
      where: {
        id: payload.id,
      },
      data: {
        refreshToken: null,
      },
    });
  } catch (error) {
    console.log(error.response?.data?.message);
  } finally {
    res.clearCookie("refreshToken");
    req.session.destroy();
    return res.sendStatus(204);
  }
};
