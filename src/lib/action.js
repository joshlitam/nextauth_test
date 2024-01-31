"use server"
// "use server call very important for server actions"

import { connectToDb } from "./utils"
import { User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addUser = async (prevState, formData) => {

    const { username, password, repeatPassword, email, img } = Object.fromEntries(formData);

    if (password !== repeatPassword) return { error: ("passwords must match") }

    try {
        connectToDb();
        const newUser = new User({
            username,
            email,
            password,
            img,
        });

        await newUser.save();
        console.log("saved to db!")
        revalidatePath("/admin");
    } catch (error) {
        console.log(error)
        return { error: ("failed to create new user") }
    }
}

export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();

        await User.findByIdAndDelete(id);
        console.log("deleted")
        revalidatePath("/admin");
    } catch (error) {
        console.log(error)
        return { error: ("failed to delete") }
    }
}

export const handleLogout = async () => {
    'use server'
    await signOut();
}

export const login = async (prevState, formData) => {
    'use server'

    const { username, password } = Object.fromEntries(formData);
    try {
        await signIn("credentials", { username, password })
    } catch (error) {
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" }
        }
        throw error
    }
}

export const register = async (prevState, formData) => {

    const { username, email, password, repeatPassword, img } = Object.fromEntries(formData);

    if (password !== repeatPassword) {
        return { error: "Password does not match" };
    }

    try {
        connectToDb();

        const user = await User.findOne({ username });
        if (user) {
            return { error: "User already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        })

        await newUser.save();
        console.log("Saved to db!");
        return { sucess: true };
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong!" }
    }
}