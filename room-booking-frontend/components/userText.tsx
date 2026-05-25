"use client" ;

import {fetchRole} from "@/lib/api";
import { useEffect, useState } from "react";

export default function UserText() {
    const [role ,setRole] = useState<string | undefined>(undefined);

    useEffect(() => {
     async function getRole() {
        const role = await fetchRole();
        setRole(role);
      }
      getRole();
    }, []);

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