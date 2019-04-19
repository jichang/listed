import React from "react";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { SiteLogo } from "./SiteLogo";
import { FormattedMessage } from "react-intl";
import { SessionButton } from "./SessionButton";
import { GoChevronLeft } from "react-icons/go";

@observer
export class AppHeader extends React.Component<RouteComponentProps<{}>> {
  goBack() {
    if (this.props.history.length > 0) {
      this.props.history.goBack();
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="app__header">
        <div className="app__header__content flex__box">
          <div className="flex__item">
            {this.props.location.pathname === "/" ? (
              <h4>
                <SiteLogo />
                <span className="app__header__title">
                  <FormattedMessage
                    id="app_title"
                    defaultMessage="Listed"
                    description="title of application"
                  />
                </span>
              </h4>
            ) : (
              <h4>
                <GoChevronLeft
                  onClick={() => {
                    this.goBack();
                  }}
                  className="app__icon"
                />
              </h4>
            )}
          </div>
          <SessionButton />
        </div>
      </div>
    );
  }
}
