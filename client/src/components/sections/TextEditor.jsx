import React from 'react';
import TinyMCE from 'react-tinymce';
import { browserHistory } from 'react-router';

class TextEditor extends React.Component {
  /**
   * Creates an instance of TextEditor.
   * @param {any} props
   * @param {any} context
   *
   * @memberof TextEditor
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      content: this.props.content ? this.props.content : '',
      access: this.props.access ? this.props.access : '',
      title: this.props.title ? this.props.title : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  /**
   *
   *
   * @param {any} e
   *
   * @memberof TextEditor
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
  /**
   *
   *
   *
   * @memberof TextEditor
   */
  handleSubmit() {
    this.props.onClick(this.state);
  }
  /**
   *
   *
   * @param {any} e
   *
   * @memberof TextEditor
   */
  handleChange(e) {
    const val = e.target.value;
    this.setState({ access: e.target.value });
  }
  /**
   *
   *
   * @param {any} e
   *
   * @memberof TextEditor
   */
  handleInput(e) {
    this.setState({ title: e.target.value });
  }
  /**
   *
   *
   * @returns
   *
   * @memberof TextEditor
   */

  render() {
    const { access } = this.state;
    return (
      <div>
        <div className="row">
          <form className="col s8">
            <div className="row">
              <div className="input-field col s8">
                <input id="textarea1"
                className="materialize-textarea"
                name="title"
                value= {this.state.title}
                onChange = {this.handleInput} />
                <label className="active" htmlFor="textarea1">Title</label>
              </div>
                <p>
                  <div>
                    <input
                      checked={access === 'Public'}
                      name="access"
                      id="Public"
                      type="radio"
                      onChange={this.handleChange}
                      value="Public"/>
                    <label htmlFor="Public">Public</label>
                    <input
                      checked={access === 'Private'}
                      name="access"
                      type="radio"
                      id="Private"
                      onChange={this.handleChange}
                      value="Private"/>
                    <label htmlFor="Private">Private</label>
                  </div>
                </p>
            </div>
          </form>
        </div>
        <TinyMCE
          content={this.state.content}
          config={{
            plugins: 'link image code',
            toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={this.handleEditorChange}
        />
        <button className="btn"
        type="submit"
        name="action"
        onClick={this.handleSubmit}>Submit
        </button>
        <button className="btn"
        id="newDocumentBtn"
        type="submit"
        name="action"
        onClick={() => browserHistory.goBack()}> Cancel </button>
      </div>
    );
  }
}

export default TextEditor;
