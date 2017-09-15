
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

import React , { Component } from 'react';
import { connect } from 'react-redux';
//import UI
import { withStyles } from 'material-ui/styles';
import { ListItem,ListItemIcon,ListItemText } from 'material-ui/List';
//import icon
import FontAwesome from 'react-fontawesome'

import User from './User';




// inset css
const styles = {
  listItem: {
    display: 'flex',
    flexDirection: 'column',
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
    justifyContent:'center',
  },
};

class UserModule extends Component {

  // constructor(props){
  //   super(props);
  //   this.state ={
  //     open: false,
  //   }
  //   //bind to make 'this' work in the callback
  //   this.handleClick = this.handleClick.bind(this);
  //   // this.handleRequestClose = this.handleRequestClose.bind(this);

  // }

  state ={
    open: false,
  }

  handleClick = () => {
    this.setState({ open: true })
    console.log(this.state)
  }

  render() {
    const {
      classes,
    }=this.props;
  

  
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
    <User
    open={this.state.open}
    /> 
    </div> 
    )
  }
  
}



const mapStateToProps = (state) => ({
...state
})
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
        dispatch({
            type: 'USER_PAGE_OPEN',
        })
    },
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserModule));