import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, TextField } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addCommentRequest, editCommentRequest, deleteCommentRequest } from '@pages/Detail/actions';

const CommentCard = ({ commenter, text, userLogin, id, idComment, refetchComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    comment: text,
  });
  const dispatch = useDispatch();
  const handleToggleEdit = () => {
    if (id == userLogin.id) {
      setIsEditing(!isEditing);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(editCommentRequest({ formData, idComment }))
    setIsEditing(false);
    refetchComments();
  };

  const handleDelete = () => {
    dispatch(deleteCommentRequest(idComment))
    setIsEditing(false);
    refetchComments();
  }
  return (
    <Card sx={{ marginBottom: '10px' }}>
      <CardContent sx={{ backgroundColor: 'grey' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <CardMedia sx={{ height: '40px', width: '40px', borderRadius: '50%' }} image="https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="green iguana" />
            <Typography sx={{ color: '#fff', display: 'flex', alignItems: 'center', marginLeft: '15px' }} variant="body2">
              @{commenter}
            </Typography>
          </div>
          <div style={{ display: 'flex', lineHeight: 0, cursor: 'pointer' }}>
            <p onClick={handleToggleEdit}>...</p>
          </div>
        </div>
        {isEditing ? (
          <>
            <TextField
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <Typography sx={{ color: '#fff', marginTop: '15px' }} variant="body2">
            {text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const CardDetail = ({ comment, postId, refetchComments }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleToggleComments = () => {
    setShowComments(!showComments);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddComment = () => {
    dispatch(addCommentRequest({ formData, postId }));
    setFormData({
      comment: '',
    });
    refetchComments();
  };

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardMedia sx={{ height: "50vh" }} image="https://images.unsplash.com/photo-1682695798522-6e208131916d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="green iguana" />
      <CardContent>
        <Typography sx={{ fontWeight: '700' }} gutterBottom variant="h5" component="div">
          Tittle
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: '3px' }}>
          Comment
          <Button onClick={handleToggleComments}>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </Button>
        </Typography>
        {showComments && (
          <>
            {comment?.dataComment?.map((el, index) => (
              <CommentCard
                key={index}
                commenter={el.User.fullName}
                text={el.comment}
                id={el.User.id}
                userLogin={comment?.user}
                idComment={el.id}
                refetchComments={refetchComments}
              />
            ))}
          </>
        )}
        <TextField
          sx={{ marginBottom: "10px" }}
          label="Add a comment"
          variant="outlined"
          fullWidth
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleAddComment} >
          Add Comment
        </Button>
      </CardContent>
    </Card>
  );
};

CardDetail.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(CardDetail);
