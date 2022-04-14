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
    if (res.status === 200) {
      return data;
    } else return [];
  } catch (err) {
    return err;
  }
}
