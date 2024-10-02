import { useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard";
import { Box, Typography, Pagination, Stack, Container } from "@mui/material";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let ignore = false;
    setPosts([]);
    fetch(`/posts/${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setPosts(data.posts);
      });
    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <Box
      sx={{
        margin: "auto",
        // maxWidth: 875,
        marginTop: "32px",
        marginBottom: "32px",
      }}
    >
      <Container maxWidth="lg">
        {!posts ? (
          <p>
            <i>Loading...</i>
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.id} postInfo={post} />)
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Typography sx={{ textAlign: "center" }}>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
