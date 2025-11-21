import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }

        const API_KEY = process.env.MAILERLITE_API_TOKEN

        if (!API_KEY) {
            console.error("MAILERLITE_API_TOKEN is not defined")
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
        }

        // 1. Search for subscriber to check if it exists (optional, but good practice)
        // MailerLite API v2 "add subscriber" handles updates automatically usually, 
        // but let's use the standard endpoint to create/update.

        const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: email,
                groups: ["171716604033238691"],
                // groups: ["GROUP_ID"], // Optional: Add to specific group if needed
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            // Handle MailerLite specific errors
            const errorMessage = data.message || "Error subscribing to newsletter"
            // Check if it's a validation error
            if (data.errors) {
                console.error("MailerLite validation errors:", data.errors)
            }
            return NextResponse.json({ error: errorMessage }, { status: response.status })
        }

        return NextResponse.json({ success: true, message: "Subscribed successfully" })
    } catch (error) {
        console.error("Newsletter API Error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
