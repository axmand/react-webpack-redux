import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';

import Dialog, { DialogTitle } from 'material-ui/Dialog';
import FontAwesome from 'react-fontawesome'
// import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Provider, connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import PeopleIcon from 'material-ui-icons/People'
const styles = {
  avatar: {
    background: blue[100],
    color: blue[600],
  },
 paper: {
    width: '100%',
    
    overflowX: 'auto',
  },
   listitem: {
    flexDirection: 'column',
    justifyContent: 'center ',
  },
  listItemText: {
    padding: '0px',
    lineHeight: '32px',
    padding: '2px',
    color: '#ffffff',
  },
}

class ChooseTableDialog extends Component {


  render() {
    
    const{open,close,search, choose1,choose2,choose3,choose4,choose5,choose6,projectName,classes,clickIcon}=this.props;
    return (
      <div>
      <ListItem button className={classes.listitem} disableGutters={true} onClick={clickIcon}>
          <ListItemIcon>
            <FontAwesome
              name='group'
              size='2x'
              style={{
                width: '34.28px',
                height: '32px',
                margin: '0px',
                padding: '2px',
                color: '#C1C6C9',
              }}
            />
          </ListItemIcon>
          <ListItemText 
            primary="权利人"
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>
        <Dialog
           
            open={open}
            onRequestClose={close}
          
          >
             <Paper className={classes.paper}>
<Table>
        <TableHead>
          <TableRow>
            <TableCell><p>表格类型</p></TableCell>
            <TableCell><p>所属项目</p></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
         
                <TableRow >
            <TableCell ><Button onClick={choose1} key="权籍调查表">权籍调查表</Button></TableCell>
            <TableCell><Button onClick={choose1} key="权籍调查表">{projectName}</Button></TableCell>
            
          </TableRow>

               <TableRow >
            <TableCell ><Button onClick={choose2} key={"界址标示表"}>界址标示表</Button></TableCell>
            <TableCell><Button onClick={choose2} key={"界址标示表"}>{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose3} >界址签章表</Button></TableCell>
            <TableCell><Button onClick={choose3} >{projectName}</Button></TableCell>
            
          </TableRow>
            <TableRow >
            <TableCell ><Button onClick={choose4} >界址说明表</Button></TableCell>
            <TableCell><Button onClick={choose4} >{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose5} key={"调查审核表"}>调查审核表</Button></TableCell>
            <TableCell><Button onClick={choose5} key={"调查审核表"}>{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={choose6} key={"共有宗地面积分摊表"}>共有宗地面积分摊表</Button></TableCell>
            <TableCell><Button onClick={choose6} key={"共有宗地面积分摊表"}>{projectName}</Button></TableCell>
            
          </TableRow>
           
        </TableBody>
      </Table>
      
</Paper>
<Button onClick={search } height="150px"  width="100%">属性查询</Button>
       </Dialog>
      </div>
    );
  }
}

ChooseTableDialog.propTypes = {
  // classes: PropTypes.object.isRequired,
  // onRequestClose: PropTypes.func,
  // selectedValue: PropTypes.string,
};




const mapStateToProps = (state) => {

    

    return {
        open:state.open
    }
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    search:()=>dispatch(
      {
        type: 'search'
      }
    ),
    choose1: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 1
                }
            }),
    choose2: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 2
                }
            }),
    choose3: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 3
                }
            }),

    choose4: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 4
                }
            }),

    choose5: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 5
                }
    }),
   choose6: () => dispatch({
                type: 'choose',
                payload: {
                    choice: 6
                }
    }),
  close:()=>dispatch({
    type: 'closeChoose',
                payload: {
                   
    }
  }),
clickIcon:()=>dispatch({
  type: 'clickIcon',

  })
}
}
const ChooseDialog = withStyles(styles,{name:'ChooseTableDialog'})(ChooseTableDialog);
export default connect(mapStateToProps, mapDispatchToProps)(ChooseDialog);