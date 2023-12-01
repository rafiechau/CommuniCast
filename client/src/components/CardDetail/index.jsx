import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, TextField, Box } from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addCommentRequest, editCommentRequest, deleteCommentRequest } from '@pages/Detail/actions';
import config from '@config/index';
import { Avatar } from 'stream-chat-react';
import { FormattedMessage } from 'react-intl';
import { selectUser } from '@containers/Client/selectors';

const CommentCard = ({ commenter, text, userLogin, id, idComment, refetchComments, userImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    comment: text,
  });
  const dispatch = useDispatch();
  const handleToggleEdit = () => {
    if (id == userLogin.id) {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(editCommentRequest({ formData, idComment }));
    setIsEditing(false);
    refetchComments();
  };

  const handleDelete = () => {
    dispatch(deleteCommentRequest(idComment));
    setIsEditing(false);
    refetchComments();
  };

  return (
    <Card sx={{ marginBottom: '10px' }}>
      <CardContent sx={{ backgroundColor: 'var(--color-bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 48, height: 48, borderRadius: '50%' }}
              image={userImage}
              alt={user?.fullName}
            />
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '15px',
                color: 'var(--color-text)',
              }}
              variant="body2"
            >
              @{user?.fullName}
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
              sx={{
                color: 'var(--color-text)',
              }}
              value={formData.comment}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </>
        ) : (
          <Typography sx={{ marginTop: '15px', color: 'var(--color-text)' }} variant="body2">
            {text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const CardDetail = ({ post, comment, postId, refetchComments }) => {
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
    if (formData.comment.trim() === '') {
      return; // Jangan lakukan apa-apa jika komentar kosong
    }
    dispatch(addCommentRequest({ formData, postId }));
    setFormData({ comment: '' });
  };

  const imageUrl =
    post && post?.image
      ? `${config.api.server}${post?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

  const userImageUrl = post?.user?.imagePath
    ? `${config.api.server}${post?.user?.imagePath.replace('\\', '/')}`
    : 'https://source.unsplash.com/random';

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 48, height: 48, borderRadius: '50%' }}
          image={userImageUrl}
          alt={post?.user?.fullName}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="h6" component="div">
            {post?.user?.fullName}
          </Typography>
        </Box>
      </Box>
      {post?.image && <CardMedia sx={{ height: 500 }} loading="lazy" image={imageUrl} title={post?.title || 'Image'} />}

      <CardContent>
        <Typography sx={{ fontWeight: '700' }} gutterBottom variant="h5" component="div">
          {post?.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: post?.des }} />
        <Typography gutterBottom variant="h6" component="div" sx={{ marginTop: '3px' }}>
          <FormattedMessage id="app_comment" />
          <Button onClick={handleToggleComments}>{showComments ? 'Hide Comments' : 'Show Comments'}</Button>
        </Typography>
        {showComments && (
          // eslint-disable-next-line react/jsx-no-useless-fragment
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
                userImage={userImageUrl}
              />
            ))}
          </>
        )}
        <TextField
          sx={{ marginBottom: '10px' }}
          label="Add a comment"
          variant="outlined"
          fullWidth
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleAddComment}>
          <FormattedMessage id="app_add_comment" />
        </Button>
      </CardContent>
    </Card>
  );
};

CardDetail.propTypes = {
  post: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  refetchComments: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(CardDetail);
