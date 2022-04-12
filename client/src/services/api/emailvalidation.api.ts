export default async function emailValidationApi(val?: string) {
  try {
    let request = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: val,
    });
    let response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
}
