import { supabase } from "./supabaseClient";

export async function uploadTempAvatar(userId: string, avatarFile: Blob) {
  return await supabase.storage
    .from("avatars")
    .upload(`private/${userId}.jpeg`, avatarFile, {
      cacheControl: "3600",
      contentType: "image/jpeg",
      upsert: true,
    });
}

export async function moveTempAvatar(userId: string) {
  return await supabase.storage
    .from("avatars")
    .move(`private/${userId}.jpeg`, `public/${userId}.jpeg`);
}

export const getAvatarUrl = (userId: string, type: string) =>
  supabase.storage.from("avatars").getPublicUrl(`${type}/${userId}.jpeg`);
