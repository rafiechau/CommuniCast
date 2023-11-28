import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const CardItem = () => {
  const dispatch = useDispatch();
  return (
    <Card sx={{ width: '100%', marginTop: 3 }}>
      <CardMedia sx={{ height: 140 }} image="https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(CardItem);
