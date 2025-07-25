import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"], 
            "svix-signature": req.headers["svix-signature"]
        });

        const {data, type} = req.body;

        switch(type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }

                await User.create(userData);
                res.status(200).json({message: "User created successfully!"});
                break;
            }

            case 'user.updated': {
                    const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }

                await User.findByIdAndUpdate(data.id, userData, {new: true});
                res.status(200).json({message: "User updated successfully!"});
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.status(200).json({message: "User deleted successfully!"});
                break;
            }

            default:
                break;
        }
    } catch (error) {
        res.json({success: false, message: error.message});
    }

    }

export default clerkWebhooks;