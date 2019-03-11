// react libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';

// styles
import './ToastMessage.scss';

// interfaces
import { ToastMessageProps, ToastMessageState } from './interfaces';

// helper functions
import capitalize from 'utils/helpers/capitalize';

export class ToastMessage extends React.Component<
  ToastMessageProps,
  ToastMessageState
> {
  constructor(props) {
    super(props);

    this.state = {
      toast: this.props.toast,
    };
  }

  componentDidUpdate({ toast }) {
    if (this.props.toast !== toast) {
      this.setState({ toast: this.props.toast });
    }

    /*
     * This lifecycle is called for updates to both state and props, hence the need to
     * avoid infinite recursion; if toast type is already '',
     * hideToastMessage has already been called.
     */
    if (this.state.toast.type !== '') {
      setTimeout(this.hideToastMessage, 3000);
    }
  }

  private hideToastMessage = () => {
    this.setState({
      toast: {
        type: '',
        message: '',
        withName: false,
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.toast.message
          ? (
              <div className={`toast-message toast-message--${this.state.toast.type}`}>
                <p className={`toast-message__text`}>
                  {
                    this.state.toast.withName
                      ? this.state.toast.message
                      : capitalize(this.state.toast.message)
                  }
                </p>
                <span
                  onClick={this.hideToastMessage}
                  className="toast-message__close"
                >
                  &times;
                </span>
              </div>
            )
          : (<div />)
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  toast: state.toast || { message: '', type: '' },
});

export default connect(mapStateToProps)(ToastMessage);
