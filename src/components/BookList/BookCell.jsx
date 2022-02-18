import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTE from "../../constant/route";

function Book(props) {
  const navigate = useNavigate();
  const { src, title, createdAt } = {
    src: props.src,
    title:
      props.title.length > 30 ? props.title.slice(0, 30) + "..." : props.title,
    createdAt: props.created,
  };
  const handleReadBook = () => {
    navigate(ROUTE.READBOOK + `/${props.bookid}`);
  };

  return (
    <Card sx={{ minWidth: 230, maxWidth: 300, margin: "auto", my: 2.5 }}>
      <CardActionArea onClick={handleReadBook}>
        <CardMedia
          component="img"
          alt={title}
          src={src}
          style={{ width: 300, height: 300 }}
        />
        <CardContent style={{ margin: -3 }}>
          <Typography variant="body2" color="text.secondary" component="p">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {` ${createdAt}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Book;
