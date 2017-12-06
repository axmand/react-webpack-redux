import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import PointNameCell from './PointNameCell'
import projectData from "./../../redux/RootData";
// Map Redux state to component props
function mapStateToProps(state ,ownProps) {
  const tableIndex =ownProps.tableIndex;

  var jzxData=projectData.ProjectItem.L.jzxJSONData;
  var jzx = eval('(' + jzxData + ')');

console.log(jzx);
  var startPoints=[];
  var endPoints=[];
  var innerPoints=[];
  var jzxID=[];
  for(var i=0;i<jzx.geometries.length;i++)
  {
    jzxID.push(jzx.geometries[i].feature.id) ;
    var jzxPoints=jzx.geometries[i].options.poiArr;
    startPoints.push(jzxPoints[0]);
    endPoints.push(jzxPoints[jzxPoints.length-1]);
    if(jzxPoints.length>2)
    {
      var temp="";
      for(var j=1;j<jzxPoints.length-2;j++)
      { temp+=jzxPoints[j]+",";

      }   
      temp+=jzxPoints[jzxPoints.length-2];
      innerPoints.push(temp);
          
    }
    else
    {
      innerPoints.push("");
    }
  }

  projectData.ProjectItem.F3.StartPointCodeList=startPoints;
  projectData.ProjectItem.F3.InnerPointCodeList=innerPoints;
  projectData.ProjectItem.F3.EndPointCodeList=endPoints;
  
  return {
    startPoint:startPoints,
    innerPoint:innerPoints,
    endPoint:endPoints,
    jzxID:jzxID
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


class BoundarySignature extends Component {  
  render() {
     const { startPoint,innerPoint,endPoint,tableIndex,jzxID } = this.props;


var tableContent=[];



var tableHead1=(
<tr>
<td width="217" colSpan="3"><p >界址线 </p></td>
<td width="213" colSpan="2"><p >邻宗地 </p></td>
<td width="99"><p >本宗地 </p></td>
<td width="86" rowSpan="2"><p >日期 </p></td>
</tr>);
var tableHead2=(<tr>
  <td width="73"><p >起点号 </p></td>
  <td width="70"><p >中间点号 </p></td>
  <td width="74"><p >终点号 </p></td>
  <td width="113"><p >相邻宗地权利人 <br />
    （宗地代码） </p></td>
  <td width="100"><p >指界人姓名（签章） </p></td>
  <td width="99"><p >指界人姓名（签章） </p></td>
</tr>);


   tableContent.push(tableHead1);
   tableContent.push(tableHead2);
   
  for(var i=0;i<startPoint.length;i++)
    {
        var obj=(
        <tr>
            
                  <td width="73"><p ><PointNameCell tableIndex="F3" id={jzxID[i]} name={startPoint[i]} row={i} type="StartPointCodeList"/></p></td>
                  <td width="70"><p ><PointNameCell tableIndex="F3" id={jzxID[i]} name={innerPoint[i]} row={i} type="InnerPointCodeList"/></p></td>
                  <td width="74"><p ><PointNameCell tableIndex="F3" id={jzxID[i]} name={endPoint[i]} row={i} type="EndPointCodeList"/></p></td>
                  <td width="113"><p ></p></td>
                  <td width="100"><p ></p></td>
                  <td width="99"><p ></p></td>
                  <td width="86"><p ></p></td>

                 
                
        </tr>
        );
        tableContent.push(obj);
    }
    
    var table=(  

     <table className="mytable">
    <tbody >
{tableContent}
   </tbody>
   </table>



 )
        return table;
  }
}

// export default BoundarySignature;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoundarySignature)