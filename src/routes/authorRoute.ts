
import { Router } from "express";
import { createAuthorController } from "@/controller/author-controller";

const AuthorRouter = Router();

// POST /api/author
AuthorRouter.post("/create-authors", createAuthorController);
// // PUT /api/author/:id
// AuthorRouter.put("/updated-authors/:id", updateAuthorController);
// // GET /api/author/:id
// AuthorRouter.get("/authorss/:id", getAuthorController);
// // DELETE /api/author/:id
// AuthorRouter.delete("/deleted-authors/:id", deleteAuthorController);
// // GET /api/authors
// AuthorRouter.get("/authors", getAllAuthorsController);

export default AuthorRouter;
