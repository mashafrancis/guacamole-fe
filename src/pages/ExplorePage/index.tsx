import TripCard from 'components/TripCard';
import * as React from 'react';

// third-party libraries
import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardMedia,
  CardPrimaryContent
} from '@material/react-card';
import {
  Cell,
  Grid,
  Row
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';
import * as moment from 'moment';
import { connect } from 'react-redux';

// components
import Button from 'components/Button';
import Loader from 'components/Loader';

// thunks
import { displaySnackMessage } from 'modules/snack';
import { getAllTrips } from 'modules/trips';

// pages
import DashboardPage from 'pages/DashboardPage';

// interfaces
import { ExplorePageProps, ExplorePageState } from './interfaces';

export class ExplorePage extends React.Component<ExplorePageProps, ExplorePageState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.getAllTrips()
      .then(() => this.setState({ isLoading: false }));
  }

  renderSearchField = () => (
    <div className="form-cell">
      <TextField
        className="mdc-text-field--fullwidth search"
        outlined
        label="Search for trips"
        leadingIcon={<MaterialIcon role="button" icon="search" initRipple={null}/>}
      >
        <Input
          className=""
          value=""
          name="search"
          id="10"
          type="text"
        />
      </TextField>
    </div>
  )

  /**
   * @description This method renders the card contents
   *
   * @returns {JSX}
   */
  renderExploreContent = (trips) => {
    return (
      <Grid>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
            <div className="cover cover-image">
              <div className="head-title">
                <div className="title-cover title-cover-page">Explore</div>
              </div>
            </div>
          </Cell>
        </Row>
        <Row>
          <Cell
            className="mdc-layout-grid__cell grid-start-5 mdc-layout-grid__cell--align-middle"
            align="middle"
            order={5}
            columns={4}
            desktopColumns={4}
            tabletColumns={4}
            phoneColumns={4}
          >
            {this.renderSearchField()}
          </Cell>
        </Row>
        <Row>
          {
            trips.map((trip) => {
              return (
                <TripCard
                  key={trip.id}
                  trip={trip}
                />
              );
            })
          }
        </Row>
      </Grid>
    );
  }

  render() {
    const { isLoading } = this.state;
    const { trips } = this.props;

    return (
      isLoading
      ? <Loader />
      : <React.Fragment>
        <DashboardPage component={this.renderExploreContent(trips)} />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  trips: state.trips.data,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  getAllTrips: () => dispatch(getAllTrips()),
  displaySnackMessage: message => dispatch(displaySnackMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
