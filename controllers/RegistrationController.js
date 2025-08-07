    import Registration from "../models/Registration.js";

    export async function register(req, res, next) {
    const { eventId } = req.params;
    const userId = req.user._id;

    try {
        const exists = await Registration.findOne({ event: eventId, user: userId });
        if (exists) {
        return res.status(400).json({ message: "Already registered!" });
        }

        const registration = new Registration({ event: eventId, user: userId });
        await registration.save();

        return res.status(201).json({ message: "Registered!", registration });
    } catch (error) {
        return res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    }
    }
