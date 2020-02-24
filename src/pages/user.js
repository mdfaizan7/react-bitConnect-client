import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Mui stuff
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Redux stuff
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;

    const screamId = this.props.match.params.screamId;
    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }

    this.props.getUserData(handle);

    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const renderUserScreams = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : (
      screams.map(scream => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else
          return (
            <Scream key={scream.screamId} scream={scream} openDialog={true} />
          );
      })
    );

    return (
      <Fragment>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item sm={8}>
              <div>{renderUserScreams}</div>
            </Grid>
            <Grid item sm={4}>
              {this.state.profile === null ? (
                <ProfileSkeleton />
              ) : (
                <StaticProfile profile={this.state.profile} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
