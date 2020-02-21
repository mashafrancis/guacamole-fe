import * as React from 'react';

// components
import DashboardPage from '@pages/DashboardContainer';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';

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

const PreferencePage = () => PreferenceComponent();

export default PreferencePage;
