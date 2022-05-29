export default function notFound(error, req, res, next) {
  res.status(404).send("Route does not exist");
}
