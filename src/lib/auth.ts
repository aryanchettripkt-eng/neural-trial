import { supabase } from "./supabase";

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    }
  });

  if (error) {
    console.error("Google sign in error:", error);
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
