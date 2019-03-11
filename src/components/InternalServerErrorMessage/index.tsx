// react libraries
import * as React from 'react';

// scss styles
import './InternalServerError.scss';

class InternalServerErrorMessage extends React.PureComponent {
  render () {
    return (
      <div className="internal-server-error-message-body">
         <div className="internal-server-error-message-inner">
           <h1 className="header">
             <span className="big-header">500</span> Server Error
           </h1>
           <p className="spacing">Sorry, it's not you. It's us.</p>
           <p className="after-space">
           We are experiencing an internal server problem.
           </p>
           <p>Please try again later or contact support <span className="mail">activo@andela.com</span></p>
         </div>
      </div>
    );
  }
}

export default InternalServerErrorMessage;
