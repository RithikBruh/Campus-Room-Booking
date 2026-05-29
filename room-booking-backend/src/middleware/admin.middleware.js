
import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'

import { getRole } from "../models/userroles.model.js"
// Load .env when present (local development)
dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const adminMiddleware = async (req, res, next) => {
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

    // TODO : cookies later
    
    const role = await getRole(user.email)
    if (role.slice(0,6) !== "admin@") {
        return res.status(403).json({ message: 'Access denied. No role assigned to this user.' })
    }

    req.user = user
    req.user.role = role
    next()
}

