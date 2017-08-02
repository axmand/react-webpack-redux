import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//ui
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

//import icon
import LocationSearching from  'material-ui-icons/LocationSearching';//展点
import Adjust from 'material-ui-icons/Adjust';//画点
import Timeline from 'material-ui-icons/Timeline';//连线
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';//构面
import Delete from 'material-ui-icons/Delete';//删除
import Undo from 'material-ui-icons/Undo';//撤销
import Refresh from 'material-ui-icons/Refresh';//重做
import Save from 'material-ui-icons/Save';//保存

const styleSheet = createStyleSheet(theme=>({
    root:{
         height:'50px',
         width:'512px',
         position:'absolute',
         top:'80px',
         left:'100px',
         background: 'rgba(255, 255, 255, .75)',
         border:'solid 1px 	#606060',
         borderRadius: 8,
         boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.2)'
    },   
    button:{
        flexDirection: 'column',
        justifyContent: 'center ',
        display:'inline-block',
        //backgroud:'grey',
        minheight:'60px',
        minWidth:'60px',
        fontSize:'12px',
        padding:0,
        border:0,
    },

}))
class SkechToolBar extends Component{
    render(){
        const classes=this.props.classes;
        return(
            <div className={classes.root}  draggable={true}>
                <Button className={classes.button}>
                    <LocationSearching />  
                    <ListItemText primary="展点" />
                </Button>
                 <Button  className={classes.button}>
                    <Adjust />
                    <ListItemText primary="画点" />
                </Button>
                 <Button  className={classes.button}>
                    <Timeline />
                    <ListItemText primary="连线" />
                </Button>                               
                 <Button  className={classes.button}>
                    <CheckBoxOutlineBlank />
                    <ListItemText primary="构面" />
                </Button> 
                 <Button  className={classes.button}>
                    <Delete />
                    <ListItemText primary="删除" />
                </Button>            
                 <Button  className={classes.button}>
                    <Undo />
                    <ListItemText primary="撤销" />
                </Button>
                 <Button  className={classes.button}>
                    <Refresh />
                    <ListItemText primary="重做" />
                </Button>
                 <Button  className={classes.button}>
                    <Save />
                    <ListItemText primary="保存" />
                </Button>
            </div>
            
        )
    }
}
SkechToolBar.PropTypes={
    classes:PropTypes.object.isRequired
}

export default withStyles(styleSheet)(SkechToolBar);