import * as React from 'react';

// third-party libraries
import Fab from '@material/react-fab';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';

// pages
import DashboardPage from 'pages/DashboardPage';
import { NavLink } from 'react-router-dom';

import { TripsPageProps, TripsPageState } from './interfaces';

export class TripsPage extends React.Component<TripsPageProps, TripsPageState> {
  renderHeaderContent = () => {
    return (
      <div className="cover">
        <div className="head-title">
          <div className="title-cover title-cover-page">
            <h3>Recent Trips</h3>
          </div>
        </div>
      </div>
    );
  }

  renderBodyContent = () => {
    return (
      <div className="blank-content">
        <h4>You don't have any trip scheduled</h4>
          <h5>Tap + to create one</h5>
        <NavLink to={'/dashboard/trips/new-trip'}>
          <Fab className="create-trip-button" icon={<MaterialIcon icon="add" initRipple={null}/>}
          />
        </NavLink>
      </div>
    );
  }

  renderTripsComponent = () => {
    return (
      <Grid>
        <Row>
          <Cell
            columns={12}
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}
          >
            {this.renderHeaderContent()}
            {this.renderBodyContent()}
          </Cell>
        </Row>
      </Grid>
    );
  }

  render() {
    return (
     <React.Fragment>
      <DashboardPage component={this.renderTripsComponent()}/>
    </React.Fragment>
    );
  }
}

export default TripsPage;
