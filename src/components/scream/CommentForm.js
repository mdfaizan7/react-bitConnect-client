import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Mui stuff
import MuiTheme from "../../util/Theme";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Mui icons
import PublishIcon from "@material-ui/icons/Publish";

// Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = {
  ...MuiTheme,
  visibleSeparator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "rgb(0,0,0,0.1)",
    marginBottom: 20
  }
};

class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.submitComment(this.props.screamId, {
      body: this.state.body
    });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const renderCommentForm = authenticated ? (
      <Fragment>
        <Grid item sm={12} style={{ textAlign: "center" }}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item sm={10}>
              {" "}
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="body"
                  type="text"
                  label="Post a Comment..."
                  error={errors.comment ? true : false}
                  helperText={errors.comment}
                  value={this.state.body}
                  onChange={this.handleChange}
                  fullWidth
                  multiline
                  className={classes.textField}
                />
              </form>
            </Grid>
            <Grid item sm={2}>
              <Button
                type="submit"
                onClick={this.handleSubmit}
                color="primary"
                className={classes.button}
                startIcon={<PublishIcon fontSize="large" />}
                size="large"
              >
                Post
              </Button>
            </Grid>
          </Grid>
          <hr className={classes.visibleSeparator} />
        </Grid>
      </Fragment>
    ) : null;

    return renderCommentForm;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
