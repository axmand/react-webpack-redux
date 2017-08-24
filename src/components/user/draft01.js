
/* whole page--dialog
    avatar,typography,div--line?,button--(icon+typography)
*/

import React , {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List,{ListItem,ListItemAvatar,ListItemIcon,ListItemText} from 'material-ui/List';
import Dialog,{DialogContent,DialogContentText} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

//import icon
import FontAwesome from 'react-fontawesome'
import AccountCircle from 'material-ui-icons/AccountCircle';
import Person from 'material-ui-icons/Person';
import Bluetooth from 'material-ui-icons/Bluetooth';
import Devices from 'material-ui-icons/Devices';
import Photo from 'material-ui-icons/Photo';
//import color
import blue from 'material-ui/colors/blue';





const userInfo = ['用户名','ID','单位','职位'];
const loginInfo = ['时间','地址'];


const styles = {
  listitem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center ',
    paddingLeft: '0px',
  },
  listItemText: {
    lineHeight: '20px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
  },
    dialog:{
    width: '500px',
    height: '900px',
    marginTop:'10',
    marginLeft:'10%',
    justify:'space-between' 
  },
  button:{
    width:80,
    height:30,
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    color: "white",
    background: blue[300],
    borderRadius:3,
    border:0,
    padding: '0 3px',
  },
    row: {
    display: 'flex',
    justifyContent: 'center',
    },

  
};

class UserModule extends Component {

    constructor(props){
    super(props);
    this.state ={
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick = event => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }
  render() {
    const classes = this.props.classes;
  
    return (
      <div>
          <ListItem button className={classes.listitem} disableGutters={true} onClick={this.handleClick}>
            <ListItemIcon>
              <FontAwesome 
                name='user'
                size='lg'
                style={{
                  width: '24px',
                  height: '24px',
                  margin: '0px',
                  padding: '2px',
                  color: '#C1C6C9',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="用户名"
              disableTypography={true}
              className={classes.listItemText}
            />
          </ListItem>

            <Dialog
            className={classes.dialog}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            paperWidthMd

          >

            <DialogContent >

            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <ListItem>
              <Typography>用户名</Typography>
                <ListItemText justify='space-around' primary="这里是用户名"/>
              </ListItem>              
              <ListItem>
              <Typography>ID</Typography>
                <ListItemText justify='space-around' primary="这里是用户ID"/>
              </ListItem>
              <ListItem>
              <Typography>单位</Typography>
                <ListItemText primary="这里是单位名称"/>
              </ListItem>   
              <ListItem>
              <Typography>职位</Typography>
                <ListItemText primary="这里是职位名称"/>
              </ListItem>
              <ListItem>
              <Typography>上次登录时间</Typography>
                <ListItemText primary="这里是上次登录时间"/>
              </ListItem>   
              <ListItem>
              <Typography>上次登录地址</Typography>
                <ListItemText primary="这里是上次登录地址"/>
              </ListItem>
              <Divider />
              <ListItem>
                <div className={classes.row}>
                  <Bluetooth />
                  <Devices />
                  <Photo />                
                </div>
                 </ListItem> 
                <ListItem>
                <div className={classes.row}>
                  <Typography>蓝牙连接</Typography>
                  <Typography>连接到电脑</Typography>
                  <Typography>影像下载</Typography>               
                </div>
                 </ListItem>
                 <ListItem>
                  <Grid container>
                    <Grid item >
                      <Bluetooth />
                      <Typography>蓝牙连接</Typography>
                    </Grid>
                    <Grid item >
                      <Devices />
                      <Typography>连接到电脑</Typography>
                    </Grid>
                    <Grid item >
                      <Photo /> 
                      <Typography>影像下载</Typography>
                    </Grid>                    
                  </Grid>
                  </ListItem> 
          </List>
          <button color="blue" flat className={classes.button}>退 出 登 录</button>
          </DialogContent>
          </Dialog>
      </div>
    )
  }
  
}


export default withStyles(styles)(UserModule);