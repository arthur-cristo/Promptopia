import { connectToDb } from "@utils/database";
import User from "@models/user";

export const GET = async (request, { params }) => {
    const userId = params.id;
    try {
        await connectToDb();
        const user = await User.findById(userId);
        if (!user) return new Response("User not found", { status: 404 });
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch user", { status: 500 });
    }
}