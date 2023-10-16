import { useContext } from "react";

import { AuthContext } from "@/providers/Auth/AuthContext";

export const useAuth = () => useContext(AuthContext);
