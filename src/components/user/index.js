/* whole page
--dialog
---dialogContent
----list
-----listItem  avatar
               +listItemText
               +button  icon+typography
               +button flat

index page--{userModule button}--index(user) page---{ImageDownload button}---ImageDownload page   <handleClick +open>
                                                    {logOut button}---loginIn page    <navLink>

*/

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import UI
import { withStyles } from "material-ui/styles";
import Avatar from "material-ui/Avatar";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import Dialog, { DialogContent } from "material-ui/Dialog";
import Table, { TableBody, TableCell, TableHead,TableRow } from 'material-ui/Table';
import Divider from "material-ui/Divider";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import RootReducer from "./../../redux/RootReducer";
import { NavLink } from "react-router-dom";
import uuidv4 from "uuid/v4";
//import icon
// import FontAwesome from "react-fontawesome";
import AccountCircleIcon from "material-ui-icons/AccountCircle";
import Bluetooth from "material-ui-icons/Bluetooth";
import Devices from "material-ui-icons/Devices";
import Photo from "material-ui-icons/Photo";
//import color
import blue from "material-ui/colors/blue";
//import page
import LoginView from "../../views/LoginView";

import BluetoothConnect from "./BluetoothConnect";

// inset css
const styles = {
  dialog: {
    width: "35%",
    height: "80%",
    marginTop: "30px",
    marginLeft: "180px"
  },

  dialogImage: {
    width: "80%",
    height: "80%",
    marginTop: "30px",
    marginLeft: "180px"
  },

  listItem: {
    display: "flex",
    flexDirection: "column",
    justify: "space-between",
    padding:0,
    paddingLeft: "0px",
    paddingRight: "40%"
  },
  listItemIcon: {
    width: "60%",
    height: "60%",
    margin: 0,
    color: "#C1C6C9"
  },
  listItemText: {
    padding: "0px",
    fontSize: "0.8em",
    color: "#ffffff",
    fontFamily: "微软雅黑",
    fontWeight: "bold",
    justify: "center",
    align: "center",
    justifyContent: "center"
  },

  // specially for the three buttons in a row
  listItemUser: {
    display: "flex",
    flexDirection: "row",
    justify: "space-around",
    paddingLeft: "0px"
  },

  avatar:{
    lineHeight:'2em',
    // width:'40px',
    // height:'40px',
    size:'80px',
  },

  button: {
    width:'200px',
    height: 30,
    fontFamily: "微软雅黑",
    fontWeight: "bold",
    fontSize:'32px',
    color: "white",
    background: blue[300],
    borderRadius: '5px',
    border: 0,
    padding: 0
  },
  //specially for those mixed button
  buttonAttach: {
    display: "inline-block",
    padding: 0,
    lineHeight:'2em',
    marginTop:'30px',
    marginLeft:'8%',
    // marginRight: "36px",
    justify: "center",
    justifyContent: "center"
  },

  // buttonLogout:{
  //   background:blue[100],
  //   // color:'white',
  //   borderRadius:'3px',
  //   border:0,
  //   padding:0,
  // },

  buttonSecondaryAction: {
    width: "40px",
    height: "20px",

    border: 0,
    padding: 0,
    borderRadius: "3px",
    fontWeight: "bold"
  },

  icon: {
    width: "80px",
    height: "80px",
    justify:'center',
  },

  typography: {
    fontFamily: "微软雅黑",
    fontSize: "28px",
    width:'140px',
    // fontWeight:'bold',
  },
  //specially for those descriptional(or definitional) typography
  labelUser: {
    width: "110px",
    padding: 0,
    fontSize:'32px',
    lineHeight:'2em',
  },
  //specically for those state text
  userStateText: {
    background: blue[100],
    borderRadius: "5px",
    justify: "center",
    justifyContent: "center",
    width: "120px",
    fontSize:'28px',
    textAlign: "center",
    padding:'5px 0px',
  },
  navLink: {
    textDecoration: "none"
  },

  tableHead:{
    padding:0,
  },
 
  tableCellHead:{
    backgroundColor:blue[100],
    backgroundClip:'text',
    borderRadius:'5px',
    justify:'center',
    justifyContent:'center',
    width:'200px',
    textAlign:'center',
    padding:'5px 0',
    fontSize:'32px',

  },
  tableCellBody:{
    width:'50px',
    padding:0,
    textAlign:'center',
    padding:'15px 0',
    fontSize:'28px',

  },
};

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openImage: false,
      openBluetooth: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestCloseImage = this.handleRequestCloseImage.bind(this);
  }

  handleClick = event => {
    this.setState({ open: true });
  };
  handleClickImage = event => {
    this.setState({ openImage: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  handleRequestCloseImage = () => {
    this.setState({ openImage: false });
  };

  render() {
    const {
      classes,
      userAvatar,
      userName,
      userID,
      userCompany,
      userJob,
      lastLoginTime,
      lastLoginAddress
    } = this.props;
    const imageLists = [
      { imageName: "*****区域影像图1", imageSize: "105MB" },
      { imageName: "*****区域影像图2", imageSize: "1.25GB" },
      { imageName: "*****区域影像图3", imageSize: "345MB" },
      { imageName: "*****区域影像图4", imageSize: "289MB" },
      { imageName: "*****区域影像图5", imageSize: "4.21GB" },
      { imageName: "*****区域影像图6", imageSize: "335MB" },
      { imageName: "*****区域影像图7", imageSize: "156MB" },
      { imageName: "*****区域影像图8", imageSize: "2.24GB" },
      { imageName: "*****区域影像图9", imageSize: "3.56GB" },

    ];

    return (
      <div>
        <ListItem
          button
          disableGutters={true}
          className={classes.listItem}
          onClick={this.handleClick}
        >
          <ListItemIcon>
            <AccountCircleIcon className={classes.listItemIcon} />
          </ListItemIcon>
          <ListItemText
            primary="用户名"
            disableTypography={true}
            className={classes.listItemText}
          />
        </ListItem>

        <Dialog
          fullScreen
          className={classes.dialog}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          position="absolute"
          left="100px"
          top="20px"
        >
          <DialogContent>
            <List>
              <ListItem style={{lineHeight:'3em'}}>
                <ListItemAvatar style={{lineHeight:'3em'}}>
                  <Avatar sizes='80px' className={classes.avatar} alt="avatar" src={userAvatar} />
                </ListItemAvatar>
              </ListItem>

              <ListItem>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="用户名"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userName}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="用户ID"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userID}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="单位"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userCompany}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="职位"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={userJob}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="上次登录时间"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={lastLoginTime}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  disableTypography
                  className={classes.labelUser}
                  primary="上次登录地址"
                />
                <ListItemText
                  disableTypography
                  className={classes.userStateText}
                  primary={lastLoginAddress}
                />
              </ListItem>

              <Divider />

              <ListItem className={classes.listItemUser} style={{lineHeight:'5em'}} >
                <Button className={classes.buttonAttach}>
                  <Bluetooth className={classes.icon} />
                  <Typography className={classes.typography} bold>
                    蓝牙连接
                  </Typography>
                </Button>

                <Button className={classes.buttonAttach}>
                  <Devices className={classes.icon} />
                  <Typography className={classes.typography} bold>
                    连接到电脑
                  </Typography>
                </Button>

                <Button
                  className={classes.buttonAttach}
                  onClick={this.handleClickImage}
                >
                  <Photo className={classes.icon} />
                  <Typography className={classes.typography} bold>
                    影像下载
                  </Typography>
                </Button>
              </ListItem>

              <listItem style={{lineHeight:'2em'}}> </listItem>
              <listItem> </listItem>

              <ListItem
                style={{
                  justifyContent: "flex-end",
                  paddingTop: "50px",
                  paddingBottom: "0px",
                  marginBottom: "0px"
                }}
              >
                <NavLink className={classes.navLink} to="/">
                  <Button
                    flat
                    style={{
                      background: blue[100],
                      border: 0,
                      padding: '15px 25px',
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize:'32px',
                    }}
                  >
                    退 出 登 录
                  </Button>
                </NavLink>
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
        <Dialog
          fullScreen
          className={(classes.dialog, classes.dialogImage)}
          open={this.state.openImage}
          onRequestClose={this.handleRequestCloseImage}
        >
          <DialogContent>

            <Table>
            <TableHead className={classes.tableHead} >
              <TableRow className={classes.tableHead} >
                <TableCell  width='250px' className={classes.tableCellHead} >影像名称</TableCell>
                <TableCell  width='150px' className={classes.tableCellHead} >影像大小</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {imageLists.map(imageList =>
              <TableRow key={uuidv4()}>
                <TableCell className={classes.tableCellBody} >{imageList.imageName}</TableCell>
                <TableCell numeric className={classes.tableCellBody} >{imageList.imageSize}</TableCell>
              </TableRow>
                 )}
            </TableBody>
          </Table>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

//import reducer
const userReduce = (
  state = {
    userAvatar: "./avatar.png",
    userName: "武大珞珈",
    userID: "123456",
    userCompany: "南宁市国土测绘地理信息中心",
    userJob: "地籍测量员",
    lastLoginTime: "2017/08/24/21:38",
    lastLoginAddress: "115.101.26"
  },
  action
) => {
  return { ...state };
};
RootReducer.merge(userReduce);

//state?
const mapStateToProps = state => {
  const userState = state.userReduce;

  return {
    userAvatar: userState.userAvatar,
    userName: userState.userName,
    userID: userState.userID,
    userCompany: userState.userCompany,
    userJob: userState.userJob,
    lastLoginTime: userState.lastLoginTime,
    lastLoginAddress: userState.lastLoginAddress
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserModule));
