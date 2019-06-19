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

// interfaces
import { TripCardProps } from 'components/TripCard/interfaces';

const img = 'https://res.cloudinary.com/mashafrancis/image/upload/v1560362903/kari4me/runway_1080.png';

const TripCard: React.SFC<TripCardProps> = props => (
  <Cell
    desktopColumns={3}
    tabletColumns={4}
    phoneColumns={2}
  >
    <div onClick={() => { props.redirect(props.trip.id); }}>
    <Card outlined>
      <CardPrimaryContent>
        <CardMedia contentClassName="card-media" wide imageUrl={img}>
          <div className="card-header">
            <h4 className="card-header__main">{`${props.trip.origin} to ${props.trip.destination}`}</h4>
            <h5 className="card-header__sub">
              {`${moment(props.trip.departure_date).format('LL')} - ${moment(props.trip.arrival_date).format('LL')}`}
            </h5>
          </div>
        </CardMedia>
      </CardPrimaryContent>

      <CardActions>
        <CardActionButtons>
          <Button
            classes="mdc-button button-title"
            type="button"
            name="Request"
          />
        </CardActionButtons>
        <CardActionIcons>
          <Button
            onClick={() => { props.redirect(props.trip.id); }}
            type="button"
            name="arrow_forward"
            classes="mdc-icon-button material-icons"
            aria_label="Go forward"
          />
        </CardActionIcons>
      </CardActions>
    </Card>
    </div>
  </Cell>
);

export default TripCard;
