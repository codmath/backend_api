import  express  from "express"
import { addBlogs, getallBlogs, updateBlogs, getbyId , getdelete} from "../controllers/blog-control";
const blogRouter=express.Router();
blogRouter.get("/", getallBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlogs);
blogRouter.get("/:id", getbyId);
blogRouter.delete("/:id", getdelete);
blogRouter.get("/user/:id", getBlogbByuserId);
export default blogRouter;