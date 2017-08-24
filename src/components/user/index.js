
/* whole page--dialog
    avatar,typography,div--?,button--(icon+typography)
*/

import React , {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import UI
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import List,{ListItem,ListItemAvatar,ListItemIcon,ListItemText} from 'material-ui/List';
import Dialog,{DialogContent} from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
//import icon
import FontAwesome from 'react-fontawesome'
import Person from 'material-ui-icons/Person';
import Bluetooth from 'material-ui-icons/Bluetooth';
import Devices from 'material-ui-icons/Devices';
import Photo from 'material-ui-icons/Photo';
//import color
import blue from 'material-ui/colors/blue';





const userInfo = ['用户名','ID','单位','职位'];
const loginInfo = ['时间','地址'];


const styles = {
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    justify:'space-between',
    paddingLeft: '0px',
  },
  listItemUser:{
    display: 'flex',
    flexDirection: 'row',
    justify:'space-between',
    paddingLeft: '0px',

  },
  listItemText: {
    lineHeight: '20px',
    color: '#ffffff',
    fontFamily: "微软雅黑",
    fontWeight: 'bold',
    justify:'center',
    align:'center',
  },
  Dialog:{
    display:'flex',
    alignItem:'flex-end',
    width: '50%',
    height: '90%',
    marginTop:'3%',
    marginLeft:'10%',
    justify:'space-between',
    justifyContent:'center',
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
  buttonAttach:{
        display:'inline-block',

  },
  icon:{
    width:'48px',
    height:'48px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    },
  Typography:{
    fontFamily:'微软雅黑',
    fontWeight:'bold',
    fontSize:'16px'
  }

  
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
          <ListItem button className={classes.listItem} disableGutters={true} onClick={this.handleClick}>
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

            position='absolute'
            left='100px'
            top='20px'
          >
            <DialogContent>
              <List>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>

                <ListItem>
                  <ListItemText primary="用户名"/>
                  <ListItemText primary="这里是用户名"/>
                </ListItem> 

                <ListItem>
                  <ListItemText disableTypography 
                  style={{
                    width:'40px'
                  }}
                   primary="用户ID"/>
                  <ListItemText primary="这里是用户ID"/>
                </ListItem>

                <ListItem>
                  <ListItemText primary="单位"/>
                  <ListItemText primary="这里是单位名称"/>
                </ListItem> 

                <ListItem>
                  <ListItemText primary="职位"/>
                  <ListItemText primary="这里是职位名称"/>
                </ListItem>

                <ListItem>
                  <ListItemText primary="上次登录时间"/>
                  <ListItemText primary="state.time"/>
                </ListItem>  

                <ListItem>
                  <ListItemText primary="上次登录地址"/>
                  <ListItemText primary="state.localhost"/>
                </ListItem>

                <Divider />

                <ListItem className={classes.listItemUser }>
                  <Button className={classes.buttonAttach}>
                    <Bluetooth className={classes.icon}/>
                    <Typography className={classes.Typography}>蓝牙连接</Typography>
                  </Button>

                  <Button className={classes.buttonAttach}>
                    <Devices className={classes.icon}/>
                    <Typography className={classes.Typography}>连接到电脑</Typography>
                  </Button>

                  <Button className={classes.buttonAttach}>
                    <Photo className={classes.icon}/> 
                    <Typography className={classes.Typography}>影像下载</Typography>
                  </Button>
                </ListItem>

                <listItem style={{
                  alignItem:'flex-end'
                }}>
              <Button color="blue" flat className={classes.button}>退 出 登 录</Button>
                </listItem> 
              </List>
            </DialogContent>
          </Dialog>
        </div>
    )
  }
  
}


export default withStyles(styles)(UserModule);