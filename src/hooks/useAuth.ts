import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("[Auth] Initializing session...");
        
        const initSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                
                setUser(session?.user ?? null);
                console.log("[Auth] Session initialized. User:", session?.user?.id || "None");
            } catch (error) {
                console.error("[Auth] Session initialization error:", error);
            } finally {
                setLoading(false);
            }
        };

        initSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log(`[Auth] State change (${event}):`, session?.user?.id || "None");
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { user, loading };
};