import {
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  Container,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { red } from "@mui/material/colors";
import Comment from "../../components/comment/Comment";

const PostDetail = () => {
  let postId = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    let ignore = false;
    setPost(null);
    fetch(`${postId.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setPost(data);
      });

    return () => {
      ignore = true;
    };
  }, [postId.id]);

  useEffect(() => {
    let ignore = false;
    fetch(`http://localhost:3000/comments/${postId.id}/${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setComments(data);
      });
    return () => {
      ignore = true;
    };
  }, [page]);

  const handleShowMoreComments = () => {
    if (page >= comments.pageCount) return;
    setPage((page) => page + 1);
  };

  const handleShowLessComments= ()=>{
    setPage((page) => page = 1);
  }

  return (
    <Box sx={{ padding: "0 4vw" }}>
      <Container maxWidth="lg">
        {!(post && comments) ? (
          <p>
            <i>Loading...</i>
          </p>
        ) : (
          <Card variant="outlined" sx={{ padding: "1.5rem" }}>
            {/* Heading */}
            <header style={{ padding: "0 0 3vw" }}>
              <Typography
                variant="h1"
                component="h1"
                sx={{ fontSize: "4rem", fontWeight: "700" }}
              >
                {post?.title}
              </Typography>
            </header>
            <CardMedia
              sx={{ height: "682" }}
              image="https://via.placeholder.com/600/2a64a7"
              title="green iguana"
            />
            {/* Body */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Avatar
                sx={{ bgcolor: red[500], width: 60, height: 60 }}
                aria-label="recipe"
              >
                {post?.user.name[0]}
              </Avatar>
              <Typography
                sx={{ marginLeft: "20px", fontSize: "2rem", fontWeight: "600" }}
              >
                {post?.user.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "1.25em",
                lineHeight: "1.5em",
                margin: "0 0 1.5em",
              }}
            >
              {post?.body}
            </Typography>

            {/* Comments */}
            <Card sx={{ padding: "1.5rem" }}>
              {comments.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  display={
                    comments.page === comments.pageCount ? "none" : "block"
                  }
                  variant="outlined"
                  onClick={comments.page === comments.pageCount ? handleShowLessComments : handleShowMoreComments}
                >
                  {
                    comments.page === comments.pageCount ? "Show less":"Show more"
                  }
                </Button>
              </Box>
            </Card>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default PostDetail;
