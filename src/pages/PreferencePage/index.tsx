import DashboardPage from 'pages/DashboardPage';
import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';

const PreferenceComponent = () => {
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
              <div className="title-cover title-cover-page">Preference</div>
            </div>
          </div>
        </Cell>
      </Row>
    </Grid>
  );
};

const PreferencePage = () => (
  <React.Fragment>
    <DashboardPage component={PreferenceComponent()}/>
  </React.Fragment>
);

export default PreferencePage;
