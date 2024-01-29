import { User } from "./models";
import { connectToDb } from "./utils"

export const getUsers = async () => {
    try {
        connectToDb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}