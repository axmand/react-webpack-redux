import React, { Component } from 'react';

import { Provider, connect } from 'react-redux'

// Map Redux state to component props
function mapStateToProps(state) {
  
  
    
    return {
      LandPointCodeList:state.LandPointCodeList,
      LandPointTypeList:state.LandPointTypeList,
      LandPointDistance:state.LandPointDistance,
      LandBoundaryType:state.LandBoundaryType,
      LandBoundaryLocation:state.LandBoundaryLocation,
      LandBoundaryExplain:state.LandBoundaryExplain
      
      
    };
  }
  
  // Map Redux actions to component props
  function mapDispatchToProps(dispatch) {
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
    
   
    const { LandPointCodeList,LandPointTypeList,LandPointDistance,LandBoundaryType,LandBoundaryLocation,LandBoundaryExplain } = this.props;
    
    function getPointTypeList(col,row)
    {
      
      if(LandPointTypeList[row]==col)
      return "√";
      else 
      return " ";
    }

    function getBoundaryType(col,row)
    {
      
      if(LandBoundaryType[row]==col)
      return "√";
      else 
      return " ";
    }


    function getBoundaryLocation(col,row)
    {
      
      if(LandBoundaryLocation[row]==col)
      return "√";
      else 
      return " ";
    }

    var tableContent=[];
    
    
    
    var tableHead1=(
      <tr>
    <td width="67" rowSpan="2"><p >界址点号 </p></td>
    <td width="145" colSpan="5"><p >界标种类 </p></td>
    <td width="60" rowSpan="2"><p >界址 <br />
      间距（m） </p></td>
    <td width="223" colSpan="8"><p >界址线类别 </p></td>
    <td width="85" colSpan="3"><p >界址线位置 </p></td>
    <td width="64"><p >说明 </p></td>
  </tr>);
    var tableHead2=(<tr>
    <td width="30"><p >钢钉 </p></td>
    <td width="30"><p >水泥桩 </p></td>
    <td width="30"><p >喷涂 </p></td>
    <td width="27"><p >无标志 </p></td>
    <td width="28"><p >其他 </p></td>
    <td width="25"><p >两点连线 </p></td>
    <td width="28"><p >道路 </p></td>
    <td width="28"><p >沟渠 </p></td>
    <td width="28"><p >围墙 </p></td>
    <td width="28"><p >围栏 </p></td>
    <td width="28"><p >田埂 </p></td>
    <td width="28"><p >墙壁 </p></td>
    <td width="28"><p >其他 </p></td>
    <td width="28"><p >内 </p></td>
    <td width="28"><p >中 </p></td>
    <td width="28"><p >外 </p></td>
    <td width="64"><p ></p></td>
  </tr>);
    
    
       tableContent.push(tableHead1);
       tableContent.push(tableHead2);

var firstLine=(
  <tr>
           <td width="67"><p >{LandPointCodeList[0]}</p></td>
           
    <td width="29"><p >{getPointTypeList(0,0)}</p></td>
    <td width="29"><p >{getPointTypeList(1,0)}</p></td>
    <td width="29"><p >{getPointTypeList(2,0)}</p></td>
    <td width="29"><p >{getPointTypeList(3,0)}</p></td>
    <td width="29"><p >{getPointTypeList(4,0)}</p></td>
    <td width="60" rowSpan="2"><p >{LandPointDistance[0]}</p></td>
    <td width="25" rowSpan="2"><p >{getBoundaryType(0,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(1,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(2,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(3,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(4,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(5,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(6,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(7,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryLocation(0,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryLocation(1,0)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryLocation(2,0)}</p></td>
    <td width="64" rowSpan="2"><p ></p></td>
    </tr>);

    tableContent.push(firstLine);
       for(var i=1;i<LandPointCodeList.length-1;i++)
       {

var tr1=(
            <tr>
    <td width="67" rowSpan="2"><p >{LandPointCodeList[i]}</p></td>
    <td width="29" rowSpan="2"><p >{getPointTypeList(0,i)}</p></td>
    <td width="29" rowSpan="2"><p >{getPointTypeList(1,i)}</p></td>
    <td width="29" rowSpan="2"><p >{getPointTypeList(2,i)}</p></td>
    <td width="29" rowSpan="2"><p >{getPointTypeList(3,i)}</p></td>
    <td width="29" rowSpan="2"><p >{getPointTypeList(4,i)}</p></td>
  </tr>);
 var tr2=( <tr>
    <td width="60" rowSpan="2"><p >{LandPointDistance[i]}</p></td>
    <td width="25" rowSpan="2"><p >{getBoundaryType(0,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(1,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(2,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(3,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(4,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(5,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(6,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryType(7,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryLocation(0,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryLocation(1,i)}</p></td>
    <td width="28" rowSpan="2"><p >{getBoundaryLocation(2,i)}</p></td>
    <td width="64" rowSpan="2"><p ></p></td>
  </tr>);
  tableContent.push(tr1);
  tableContent.push(tr2);
       }

       var trlist=(
        <tr>
<td width="67" rowSpan="2"><p >{LandPointCodeList[LandPointCodeList.length-1]}</p></td>
<td width="29" rowSpan="2"><p >{getPointTypeList(0,LandPointCodeList.length-1)}</p></td>
<td width="29" rowSpan="2"><p >{getPointTypeList(1,LandPointCodeList.length-1)}</p></td>
<td width="29" rowSpan="2"><p >{getPointTypeList(2,LandPointCodeList.length-1)}</p></td>
<td width="29" rowSpan="2"><p >{getPointTypeList(3,LandPointCodeList.length-1)}</p></td>
<td width="29" rowSpan="2"><p >{getPointTypeList(4,LandPointCodeList.length-1)}</p></td>
</tr>);
tableContent.push(trlist);
       var table=(  
        
             <table className="mytable">
            <tbody >
        {tableContent}
           </tbody>
           </table>);
//     var table=(  
// <table className="mytable">
     
//     <tbody >
//   <tr>
//     <td width="67" rowSpan="2"><p >界址点号 </p></td>
//     <td width="145" colSpan="5"><p >界标种类 </p></td>
//     <td width="60" rowSpan="2"><p >界址 <br />
//       间距（m） </p></td>
//     <td width="223" colSpan="8"><p >界址线类别 </p></td>
//     <td width="85" colSpan="3"><p >界址线位置 </p></td>
//     <td width="64"><p >说明 </p></td>
//   </tr>
//   <tr>
//     <td width="30"><p >钢钉 </p></td>
//     <td width="30"><p >水泥桩 </p></td>
//     <td width="30"><p >喷涂 </p></td>
//     <td width="27"><p >无标志 </p></td>
//     <td width="28"><p >其他 </p></td>
//     <td width="25"><p >两点连线 </p></td>
//     <td width="28"><p >道路 </p></td>
//     <td width="28"><p >沟渠 </p></td>
//     <td width="28"><p >围墙 </p></td>
//     <td width="28"><p >围栏 </p></td>
//     <td width="28"><p >田埂 </p></td>
//     <td width="28"><p >墙壁 </p></td>
//     <td width="28"><p >其他 </p></td>
//     <td width="28"><p >内 </p></td>
//     <td width="28"><p >中 </p></td>
//     <td width="28"><p >外 </p></td>
//     <td width="64"><p ></p></td>
//   </tr>
//   <tr>
//     <td width="67"><p >011DBP</p></td>
//     <td width="30"><p >&nbsp;</p></td>
//     <td width="30"><p >&nbsp;</p></td>
//     <td width="30"><p >&nbsp;</p></td>
//     <td width="27"><p >√ </p></td>
//     <td width="28"><p >&nbsp;</p></td>
//     <td width="60" rowSpan="2"><p >6.05</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBN</p></td>
//     <td width="30" rowSpan="2"><p ></p></td>
//     <td width="30" rowSpan="2"><p ></p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >70.62</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBM</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >38.06</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBL</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >34.36</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBK</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >1.66</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBJ</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >59.41</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBH</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >59.41</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBG</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >80.07</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBQ</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >100.75</p></td>
//     <td width="25" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >011DBP</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >√ </p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="25" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="67" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="30" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="27" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>
//   <tr>
//     <td width="60" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="25" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="28" rowSpan="2"><p >&nbsp;</p></td>
//     <td width="64" rowSpan="2"><p >&nbsp;</p></td>
//   </tr>

//    </tbody>
// </table>
//  )
        return table;
  }
}

// export default BoundaryList;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoundaryList)