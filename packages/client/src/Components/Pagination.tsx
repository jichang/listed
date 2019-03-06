import React from "react";
import "./Pagination.css";

export interface PageChangeEvent {
  page: number;
}

export interface Props {
  total: number;
  pageSize: number;
  onChange: (evt: PageChangeEvent) => void;
}

export interface State {
  page: number;
}

export class Pagination extends React.Component<Props, State> {
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
          Prev
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
          Next
        </button>
      </div>
    );
  }
}
