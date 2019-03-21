import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";

export interface IPublishDateProps {
  date: string | Date;
}

export class PublishDate extends React.Component<IPublishDateProps> {
  render() {
    const { date } = this.props;
    return (
      <span className="timestamp">
        <FormattedMessage
          id="published_at"
          defaultMessage="发布于"
          description="title of publsihed time"
        />
        <FormattedDate value={date} />
      </span>
    );
  }
}
