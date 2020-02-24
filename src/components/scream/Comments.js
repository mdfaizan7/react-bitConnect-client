import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import MuiTheme from "../../util/Theme";
import { Link } from "react-router-dom";

// Mui stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  ...MuiTheme,
  visibleSeparator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "rgb(0,0,0,0.1)",
    marginBottom: 20
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Fragment>
        <Grid container>
          {comments.map((comment, index) => {
            const { body, createdAt, imageURL, userHandle } = comment;
            return (
              <Fragment key={createdAt}>
                <Grid item sm={12}>
                  <Grid container>
                    <Grid item sm={2}>
                      <img
                        src={imageURL}
                        alt="Profile"
                        className={classes.commentImage}
                      />
                    </Grid>
                    <Grid item sm={9}>
                      <div className={classes.commentData}>
                        <Typography
                          variant="h5"
                          component={Link}
                          to={`/users/${userHandle}`}
                          color="primary"
                        >
                          @{userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {dayjs(createdAt).fromNow()}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{body}</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {index === comments.length - 1 ? (
                  <hr className={classes.invisibleSeparator} />
                ) : (
                  <hr className={classes.visibleSeparator} />
                )}
              </Fragment>
            );
          })}
        </Grid>
      </Fragment>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
