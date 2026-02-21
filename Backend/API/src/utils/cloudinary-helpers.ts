// this function gets the public_id from cloudinary uploaded image url
export function getPublicIdFromUrl(url:string) {
  const parts = url.split("/");
  const filename = parts.pop(); // "abc123.jpg"
  return `projects/${filename?.split(".")[0]}`; // "projects/abc123"
}