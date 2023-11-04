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

export const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
         
        if (!email || !password) return res.status(400).json({ msg: "Please fill in all fields" });
    
        const user = await Prisma.user.findFirst({ where: { email } });
    
        if (!user) return res.status(404).json({ msg: "User not found" });
    
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
        
        res.status(200).json({ msg: "Login success" , user });
    } catch (error) {
        res.status(500).json({ msg: error.message });   
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await Prisma.user.findMany();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUsersById = async (req, res) => {
    try {
        const user = await Prisma.user.findFirst({ where: { id: Number(req.params.id) } });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUsersByRole = async (req, res) => {
    try {
        const users = await Prisma.user.findMany({ where: { role: req.params.role } });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const userUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, re_password } = req.body;

        if (!name || !email || !password || !re_password) return res.status(400).json({ msg: "Please fill in all fields" });

        const nameExists = await Prisma.user.findFirst({ where: { name } });
        const emailExists = await Prisma.user.findFirst({ where: { email } });
    
        if (nameExists) return res.status(409).json({ msg: "Name already exists" });
        if (emailExists) return res.status(409).json({ msg: "Email already exists" });

        if (password !== re_password) return res.status(400).json({ msg: "Password did not match" });

        const hashedPassword = await argon2.hash(password);

        const user = await Prisma.user.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                password: hashedPassword,
                updatedAt: new Date()
            }
        })

        res.status(200).json({ msg: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateRoleUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await Prisma.user.update({
            where: { id: Number(id) },
            data: {
                role
            }
        })

        res.status(200).json({ msg: "Role User updated successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userExists = await Prisma.user.findFirst({ where: { id: Number(req.params.id) } });
        if (!userExists) return res.status(404).json({ msg: "User not found" });

        const user = await Prisma.user.delete({ where: { id: Number(req.params.id) } });
        res.status(200).json({ msg: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}