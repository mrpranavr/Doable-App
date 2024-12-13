import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl ="https://nsegvqfxktuplysraolr.supabase.co"
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZWd2cWZ4a3R1cGx5c3Jhb2xyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjkzMDMsImV4cCI6MjA0OTYwNTMwM30.0TaBvvGqP3ZZycnWpOegOrylEcVje0gmlMjkaYSe3-o"

export async function getSupabaseClient(getToken: ({}) => Promise<string | null>) {
  return createClient(
    supabaseUrl!,
    supabaseAnonKey!,
    {
      auth: {
        storage: AsyncStorage as any,
      },
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({ template: 'supabase-doable' });
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${clerkToken}`);
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}
