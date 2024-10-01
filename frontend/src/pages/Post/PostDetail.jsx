import { Box, Typography,Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { red } from "@mui/material/colors";

const PostDetail = () => {
    let postId = useParams();

    const [post, setPost] = useState(null);

    useEffect(()=>{
        fetch(`${postId.id}`).then(res=>res.json()).then(data=>setPost(data))
    },[])
    return(
        <div>
            <Box>
                <Typography>{post?.title}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post?.user.name[0]}
            </Avatar>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginLeft: "20px" }}
            >
              {post?.user.name}
            </Typography>
          </Box>
            <Typography>{post?.body}</Typography>
            <Box>
                
            </Box>
        </div>);
}

export default PostDetail