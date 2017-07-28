import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
//UI
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//img
import reptileImage from './test.jpg';

const styleSheet = createStyleSheet('SelfCard', {
  card: {
    maxWidth: 345,
  },
});

function SelfCard(props) {
  const classes = props.classes;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia>
          <img src={reptileImage} alt="Contemplative Reptile" />
        </CardMedia>
        <CardActions>
          <Button dense color="primary">
            项目一
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SelfCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SelfCard);