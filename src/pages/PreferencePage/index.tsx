import * as React from 'react';

// third-party libraries
import { Cell, Grid, Row } from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import TextField, { Input } from '@material/react-text-field';

const PreferencePage = () => {
  const renderSearchField = () => (
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
  );

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
          {renderSearchField()}
        </Cell>
      </Row>
    </Grid>
  );
};

export default PreferencePage;
