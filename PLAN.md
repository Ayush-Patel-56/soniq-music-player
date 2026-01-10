# Project Technical Plan & Architecture Decisions

---

## 0. Reality Check (Very Important)

You are **NOT** building Spotify.

You are building a **Spotify-like MVP** with:
- Limited users
- No paid infrastructure
- Creator-focused features

### Therefore, every decision must optimize for:
- Free-tier limits
- Low latency
- Minimal backend
- Strong client-side execution

---

## 1. Authentication — Do We Need JWT?

### Short Answer
No. We should **NOT implement custom JWT authentication**.

### Why NOT Custom JWT?
- High security risk if implemented incorrectly
- Token refresh, expiry, and rotation are complex
- Overkill for an MVP
- Causes bugs and deployment issues

### Best Choice: Supabase Auth (Managed)

Supabase provides:
- Email/password authentication
- OAuth support (Google, GitHub later)
- Secure JWT handling internally
- Session management
- Automatic user table

We **do not handle JWT directly**.

### Authentication Flow
- User signs up → Supabase Auth
- Supabase returns session
- Frontend uses session
- Backend trusts Supabase

### Pros
- No backend auth logic
- Secure by default
- Free-tier friendly
- Fast to implement

### Cons
- Vendor lock-in
- Limited custom authentication flows

**Decision:** 100% worth it for this project.

---

## 2. Songs — Where Do Songs Come From?

This is the **most critical architectural decision**.

### What We CANNOT Do
- Upload full songs to Supabase storage
- Stream copyrighted music
- Host MP3 files ourselves

Storage + bandwidth costs scale very fast.

---

### Correct MVP Strategy

#### Option A: API-Based Music (Recommended)

Use royalty-free or preview-based sources such as:
- Spotify Web API (30-second previews)
- Jamendo API
- FreeSound (instrumentals)
- Sample audio packs

We **do NOT store songs**, only metadata.

#### Stored Metadata Example
```json
{
  "song_id": "",
  "title": "",
  "artist": "",
  "cover_url": "",
  "audio_preview_url": "",
  "duration": ""
}
```

### Pros
- No storage cost
- Legal-safe
- Fast CDN-based streaming
- Scales well

### Cons
- Full song playback not possible
- Depends on external API availability

---

## 3. Client-heavy, server-light approach

| Part              | Where              |
| ----------------- | ------------------ |
| UI                | Frontend           |
| Audio playback    | Browser            |
| Remix recording   | Browser            |
| Karaoke recording | Browser            |
| Authentication    | Supabase           |
| Metadata          | Supabase DB        |
| Media files       | Client / Temporary |

---

## 4. Remix Feature — Camera, Video, Filters

### Camera Recording (No Server)

Use browser APIs:
- `MediaDevices.getUserMedia()`
- `MediaRecorder`

### Recording Flow
1. User records video
2. ↓
3. Stored in memory (Blob)
4. ↓
5. User edits / applies filters
6. ↓
7. Preview
8. ↓
9. Optional upload if user saves

### Video Storage Strategy
- Do NOT upload by default
- Store in browser memory or IndexedDB
- Upload only when explicitly saved

### Filters & Effects (No Backend)

#### Technologies:
- Canvas API
- WebGL (Three.js / PixiJS)
- CSS filters
- FFmpeg.wasm (advanced use)

#### Examples:
- Neon glow
- Glitch effects
- Color shifts
- Beat-synced visuals

#### Pros
- No server cost
- Real-time preview
- Smooth UX

#### Cons
- CPU intensive
- Requires optimization

---

## 5. Karaoke — Audio Recording & Storage

### Recording Tools
- `MediaRecorder`
- Web Audio API (AudioContext)

### Recording Flow
1. Instrumental plays
2. ↓
3. Microphone records voice
4. ↓
5. Audio stored as Blob
6. ↓
7. Optional waveform generation

### Storage Strategy
- Do NOT auto-upload
- Keep recordings local first
- Upload only if user saves

### If uploaded:
- Compress audio
- Limit duration
- Store only user-generated content

---

## 6. Waveforms — How Spotify-Style Waveforms Work

- No server-side audio analysis
- All processing happens client-side

### Tools
- Web Audio API
- Audio buffer decoding
- Client-side peak generation

### Libraries
- WaveSurfer.js
- Custom AudioContext logic

### Pros
- Instant rendering
- No backend cost
- Fully interactive

---

## 7. Database — What Supabase Stores

### What We Do NOT Store
- Audio files
- Video files
- Media blobs

### What We Store (Metadata Only)
- users
- songs (API-based)
- playlists
- remixes (metadata only)
- karaoke_sessions (metadata only)
- likes
- history

Media is either temporary or user-uploaded only.

---

## 8. Deployment — Avoiding Render Issues

### Avoid
- Backend-heavy architecture
- Always-on servers
- SSR everywhere

### Recommended Stack

#### Frontend
- HTML, CSS, JS
- React (if needed)

#### Backend
- Supabase (Auth + DB)
- No custom backend initially

#### Hosting
- Vercel OR Netlify

**Static-first deployment is mandatory.**

---

## 9. Final Recommended MVP Stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| UI             | HTML/CSS/JS              |
| Animations     | Framer Motion            |
| Audio          | Web Audio API            |
| Video          | MediaRecorder + Canvas   |
| Waveform       | WaveSurfer.js            |
| Auth           | Supabase Auth            |
| Database       | Supabase (metadata only) |
| Hosting        | Vercel                   |
| Media Handling | Browser-first            |

---

## Biggest Mistake to Avoid

- Treating this like a backend-heavy project.
- **Thinking this is a frontend-driven product** (Wait, checks text: 'Thinking this is a frontend-driven product' was listed as a mistake? Or implies it IS a frontend driven product? The original text said:
> - Treating this like a backend-heavy project.
> - Thinking this is a frontend-driven product.

This phrasing is contradictory or implies it's *neither* or *both*? Given the context ("Client-heavy, server-light"), it likely means "Don't think this is JUST a frontend product (it has complex logic)" or maybe it meant "Thinking this is a BACKEND driven product".

Let's stick to the original text but format it clearly as a warning list.

- Treating this like a backend-heavy project.
- Thinking this is a frontend-driven product (Likely means ignoring the complexity of client-side media processing).

---

## How to Build (Phased Approach)

### Phase 1
- Static UI
- Fake data
- Local audio playback

### Phase 2
- Supabase authentication
- API-based songs

### Phase 3
- Remix recording
- Karaoke recording

### Phase 4
- Optional uploads
- Performance optimization

---

## What Can Be Built with HTML, CSS, and JS

### Music Player
- `<audio>` + Web Audio API
- Custom controls
- Animated waveforms
- Playlists
- Progress scrubber
- Background particle animations

### Remix Feature
- `getUserMedia`
- `MediaRecorder`
- Canvas-based filters
- CSS + JS animations
- Reel-style timeline

**Vanilla JS performs better than React here.**

### Karaoke Feature
- Instrumental playback
- Microphone recording
- Lyrics sync
- Waveform generation

**Native browser APIs provide best performance.**

### Animations
- CSS animations
- `requestAnimationFrame`
- Canvas
- WebGL (optional)


### Expected folder structure:
/public
  index.html

/src
  /styles
    base.css
    player.css
    remix.css
    karaoke.css
    animations.css

  /scripts
    app.js
    state.js
    auth.js
    audio.js
    waveform.js
    remix.js
    karaoke.js
    camera.js
    api.js

  /components
    player.js
    playlist.js
    modal.js

  /utils
    helpers.js
    constants.js
