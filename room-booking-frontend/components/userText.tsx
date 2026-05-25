"use client" ;

export default function UserText({ role }: { role: string | undefined }) {
   
    if (role?.toLowerCase() == "student") {
    return (<span className="text-sm text-green-500"> Student User </span>)
    }
    else if (role?.toLowerCase().includes("admin")) {
        return (<span className="text-sm text-zinc-400"> {role} User </span>)
    }
    else {
        return (<span className="text-sm text-red-400"> INVALID USER </span>)
    }
}