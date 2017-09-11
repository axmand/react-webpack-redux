import React, {Component} from 'react';
import { connect } from 'react-redux';
import RootReducer from './../../redux/RootReducer';
import PropTypes from 'prop-types';
import * as maptalks from 'maptalks';
//import UI
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button';

import ThematicToolBar from './ThematicToolBar'


const styles={
	root:{
		width: '100%', 
		height: '720px',
		background: 'white',
		display: 'flex',
		justifyContent: 'center',
	},
	thematicMap: {
		width: '450px',
		height:'600px',
		border:'solid 0.5px #606060',
	},
	typography:{
		padding:'10px 0 10px 0'
	},
}

/**
 * @type {maptalks.Map}
 * 全局的专题图地图对象和方法
 */
let thematicMap;

/**
 * 专题图组件
 * @class
 */
class ThematicMap extends Component {

	componentDidMount() {
		const ThematicMapDiv = this.refs.ThematicMap;
		thematicMap = new maptalks.Map(ThematicMapDiv, {
				center: [-0.113049, 51.498568],
				zoom: 20,
				baseLayer: new maptalks.TileLayer('base', {
						urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
						subdomains: ['a', 'b', 'c', 'd', 'e']
				}),
		});
	}

	render(){
		const classes = this.props.classes;
		const { onStyleTypeClick } = this.props;

		return(
			<div className={classes.root}>
				<Paper className={classes.thematicMap}>
					<Grid container direction='column' spacing={0}>
						<Grid item xs>
							<Typography type='headline' className={classes.typography}>
								不动产单元草图
							</Typography>
						</Grid>
						<Grid item xs={10}>
							<Grid container spacing={0}>
								<Grid item xs>
									<Typography type='headline' className={classes.typography}>
										不动产单元草图
									</Typography>
								</Grid>
								<Grid item xs={10}>
									<Grid 
										container 
										direction='column' 
										spacing={0}
										style={{
											border:'solid 1px #606060',
										}}
									>
										<Grid item>
											<Grid container spacing={0}>
												<Grid item xs={1}>
													<Typography type='subheading' className={classes.typography}>
														不动产单元草图
													</Typography>
												</Grid>
												<Grid item xs={5}>
													<Typography type='subheading' className={classes.typography}>
														不动产单元草图
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<Typography type='subheading' className={classes.typography}>
														不动产单元草图
													</Typography>
												</Grid>
												<Grid item xs={5}>
													<Typography type='subheading' className={classes.typography}>
														不动产单元草图
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item>
											<div ref='ThematicMap' style={{ color: "#000", width: '100%', height: '200px' }} />
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs>
									<Typography type='headline' className={classes.typography}>
										不动产单元草图
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs>
							<Typography type='headline' className={classes.typography}>
								不动产单元草图
							</Typography>
						</Grid>
					</Grid>
				</Paper>
			</div>
		)
	}
}

ThematicMap.PropTypes={
    classes: PropTypes.func.isRequired,
    onStyleTypeClick: PropTypes.func.isRequired,
}

const thematicMapReduce = (state = {
    pointStyle:undefined,
    lineStyle:undefined,
    polygonStyle:undefined,
    labelStyle:undefined,
    pointStyleIsClicked:false,
    lineStyleIsClicked:false,
    polygonStyleIsClicked:false,
    labelStyleIsClicked:false,
},action)=>{
    if(action.type === "styleTypeClick" &&action.payload.command==="point"){
        const isPointStyleClick={
                pointStyleIsClicked:true,
            }            
        return Object.assign({},state,{... isPointStyleClick});
    }
    if(action.type === "styleTypeClick" &&action.payload.command==="line"){
            const isLineStyleClick={
                lineStyleIsClicked:true,
            }
            return Object.assign({},state,{... isLineStyleClick});   
    }
    if(action.type === "styleTypeClick" &&action.payload.command==="polygon"){
            const isPolygonStyleClick={
                polygonStyleIsClicked:true,
            }
            return Object.assign({},state,{... isPolygonStyleClick}); 
    }
    if(action.type === "styleTypeClick" &&action.payload.command==="label"){
            const isLabelStyleClick={
                labelStyleIsClicked:true,
            }
            return Object.assign({},state,{... isLabelStyleClick});     
    }
    if(action.type === "closeStyleDialog"){
        const closeAllStyleDialog={
            pointStyleIsClicked:false,
            lineStyleIsClicked:false,
            polygonStyleIsClicked:false,
            labelStyleIsClicked:false,
        }
        return Object.assign({},state,{... closeAllStyleDialog});    
    }
    if(action.type ==="handleStyle"){
        const closeAllStyleDialog1={
            pointStyleIsClicked:false,
            lineStyleIsClicked:false,
            polygonStyleIsClicked:false,
            labelStyleIsClicked:false,
        }
        return Object.assign({},state,{... closeAllStyleDialog1});   
    }
    if(action.type === "styleValueClick"){
        const newPointStyle={pointStyle:action.payload}
        console.log(newPointStyle);
        return Object.assign({},state,{... newPointStyle});    
    }
        return {...state};
}

RootReducer.merge(thematicMapReduce);

const mapStateToProps = (state, ownProps) => {
    const props = ownProps;

    return {
        text: ownProps.ownProps,
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
      return {
           onStyleTypeClick: (text) => {
            dispatch({
                type: 'styleTypeClick',
                payload: {
                    command: text
                }
            });
        },


      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ThematicMap'})(ThematicMap));