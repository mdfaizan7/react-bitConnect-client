import React, { Component } from "react";
import PropTypes from "prop-types";

// Mui stuff
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";

// util
import ScreamSkeleton from "../util/ScreamSkeleton";

// Redux stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;

    let renderScreams = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );

    return (
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item sm={8}>
            <div>{renderScreams}</div>
          </Grid>
          <Grid item sm={4}>
            <Profile />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getScreams })(home);
