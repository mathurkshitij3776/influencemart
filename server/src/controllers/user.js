// 
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // 1. Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: "User already registered with this email" });
    }

    // 2. Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    // // 4. Generate JWT token
    // const token = Jwt.sign(
    //   { id: newUser.id, email: newUser.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "7d" }
    // );

    // 5. Return response
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    //   token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: "User not found" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Incorrect password" });

  // Create JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d", // optional
  });



  res.json({ message: "Login successful", token });
};



export {
  register, login
};
