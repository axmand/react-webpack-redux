import React, { Component } from 'react';
import CheckCell from './CheckCell'
import { connect } from 'react-redux'
// import  PointNameCell from './PointNameCell'
import projectData from "./../../redux/RootData";
import InputListCell from "./InputListCell"
import MutiCheckButton from "./MutiCheckButton"
// Map Redux state to component props
const mapStateToProps=(state,ownProps)=> {
  
  const tableIndex =ownProps.tableIndex;
 var LandPointCodeList=[];
var LandPointDistance=[];
 
  var jzx =JSON.parse(projectData.ProjectItem.L.jzxJSONData);

  console.log(jzx);
  for(let i=0;i<jzx.geometries.length;i++)
  {
for(let j=0;j<jzx.geometries[i].options.poiArr.length;j++)
{
  var newValue=jzx.geometries[i].options.poiArr[j];
  if(LandPointCodeList.indexOf(newValue)<0)
    LandPointCodeList.push(newValue);
}
for(let j=0;j<jzx.geometries.length;j++)
{ 
  newValue=jzx.geometries[j].options.length;
  if(LandPointDistance.indexOf(newValue)<0)
    LandPointDistance.push(newValue);
  //if(LandPointDistance.indexOf(newValue)>0)
//   if(newValue!==undefined)
//   LandPointDistance.push(newValue);
// else
//   LandPointDistance.push(0);

 
}   

   
  }

  LandPointDistance.length=LandPointCodeList.length-1;
  projectData.ProjectItem.F2.LandPointCodeList  =LandPointCodeList;
  projectData.ProjectItem.F2.LandPointDistance   =LandPointDistance; 
  console.log(LandPointDistance);
  
    return {
      LandPointCodeList:LandPointCodeList,
      LandPointTypeList:state.ObContentReducer[tableIndex].LandPointTypeList,
      LandPointDistance:LandPointDistance,
      LandBoundaryType:state.ObContentReducer[tableIndex].LandBoundaryType,
      LandBoundaryLocation:state.ObContentReducer[tableIndex].LandBoundaryLocation,
      LandBoundaryExplain:state.ObContentReducer[tableIndex].LandBoundaryExplain
      
      
    };
  }
  
  // Map Redux actions to component props
  const mapDispatchToProps =(dispatch) =>{
    return {
  //修改命令 修改的字段名 修改字段的值
      onCompleteInput: (inputData,name) => {
  
        dispatch({
          type: "change", 
          payload: {
            inputValue: inputData,
            inputName: name
  
          }
        });
      }
    }
  }


class BoundaryList extends Component {
  

 
  render() {
    
   
    const { 
      LandPointCodeList,
      // LandPointTypeList,
      LandPointDistance,
      // LandBoundaryType,
      // LandBoundaryLocation,
      LandBoundaryExplain,
      // tableIndex 
    } = this.props;
    
    

    var tableContent=[];
    
    //<MutiCheckButton tableIndex="F2" value={""}  type="LandPointTypeList"/>
    
    var tableHead1=(
      <tr>
    <td width="67" rowSpan="2"><p >界址点号 </p></td>
    <td width="145" colSpan="5"><p>界址点种类</p></td>
    <td width="100" rowSpan="2"><p >界址 <br />
      间距（m） </p></td>
    <td width="223" colSpan="8"><p >界址线类别 </p></td>
    <td width="85" colSpan="3"><p >界址线位置 </p></td>
    <td width="64"><p >说明 </p></td>
  </tr>);
    var tableHead2=(<tr>
    <td width="30"><MutiCheckButton tableIndex="F2" value={"钢钉"} col={0} type="LandPointTypeList"/></td>
    <td width="30"><MutiCheckButton tableIndex="F2" value={"水泥桩"} col={1} type="LandPointTypeList"/></td>
    <td width="30"><MutiCheckButton tableIndex="F2" value={"喷涂"} col={2} type="LandPointTypeList"/></td>
    <td width="27"><MutiCheckButton tableIndex="F2" value={"无标志"} col={3} type="LandPointTypeList"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"其他"} col={4} type="LandPointTypeList"/></td>

    <td width="25"><MutiCheckButton tableIndex="F2" value={"两点连线"} col={0} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"道路"} col={1} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"沟渠"} col={2} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"围墙"} col={3} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"围栏"} col={4} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"田埂"} col={5} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"墙壁"} col={6} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"其他"} col={7} type="LandBoundaryType"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"内"} col={0} type="LandBoundaryLocation"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"中"} col={1} type="LandBoundaryLocation"/></td>
    <td width="28"><MutiCheckButton tableIndex="F2" value={"外"} col={2} type="LandBoundaryLocation"/></td>
    <td width="64"><p ></p></td>
  </tr>);
    
    // var tableHead2=(<tr>
    //   <td width="30"><p >钢钉 </p></td>
    //   <td width="30"><p >水泥桩 </p></td>
    //   <td width="30"><p >喷涂 </p></td>
    //   <td width="27"><p >无标志 </p></td>
    //   <td width="28"><p >其他 </p></td>
    //   <td width="25"><p >两点连线 </p></td>
    //   <td width="28"><p >道路 </p></td>
    //   <td width="28"><p >沟渠 </p></td>
    //   <td width="28"><p >围墙 </p></td>
    //   <td width="28"><p >围栏 </p></td>
    //   <td width="28"><p >田埂 </p></td>
    //   <td width="28"><p >墙壁 </p></td>
    //   <td width="28"><p >其他 </p></td>
    //   <td width="28"><p >内 </p></td>
    //   <td width="28"><p >中 </p></td>
    //   <td width="28"><p >外 </p></td>
    //   <td width="64"><p ></p></td>
    // </tr>);
       tableContent.push(tableHead1);
       tableContent.push(tableHead2);
