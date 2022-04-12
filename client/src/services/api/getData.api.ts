export default async function getData(url: string) {
  try {
    const res = await fetch(url, {
      method: "GET",
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
