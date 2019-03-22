import React from "react";
import "./Pagination.css";
import { FormattedMessage } from "react-intl";

export interface IPageChangeEvent {
  page: number;
}

export interface IProps {
  total: number;
  pageSize: number;
  onChange: (evt: IPageChangeEvent) => void;
}

export interface IState {
  page: number;
}

export class Pagination extends React.Component<IProps, IState> {
  state = {
    page: 0
  };

  gotoPrev() {
    if (this.state.page > 0) {
      this.setState(
        {
          page: this.state.page - 1
        },
        () => {
          this.props.onChange({
            page: this.state.page
          });
        }
      );
    }
  }

  gotoNext() {
    if ((this.state.page + 1) * this.props.pageSize < this.props.total) {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.props.onChange({
            page: this.state.page
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="pagination flex__box">
        <button
          type="button"
          className="button button--outline"
          onClick={() => this.gotoPrev()}
          disabled={this.state.page <= 0}
        >
          <FormattedMessage
            id="prev_page"
            defaultMessage="上一页"
            description="title of previous page button"
          />
        </button>
        <div className="flex__item" />
        <button
          type="button"
          className="button button--outline"
          onClick={() => this.gotoNext()}
          disabled={
            (this.state.page + 1) * this.props.pageSize >= this.props.total
          }
        >
          <FormattedMessage
            id="next_page"
            defaultMessage="下一页"
            description="title of next page button"
          />
        </button>
      </div>
    );
  }
}
