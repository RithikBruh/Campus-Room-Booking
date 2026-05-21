
import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'

import { getRole } from "../models/userroles.model.js"
// Load .env when present (local development)
dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

// if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
//     console.error(
//         'Missing SUPABASE_URL or SUPABASE_ANON_KEY. Create a .env file or set these environment variables.'
//     )
//     throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are required for authentication.')
// }

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' })
    }

    // TODO : use cookies later for better security
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Token missing' })
    }

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // TODO : change
    // if (user.email.slice(-11) !== "@iith.ac.in") {
    //     return res.status(403).json({ message: 'Access denied. Only IITH email users can access this resource.' })
    // }

    const role = await getRole(user.email)
    if (!role) {
        return res.status(403).json({ message: 'Access denied. No role assigned to this user.' })
    }


    req.user = user
    req.user.role = role
    next()
}

