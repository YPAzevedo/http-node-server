let users = [];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>User App</title></head>");
    res.write("<body><h1>Hello User</h1></body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>User App</title></head>");
    res.write("<body><ul>");
    users.map((u) => res.write(`<li>${u}</li>`));
    res.write(`</ul><a href="/create-user">create user</a></body>`);
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>User App</title></head>");
    res.write("<body><h1>Create a User</h1></body>");
    res.write(
      `<body><form action="/create-user" method="POST"><input type="text" name="user" placeholder="User here" /><button type="submit">submit</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1].split("+").join(" ");
      users.push(user);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Page not found</title></head>");
  res.write(`<body><h1>404 PAGE NOT FOUND FOR PATH: ${req.url}</h1></body>`);
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
