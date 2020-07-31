import React from "react";

class Form extends React.Component {
  constructor () {
    super()

    this.state = {
      title: "",
      author: "",
      pages: 1,
      read: false,
      errors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (event) {
    const target = event.target;
    const {name, value, checked} = target;
    const data = name === "read" ? checked : value;

    const errors = {};
  
    if (target.validity.valid) {
      errors[name] = null;
    } else {
      errors[name] = target.validationMessage;
    }

    this.setState(state => {
      return {
        ...state,
        [name]: data,
        errors: {...state.errors, ...errors}
      };
    });
  }

  handleSubmit (event) {
    event.preventDefault();

    const form = event.target;

    for (let input of form.querySelectorAll("input")) {
      if (!input.validity.valid) {
        this.handleInputChange({target: input});
        return;
      }
    }

    const book = {
      title: this.state.title,
      author: this.state.author,
      pages: this.state.pages,
      read: this.state.read,
    };

    this.props.callback(book);
  }

  handleClose () {
    this.props.callback();
  }

  render () {
    return (
      <div className="form-container">
        <form noValidate onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required autoComplete="off"
                onChange={this.handleInputChange} onBlur={this.handleInputChange} />
          {this.state.errors.title ? <div className="error">{this.state.errors.title}</div> : null}
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" required autoComplete="off"
                onChange={this.handleInputChange} onBlur={this.handleInputChange} />
          {this.state.errors.author ? <div className="error">{this.state.errors.author}</div> : null}
          <label htmlFor="pages">Page count</label>
          <input type="number" name="pages" id="pages" min="1" value={this.state.pages} required autoComplete="off"
                onChange={this.handleInputChange} onBlur={this.handleInputChange} />
          {this.state.errors.pages ? <div className="error">{this.state.errors.pages}</div> : null}
          <input type="checkbox" name="read" id="read" onChange={this.handleInputChange} />
          <label htmlFor="read">Read</label>
          <button type="submit">Add Book</button>
          <button type="button" className="close-btn" onClick={this.handleClose} >Close</button>
        </form>
      </div>
    );
  }
}

export default Form;
