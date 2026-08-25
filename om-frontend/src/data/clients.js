import { trustedBy } from "./trustedBy";

// Default "Our clients" list — pairs a name with a logo image. Replace `logo`
// with each client's real Cloudinary logo URL and `name` with their real name
// whenever ready; this is just a working placeholder set so the row isn't
// empty.
const NAMES = [
  "Northwind",
  "Lumen Labs",
  "Vertex",
  "Anchorline",
  "Kestrel",
  "Solace",
  "Meridian",
  "Haloworks",
];

export const clients = NAMES.map((name, i) => ({
  name,
  logo: trustedBy[i % trustedBy.length]?.url,
}));
