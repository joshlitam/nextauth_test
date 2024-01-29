"use server"
// "use server call very important for server actions"

import { connectToDb } from "./utils"
import { User } from "./models";
import { revalidatePath } from "next/cache";
import { signOut } from "./auth";

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
    console.log(id);

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