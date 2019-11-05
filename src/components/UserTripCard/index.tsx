import * as React from 'react';

// components
import Button from 'components/Button';

// third-party libraries
import Card, {
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardMedia,
  CardPrimaryContent
} from '@material/react-card';
import Fab from '@material/react-fab';
import {
  Cell,
} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

// interfaces
import { Typography } from '@material-ui/core';
import { UserTripCardProps } from 'components/UserTripCard/interfaces';

// styles
import './UserTripCard.scss';

const UserTripCard: React.SFC<UserTripCardProps> = (props) => {
  const { trip, match, onDelete } = props;
  return (
  <div className="user-trip-card">
  <Cell
    desktopColumns={3}
    tabletColumns={4}
    phoneColumns={4}
  >
    <Card outlined>
      <CardPrimaryContent>
          <div className="card-header">
            <Typography variant="h4" noWrap={true} className="card-header__head">
              {`${trip.origin} to ${trip.destination}`}
            </Typography>
            <h5 className="card-header__subhead">
              {`${moment(trip.departure_date).format('LL')} - ${moment(trip.arrival_date).format('LL')}`}
            </h5>
          </div>
      </CardPrimaryContent>
      <CardActions>
        <CardActionButtons>
          <Link to={`${match.url}/edit/${trip.id}`}>
            <Button
              classes="mdc-button button-title"
              type="button"
              name="Edit"
            />
          </Link>
        </CardActionButtons>
        <CardActionButtons>
          <Button
            onClick={onDelete}
            classes="mdc-button button-title"
            type="button"
            name="Delete"
          />
        </CardActionButtons>
        <CardActionIcons>
          <Button
            onClick={() => { props.redirect(trip.id); }}
            type="button"
            name="share"
            classes="mdc-icon-button material-icons"
            aria_label="Share"
          />
        </CardActionIcons>
      </CardActions>
    </Card>
  </Cell>
  </div>
  );
};

export default UserTripCard;
