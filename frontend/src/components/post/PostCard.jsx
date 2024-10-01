// import { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme }) => ({
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
//   variants: [
//     {
//       props: ({ expand }) => !expand,
//       style: {
//         transform: "rotate(0deg)",
//       },
//     },
//     {
//       props: ({ expand }) => !!expand,
//       style: {
//         transform: "rotate(180deg)",
//       },
//     },
//   ],
// }));

export default function PostCard({ postInfo }) {
  // const [expanded, setExpanded] = useState(false);
  // const [comments, setComments] = useState([]);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  // useEffect(() => {
  //   fetch(`/comments/${postInfo?.id}`)
  //     .then((res) => res.json())
  //     .then((data) =>{ setComments(data); console.log(data)});
  // }, []);

  const navigate = useNavigate();

  return (
    <Card sx={{ margin: "0 20px 50px", display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://via.placeholder.com/600/2a64a7"
        alt="Live from space album cover"
      />
      <Box>
        {/* <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {postInfo.user.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={postInfo?.title}
          // subheader="September 14, 2016"
        /> */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h2"
            component="h2"
            onClick={() => navigate(`/post/${postInfo.id}`)}
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            {postInfo?.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", margin: "1.5em 0 .5em" }}
          >
            {postInfo?.body}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {postInfo.user.name[0]}
            </Avatar>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginLeft: "20px" }}
            >
              {postInfo.user.name}
            </Typography>
          </Box>
        </CardContent>
        {/* <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        </CardActions> */}
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map((comment) => (
            <div key={comment?.id}>
              <Typography sx={{ marginBottom: 2 }}>{comment?.name}</Typography>
              <Typography sx={{ marginBottom: 2 }}>{comment?.body}</Typography>
            </div>
          ))}
        </CardContent>
      </Collapse> */}
      </Box>
    </Card>
  );
}
