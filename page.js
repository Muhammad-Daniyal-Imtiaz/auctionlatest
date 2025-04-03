"use client";
import supabase from "./Supabase/config";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const SignInHandler = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const handleUserData = async () => {
      try {
        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
          console.error("No email available");
          return;
        }

        // Generate username if not provided
        const username = user.username || email.split('@')[0] || null;
        const profileImageUrl = user.profileImageUrl || null;

        // First try to insert
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            clerk_id: user.id,
            email: email,
            username: username,
            profile_image_url: profileImageUrl,
            role: "authenticated",
            updated_at: new Date().toISOString()
          });

        // If insert fails because user exists, then update
        if (insertError?.code === "23505") {
          const { error: updateError } = await supabase
            .from("users")
            .update({
              email: email,
              username: username,
              profile_image_url: profileImageUrl,
              updated_at: new Date().toISOString()
            })
            .eq("clerk_id", user.id);

          if (updateError) throw updateError;
          console.log("Existing user updated");
          return;
        }

        if (insertError) throw insertError;
        console.log("New user created");
      } catch (err) {
        console.error("Error processing user:", {
          message: err.message,
          code: err.code,
          details: err.details
        });
      }
    };

    handleUserData();
  }, [isSignedIn, user]);

  return <p>Processing authentication...</p>;
};

export default SignInHandler;