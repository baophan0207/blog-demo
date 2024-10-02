import { Box, Avatar, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const Comment = ({comment}) => {

    return(
        <Box sx={{ marginBottom:"20px" }} >
            <Box sx={{ display: "flex", alignItems: "center", marginBottom:"20px" }}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {comment?.email[0]}
            </Avatar>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", marginLeft: "20px" }}
            >
              {comment?.email}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment?.body}
          </Typography>
        </Box>
    );
}

export default Comment;