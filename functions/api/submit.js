export async function onRequestPost(context) {
  const data = await context.request.formData();
  const email = data.get('email');
  
  // Extracting events (you can loop this for more inputs)
  const event1 = { name: data.get('event_name_1'), year: data.get('event_year_1'), loc: data.get('event_loc_1') };

  // Example: Saving to Cloudflare D1 Database
  // You must bind a D1 database named 'DB' in your Pages settings
  try {
    await context.env.DB.prepare(
      "INSERT INTO Submissions (email, event_name, event_year, location) VALUES (?, ?, ?, ?)"
    ).bind(email, event1.name, event1.year, event1.loc).run();

    return new Response("Success! Your story is rooted.", { status: 200 });
  } catch (err) {
    return new Response("Error saving to database: " + err.message, { status: 500 });
  }
}
