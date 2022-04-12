export default async function updateData(
  url: string,
  method: string,
  body: {}
) {
  try {
    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}
