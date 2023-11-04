import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
const Prisma = new PrismaClient();

export const UserRegister = async (req, res) => {
    // TANGKAP DATA
    const { name, email, password, re_password, role } = req.body;

    // VALIDASI
    if (!name || !email || !password || !re_password) return res.status(400).json({ msg: "Please fill in all fields" });

    const nameExists = await Prisma.user.findFirst({ where: { name } });
    const emailExists = await Prisma.user.findFirst({ where: { email } });

    if (nameExists) return res.status(409).json({ msg: "Name already exists" });
    if (emailExists) return res.status(409).json({ msg: "Email already exists" });
    if (password !== re_password) return res.status(400).json({ msg: "Password did not match" });

    // HASSING
    const hashedPassword = await argon2.hash(password);

    // EKSEKUSI QUERY
    try {
        const user = await Prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })
        res.status(201).json({ msg: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
