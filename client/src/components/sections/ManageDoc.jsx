import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocList from './DocList.jsx';
import { doclist, deleteDoc, searchDoc } from '../../actions/docAction';
import { activeUser } from '../../actions/userAction';
import SearchBox from './SearchBox.jsx';
import Paginate from './Paginate.jsx';


class ManageDoc extends React.Component {
  /**
   * Creates an instance of ManageDoc.
   * @param {any} props
   * @param {any} context
   *
   * @memberof ManageDoc
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: props.documents,
      error: '',
      authUser: Object.assign({}, props.authUser),
      limit: 10,
      searching: false

    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  /**
   *
   *
   *
   * @memberof ManageDoc
   */
  componentDidMount() {
    this.props.actions.activeUser().then(() => {
      this.props.actions.doclist();
    });
  }
  /**
   *
   *
   * @param {any} nextProps
   *
   * @memberof ManageDoc
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ documents: nextProps.documents });
  }
  /**
   * 
   * 
   * 
   * @memberof ManageUser
   */
  componentWilUnmount() {
    this.setState({});
  }
  /**
   *
   *
   * @param {any} docId
   *
   * @memberof ManageDoc
   */
  
  handleClick(docId) {
    this.props.actions.deleteDoc(docId);
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof ManageDoc
   */
  handlePageChange(event) {
    this.props.actions.doclist(
      this.state.limit, event.target.value * this.state.limit
    );
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof ManageDoc
   */
  inputChange(event) {
    const documents = [...this.props.documents];
    this.setState(
      {
        limit: event.target.value,
        documents: documents.splice(0, event.target.value)
      }
    );
  }
  /**
   *
   *
   * @param {any} event
   *
   * @memberof ManageDoc
   */
  handleSearch(event) {
    this.props.actions.searchDoc(event.target.value);
    this.setState({ searching: event.target.value.length > 0 });
  }
  /**
   *
   *
   * @returns
   *
   * @memberof ManageDoc
   */

  render() {
    const { authUser } = this.props;
    const documents = this.state.searching ?
      this.props.search : this.state.documents;

    return (
      <div>
        {this.props.documents.length > 1
          ? <div>
            <div className="row">
              <div className="col s12">
                <SearchBox onChange={this.handleSearch} />
              </div>
            </div>
            <DocList documents={documents}
              authUser={authUser}
              onClick={this.handleClick} />
            {!this.state.searching ? <div className="col s12">
              <Paginate
                pageCount={this.props.metadata.pageCount}
                handleChange={this.handlePageChange}
                currentPage={this.props.metadata.page}
              />
            </div> : ''}
          </div>
          : <img src="default.gif" />
        }

      </div>
    );
  }
}

ManageDoc.propTypes = {
  documents: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired
};
ManageDoc.defaultProps = {
  documents: [],
  users: [],
  authUser: {}
};
/**
 *
 *
 * @param {any} state
 * @returns
 */
function mapStateToProps(state) {
  return {
    search: state.search.search,
    documents: state.documents.documents,
    users: state.users,
    authUser: state.authUser,
    metadata: state.documents.metadata
  };
}
/**
 *
 *
 * @param {any} dispatch
 * @returns
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      doclist, activeUser, deleteDoc, searchDoc
    }, dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoc);
