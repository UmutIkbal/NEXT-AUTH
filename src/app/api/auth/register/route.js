import User from "@/models/user"
import { connectDB } from "@/utils/database"
import bcrypt from "bcryptjs"

export async function POST(req) {
    const { email, password, username } = await req.json()
    const name = email.split("@")[0]

    try {
        await connectDB()

        const isUser = await User.findOne({ email: email })

        if (!isUser) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                email: email,
                password: hashPassword,
                username: name
            })

            await newUser.save()
            return new Response(JSON.stringify(newUser), { status: 201 })
        }
        else {
            return new Response("User already exist")
        }

    } catch (error) {
        return new Response("Failed to create a new User", { status: 500 })
    }
}
