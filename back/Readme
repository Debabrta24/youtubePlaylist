Implement the following logic without changing the existing UI, fonts, styling, or layout. Only add the required functionality.

1. Initial API

POST: http://localhost:3000/

Request Body:
{
  "youtube_url": "<playlist_url>",
  "full_playlist": true
}

- `full_playlist` should default to `true`.
- Send the YouTube playlist URL entered by the user.

Response Handling:

If `full_playlist === true`:
- The API returns the total playlist duration in seconds.
- Display the duration.
- Also display playback speed options:
  - 1x
  - 1.25x
  - 1.5x
  - 1.75x
  - 2x
- Additionally, provide a slider allowing playback speeds up to 10x.
- Whenever the speed changes, automatically recalculate and display the updated watch time.

If `full_playlist === false`:
- The API returns an array of YouTube video IDs.

Example Request:

{
  "youtube_url": "https://youtube.com/playlist?list=RDbmX2nhCY3wU&playnext=1&si=N5infBJ7d_8sIymf",
  "full_playlist": false
}

--------------------------------------------------------

Environment Variables

VITE_URL=http://localhost:3000/
VITE_CUSTOMIZED_PLAYLIST_URL=http://localhost:3000/editedplayslt

--------------------------------------------------------

2. Customized Playlist API

POST: http://localhost:3000/editedplayslt

Request Body:

{
  "starting": 1,
  "ending": 10,
  "array": [
    "uZ3Y9f8JIBU",
    "iz2V4ZM0B2U",
    "1tf2uKbM4rA",
    "LB40_lLxKLI",
    "UOfih2w01wY"
  ]
}

The `array` should contain the video IDs received from the first API.

--------------------------------------------------------

Required Features

1. Show all returned videos with a checkbox beside each video.

2. Allow the user to select/deselect videos.

3. Provide "Starting" and "Ending" inputs.

4. Before sending the second API request:
   - Filter the selected videos.
   - Apply the Starting and Ending indices.
   - Only send the video IDs within that range.

Example:

Original array contains 10 video IDs.

If:
Starting = 2
Ending = 4

Then send only video IDs at indices 2, 3, and 4 (3 videos total).

5. After receiving the duration from the second API:
   - Display the total time.
   - Show playback speed buttons (1x, 1.25x, 1.5x, 1.75x, 2x).
   - Include a slider that supports speeds up to 10x.
   - Update the displayed watch time dynamically whenever the playback speed changes.

Important:
- Do NOT change the existing UI.
- Do NOT change fonts, colors, spacing, or layout.
- Only implement the required logic and state management.
- Preserve all existing functionality while adding the new features.
