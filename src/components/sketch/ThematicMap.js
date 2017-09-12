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
		height: '1232px',
		background: 'white',
		display: 'flex',
		justifyContent: 'center',
	},
	thematicMap: {
		position:'absolute',
		top:'50px',
		width: '840px',
		height:'1188px',
	},
	title:{
		padding:'34.33px 0 15px 0',
		fontSize:'32px',
		fontFamily:'宋体',
		fontWeight:'800'
	},
	tabletext1:{
		border:'solid 0.5px #000',
		fontSize:'20px',
		fontFamily:'宋体',
		textAlign:'center',
		lineHeight:'48px',
		height:'48px',
	},
	tabletext2:{
		border:'solid 0.5px #000',
		fontSize:'20px',
		fontFamily:'宋体',
		textAlign:'center',
		lineHeight:'48px',		
		height:'48px',
	},	
	mapdiv:{
		border:'solid 0.5px #000',
	},
	bottom1:{
		fontSize:'20px',
		fontFamily:'宋体',
		padding:'20px 0 10px 0',
		width:'100px'
	},
	bottom2:{
		fontSize:'20px',
		fontFamily:'宋体',
		padding:'20px 0 10px 30px',
		width:'100px'
	},
	right:{
		position:'absolute',
		fontSize:'20px',
		fontFamily:'宋体',
		width:'10px',
		height:'280px',
		top:'800px',
		padding:'0 10px 0 10px',

	}

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
							<Typography type='headline' className={classes.title}>
								不动产单元草图
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={0}>
								<Grid item xs>
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
												<Grid item xs={2}>
													<Typography type='subheading' className={classes.tabletext1}>
														土地权利人
													</Typography>
												</Grid>
												<Grid item xs={4}>
													<Typography type='subheading' className={classes.tabletext2}>
														张XX、王xx
													</Typography>
												</Grid>
												<Grid item xs={1}>
													<Typography type='subheading' className={classes.tabletext1}>
														坐落
													</Typography>
												</Grid>
												<Grid item xs={5}>
													<Typography type='subheading' className={classes.tabletext2}>
														南宁市blablabal
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item className={classes.mapdiv}>
											<div ref='ThematicMap' style={{ color: "#000", width: '100%', height: '934.34px' }} />
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs>
									<Typography className={classes.right}>
									X  X不动产权籍调查机构绘制
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						
						<Grid item xs={12}>
						<Grid container spacing={0}>
							<Grid item xs={5}>
							</Grid>
							<Grid item xs={2}>							
								<Typography type='headline' className={classes.bottom1}>
									调查者：<br/>审核者：					
								</Typography>
							</Grid>
							<Grid item xs={5}>
								<Typography type='headline' className={classes.bottom2}>
									调查日期：<br/>调查日期：
								</Typography>
							</Grid>
							</Grid>
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
    
    if(action.type ==="handleStyle"){
        const closeAllStyleDialog1={
            pointStyleIsClicked:false,
            lineStyleIsClicked:false,
            polygonStyleIsClicked:false,
            labelStyleIsClicked:false,
        }
        return Object.assign({},state,{... closeAllStyleDialog1});   
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