if(LandPointCodeList.length>0)
{
var firstLine=(
  <tr>
           <td width="67"><p >{LandPointCodeList[0]}</p></td>

    <td width="29"><p ><CheckCell tableIndex="F2" value={""} row={0} col={0} type="LandPointTypeList"/></p></td>
    <td width="29"><p ><CheckCell tableIndex="F2" value={""} row={0} col={1} type="LandPointTypeList"/></p></td>
    <td width="29"><p ><CheckCell tableIndex="F2" value={""} row={0} col={2} type="LandPointTypeList"/></p></td>
    <td width="29"><p ><CheckCell tableIndex="F2" value={""} row={0} col={3} type="LandPointTypeList"/></p></td>
    <td width="29"><p ><CheckCell tableIndex="F2" value={""} row={0} col={4} type="LandPointTypeList"/></p></td>
    <td width="100" rowSpan="2"><InputListCell name="LandPointDistance" tableIndex="F2" index={0} defaultValue="test"  title="距离" tips="请填写距离"/></td>
    <td width="25" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={0} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={1} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={2} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={3} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={4} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={5} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell  tableIndex="F2" value={""} row={0} col={6} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell  tableIndex="F2" value={""} row={0} col={7} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={0} type="LandBoundaryLocation"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={1} type="LandBoundaryLocation"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={0} col={2} type="LandBoundaryLocation"/></p></td>
    <td width="64" rowSpan="2"><InputListCell name="LandBoundaryExplain" tableIndex="F2" index={0} defaultValue="test"  title="说明" tips="请填写说明信息"/></td>
    {/* <td width="64" rowSpan="2"><p >{LandBoundaryExplain[0]}</p></td> */}
    </tr>);

    tableContent.push(firstLine);
}

if(LandPointCodeList.length>1)
{
       for(var i=1;i<LandPointCodeList.length-1;i++)
       {

var tr1=(
            <tr>
    <td width="67" rowSpan="2"><p >{LandPointCodeList[i]}</p></td>
    <td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={0} type="LandPointTypeList"/></p></td>
    <td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={1} type="LandPointTypeList"/></p></td>
    <td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={2} type="LandPointTypeList"/></p></td>
    <td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={3} type="LandPointTypeList"/></p></td>
    <td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={4} type="LandPointTypeList"/></p></td>
  </tr>);
 var tr2=( <tr>
    {/* <td width="60" rowSpan="2"></td> */}
    <td width="100" rowSpan="2"><InputListCell tableIndex="F2" name="LandPointDistance"  index={i} defaultValue="test" title="距离" tips="请填写距离"/></td>
    <td width="25" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={0} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={1} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={2} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={3} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={4} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={5} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={6} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell  tableIndex="F2" value={""} row={i} col={7} type="LandBoundaryType"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={0} type="LandBoundaryLocation"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={1} type="LandBoundaryLocation"/></p></td>
    <td width="28" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={i} col={2} type="LandBoundaryLocation"/></p></td>
    <td width="64" rowSpan="2"><p ><InputListCell name="LandBoundaryExplain" tableIndex="F2" index={i} defaultValue="test"  title="说明" tips="请填写说明信息"/></p></td>
  </tr>);
  tableContent.push(tr1);
  tableContent.push(tr2);
       }

       var trlist=(
        <tr>
<td width="67" rowSpan="2"><p >{LandPointCodeList[LandPointCodeList.length-1]}</p></td>
<td width="29" rowSpan="2"><p ><CheckCell  tableIndex="F2" value={""} row={LandPointCodeList.length-1} col={0} type="LandPointTypeList"/></p></td>
<td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={LandPointCodeList.length-1} col={1} type="LandPointTypeList"/></p></td>
<td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={LandPointCodeList.length-1} col={2} type="LandPointTypeList"/></p></td>
<td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={LandPointCodeList.length-1} col={3} type="LandPointTypeList"/></p></td>
<td width="29" rowSpan="2"><p ><CheckCell tableIndex="F2" value={""} row={LandPointCodeList.length-1} col={4} type="LandPointTypeList"/></p></td>
</tr>);
tableContent.push(trlist);

       }
       var table=(  
        
             <table className="mytable">
            <tbody >
        {tableContent}
           </tbody>
           </table>);

        return table;
  }
}

// export default BoundaryList;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoundaryList)