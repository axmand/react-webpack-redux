import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet(() => ({
  avatar: {
    background: blue[100],
    color: blue[600],
  },
 paper: {
    width: '100%',
    
    overflowX: 'auto',
  },
}));

class SimpleDialog extends Component {
  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value);
  };

  render() {
    const { projectName,classes, onRequestClose, selectedValue, ...other } = this.props;

    return (
      
        <div>
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
            <TableCell ><Button onClick={() => this.handleListItemClick("权籍调查表")} key={"权籍调查表"}>权籍调查表</Button></TableCell>
            <TableCell><Button onClick={() => this.handleListItemClick("权籍调查表")} key={"权籍调查表"}>{projectName}</Button></TableCell>
            
          </TableRow>

               <TableRow >
            <TableCell ><Button onClick={() => this.handleListItemClick("界址标示表")} key={"界址标示表"}>界址标示表</Button></TableCell>
            <TableCell><Button onClick={() => this.handleListItemClick("界址标示表")} key={"界址标示表"}>{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={() => this.handleListItemClick("界址签章表")} >界址签章表</Button></TableCell>
            <TableCell><Button onClick={() => this.handleListItemClick("界址签章表")} >{projectName}</Button></TableCell>
            
          </TableRow>
            <TableRow >
            <TableCell ><Button onClick={() => this.handleListItemClick("界址说明表")} >界址说明表</Button></TableCell>
            <TableCell><Button onClick={() => this.handleListItemClick("界址说明表")} >{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={() => this.handleListItemClick("调查审核表")} key={"调查审核表"}>调查审核表</Button></TableCell>
            <TableCell><Button onClick={() => this.handleListItemClick("调查审核表")} key={"调查审核表"}>{projectName}</Button></TableCell>
            
          </TableRow>

            <TableRow >
            <TableCell ><Button onClick={() => this.handleListItemClick("共有宗地面积分摊表")} key={"共有宗地面积分摊表"}>共有宗地面积分摊表</Button></TableCell>
            <TableCell><Button onClick={() => this.handleListItemClick("共有宗地面积分摊表")} key={"共有宗地面积分摊表"}>{projectName}</Button></TableCell>
            
          </TableRow>
           
        </TableBody>
      </Table>
      
</Paper>
<Button onClick={() => this.handleListItemClick("属性查询") } height="150px"  width="100%">属性查询</Button>
        </div>
      
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styleSheet)(SimpleDialog);

export default SimpleDialogWrapped;