# Shared Dino leaderboard setup

The leaderboard and play count use a Vercel API route backed by Firebase Realtime Database. The root-level `api/dino.js` entry forwards requests to the handler in `netal-portfolio/api/dino.js`, so Vercel can detect the function while building the repository-root workspace. Firebase Admin credentials are used only by the API and must never be added to client-side `VITE_` variables.

## Configure Firebase

1. Create a Firebase project and a Realtime Database. Copy the database URL shown in the Firebase console.
2. Create a service-account key in **Project settings → Service accounts** and keep the JSON private.
3. In the Realtime Database **Rules** tab, deny direct client access. The Vercel API uses the Admin SDK, which bypasses these rules:

   ```json
   {
     "rules": {
       ".read": false,
       ".write": false
     }
   }
   ```

## Configure Vercel

In the Vercel project for `netalportfolio.xyz`, add these **Production** environment variables under **Settings → Environment Variables**:

- `FIREBASE_DATABASE_URL`: the Realtime Database URL.
- `FIREBASE_SERVICE_ACCOUNT`: the complete service-account JSON from Firebase.

Keep both variables server-side (do not prefix them with `VITE_`). Redeploy the site after saving them. The `/api/dino` endpoint then serves the shared top five and atomically increments the all-time play count.

With the current local Vite server, the site UI can be previewed but `/api/dino` is not served. To test the API locally, use the Vercel CLI with the Vercel project’s development environment variables.

Scores are submitted by the browser after a player chooses a name or Anonymous. The API validates the input and stores only the top five, but scores are not cryptographically verified against gameplay.
