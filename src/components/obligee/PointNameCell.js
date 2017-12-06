import React from 'react'
// import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// import Dialog, {
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
// } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
// import Input from 'material-ui/Input';
// import List, { ListItem, ListItemText } from 'material-ui/List'
// import Tabs, { Tab } from 'material-ui/Tabs';
// import TextField from 'material-ui/TextField';


// Map Redux state to component props
const mapStateToProps = (state, ownProps) => {

    // var ttt = state.ObContentReducer[ownProps.tableIndex][ownProps.type][ownProps.row];
    return {

        value: state.ObContentReducer[ownProps.tableIndex][ownProps.type][ownProps.row]
    }
}

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => {
    return {
        //修改命令 修改的字段名 修改字段的值
        onclick: (id) => {
            dispatch({
                type: "jzxTableClick",
                payload: {
                    command: id
                }
            });

            dispatch({
                type: "close",
                payload: {
                  choice: 2,
                  tab: this.tabIndex
                }
              });
        }
    }
}


class PointNameCellUI extends React.PureComponent {


    onClicked = () => {
        var sss = this.props.id;
        this.props.onclick(sss);
    };




    render() {
        // const { 
        //     name, 
        //     type, 
        //     row, 
        //     tableIndex,
        //     id
        // } = this.props;



        return ( <Button onClick = { this.onClicked } > { this.props.name }

            </Button>
        )
    }
}

PointNameCellUI.propTypes = {}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PointNameCellUI)