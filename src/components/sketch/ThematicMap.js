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
		height: `${window.innerHeight-48}px`,
		background: 'white',
		display: 'flex',
		justifyContent: 'center',
	},
	thematicMap: {
		position:'absolute',
		top:'7.8125%',
		width: '46%',
		height: `${window.innerHeight*0.875}px`,
	},
	title:{
		padding:'2% 0 0 0',
		fontSize:'1.5em',
		fontFamily:'宋体',
		fontWeight:'800',
		height:'43.75%'
	},
	table:{
		width:'100%',
		position:'absolute',
		top:'7%'
	},
	tabletext12:{
		width:'100%'
	},
	tabletext1:{
		border:'solid 0.5px #000',
		fontSize:'0.5em',
		fontFamily:'宋体',
		textAlign:'center',
	},
	tabletext2:{
		border:'solid 0.5px #000',
		fontSize:'1em',
		fontFamily:'宋体',
		textAlign:'center',
	},	
	mapdiv:{
		border:'solid 0.5px #000',
		width:'100%'
	},
	bottom1:{
		width:'100%',
		height: `${window.innerHeight*0.05}px`,
		position:'absolute',
		top:'90%'
	},
	bottom2:{
		width:'100%',
		height: `${window.innerHeight*0.05}px`,
		position:'absolute',
		top:'94%'
	},
	bottom11:{
		fontSize:'1em',
		fontFamily:'宋体',
		padding:0,
	},

	right:{
		position:'absolute',
		fontSize:'1em',
		fontFamily:'宋体',
		letterSpacing:'20px',
		width:'2%',
		height:'40%',
		top:'61%',
		padding:'0 1% 0 1%'
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
		const {mapCenter,jzdJSONData,szJSONData,zdJSONData,zjJSONData }=this.props;
		const ThematicMapDiv = this.refs.ThematicMap;
		thematicMap = new maptalks.Map(ThematicMapDiv, {
				center: mapCenter,
				zoom: 20,
				baseLayer: new maptalks.TileLayer('base', {
						urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
						subdomains: ['a', 'b', 'c', 'd', 'e']
				}),
		});

		maptalks.Layer.fromJSON(jzdJSONData).addTo(thematicMap);
		maptalks.Layer.fromJSON(szJSONData).addTo(thematicMap);
		maptalks.Layer.fromJSON(zdJSONData).addTo(thematicMap);
		maptalks.Layer.fromJSON(zjJSONData).addTo(thematicMap);
	}

	render(){

		const classes = this.props.classes;

		return(
			<div className={classes.root} >
				<Paper className={classes.thematicMap}>
					<Grid container direction='column' spacing={0}>
						<Grid item xs>
							<Typography type='headline' className={classes.title}>
								不动产单元草图
							</Typography>
						</Grid>
						<Grid item xs={12} className={classes.table}>
							<Grid container spacing={0}>
								<Grid item xs>
								</Grid>
								<Grid item xs={10}>
									<Grid 
										container 
										direction='column' 
										spacing={0}
										style={{
											border:'solid 0.5px #606060',
										}}
									>
										<Grid item className={classes.tabletext12}>
											<Grid container spacing={0}>
												<Grid item xs={3}>
													<Typography type='subheading' className={classes.tabletext1}>
														土地权利人
													</Typography>
												</Grid>
												<Grid item xs={3}>
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
														南宁市blablabla
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item className={classes.mapdiv}>
											<div ref='ThematicMap' style={{ color: "#000", width: '100%', height:`${window.innerHeight*0.69}`}} />
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs>
									<div className={classes.right}>
									X  X不动产权籍调查机构绘制
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item item xs={12} className={classes.bottom1}>
							<Grid container spacing={0}>
								<Grid item xs={5}>
								</Grid>
								<Grid item xs={2}>
									<Typography type='headline' className={classes.bottom11}>
										调查者：					
									</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography type='headline' className={classes.bottom11}>
										调查日期：
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item item xs={12} className={classes.bottom2}>
							<Grid container spacing={0}>
								<Grid item xs={5}>
								</Grid>
								<Grid item xs={2}>
									<Typography type='headline' className={classes.bottom11}>
										审核者：					
									</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography type='headline' className={classes.bottom11}>
										调查日期：
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
}


const mapStateToProps = (state) => {
    const sketchState=state.sketchReduce;

    return {
		mapCenter:sketchState.mapCenter,
		jzdJSONData:sketchState.jzdJSONData,
		szJSONData:sketchState.szJSONData,
		zdJSONData:sketchState.zdJSONData,
		zjJSONData:sketchState.zjJSONData
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
      return null
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{name:'ThematicMap'})(ThematicMap));