function notFound(req, res) {
  res.status(404).send('<h1>Route does not exist! go back <a href="/">here</a></h1>');
}

export default notFound;
