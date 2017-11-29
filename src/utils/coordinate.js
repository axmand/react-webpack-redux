
/************************************************************************
 * * Copyright © 南宁市国土测绘地理信息中心
 * * All rights reserved.
 * *
 * Depiction:   地理投影坐标系的一些主要运算
 * Author:      侯祥意
 * CDT:         2011-03-03
 * Version:     1.0.0.6
 * Note:        
 * * --------------------------Refactoring-------------------------------
 * Rewriter:    
 * UDT:         
 * Desc:        
 ************************************************************************/
/// <summary>
/// 地理投影坐标系
var _L0;    //中央经线, Central Meridian
var _Y0;    // False Easting，地理坐标X偏移，笛卡尔坐标系的Y坐标
var _X0;    // False Northing，地理坐标Y偏移，笛卡尔坐标系的X坐标

var _rA;    //椭球长半径 Equatorial Radius
var _a;    //扁率倒数 Eccentricity
var _rB;    //短半径
var _rC;    //极曲率半径
var _e1;    //第一偏心率平方
var _e2;    //第二偏心率平方

var _a0;    //
var _a1;    //
var _a2;    //
var _a3;    //
var _a4;    //
var _a5;    //

var _gsL;    //经度差
var _gsB;    //纬度差
var _gsX;    //大地坐标X
var _gsY;    //大地坐标Y，赤道与中央子午线交点为原点
class Coordinate {
        /// <summary>
        /// 度换算为弧度.
        /// </summary>
        /// <param name="degree"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        static Degree2Radian(degree) {
            return degree / 180.00 * Math.PI;
        } 
        /// <summary>
        /// 初始化投影椭球参数.
        /// </summary>
        /// <remarks></remarks>
        static InitializeSpheroidParameter() {
            //region 根据坐标基准初始化相应的椭球半径和偏心率倒数
            _rA = 6378137.00;
            _a = 298.257223563;
            //endregion

            _rB = _rA - _rA / _a;
            _rC = _rA * _rA / _rB;

            _e1 = (_rA + _rB) * (_rA - _rB) / _rA / _rA;
            _e2 = (_rA + _rB) * (_rA - _rB) / _rB / _rB;

            _a0 = 1.00 + (3.00 / 4.00 + (45.00 / 64.00 + (525.00 / 768.00 + (33075.00 / 49152.00 + (654885.00 / 983040.00) * _e1) * _e1) * _e1) * _e1) * _e1;
            _a1 = (3.00 / 4.00 + (15.00 / 16.00 + (1575.00 / 1536.00 + (6615.00 / 6144.00 + (1091475.00 / 983040.00) * _e1) * _e1) * _e1) * _e1) * _e1;
            _a2 = ((15.00 / 64.00 + (315.00 / 768.00 + (6615.00 / 12288.00 + (155925.00 / 245760.00) * _e1) * _e1) * _e1) * _e1) * _e1;
            _a3 = (((105.00 / 1536.00 + (945.00 / 6144.00 + (467775.00 / 1966080.00) * _e1) * _e1) * _e1) * _e1) * _e1;
            _a4 = ((((945.00 / 49152.00 + (51975.00 / 983040.00) * _e1) * _e1) * _e1) * _e1) * _e1;
            _a5 = (((((10395.00 / 1966080.00) * _e1) * _e1) * _e1) * _e1) * _e1;

            let d = _rA * (1 - _e1);

            _a0 *= d;
            _a1 *= -d / 2.00;
            _a2 *= d / 4.00;
            _a3 *= -d / 6.00;
            _a4 *= d / 8.00;
            _a5 *= -d / 10.00;

        }
        /// <summary>
        /// 指定构造函数.
        /// </summary>
        /// <param name="coorDatum">坐标基准.</param>
        /// <param name="centralMeridianDegree">中央经线.</param>
        /// <param name="falseEasting">笛卡尔横坐标偏移.</param>
        /// <param name="falseNorthing">笛卡尔纵坐标偏移.</param>
        /// <remarks></remarks>
       static ProjectedCoordinateSystem() {
            _L0 = this.Degree2Radian(108.00);
            _Y0 = 500000.00;
            _X0 = -2000000.00;
            this.InitializeSpheroidParameter();
        }
        /// <summary>
        /// 计算弧长.
        /// </summary>
        /// <param name="x"></param>
        /// <returns></returns>
        /// <remarks></remarks>
        static CalculateArcLength(x) {
            let vResult = 0;
            vResult = _a0 * x +
                             _a1 * Math.sin(2 * x) +
                             _a2 * Math.sin(4 * x) +
                             _a3 * Math.sin(6 * x) +
                             _a4 * Math.sin(8 * x) +
                             _a5 * Math.sin(10 * x);
            return vResult;
        }
        /// <summary>
        /// 高斯投影正解计算——大地坐标换算为投影坐标.
        /// </summary>
        /// <param name="radianL">经度值，单位：弧度.</param>
        /// <param name="radianB">纬度值，单位：弧度.</param>
        /// <param name="descartesX">计算所得的笛卡尔平面坐标的X.</param>
        /// <param name="descartesY">计算所得的笛卡尔平面坐标的Y.</param>
        static LB2XY (radianL,radianB) {
            this.ProjectedCoordinateSystem();
            let radianL_C = this.Degree2Radian(radianL);
            let radianB_C = this.Degree2Radian(radianB);
            _gsL = radianL_C - _L0;
            _gsB = radianB_C;

            let tanB = Math.tan(_gsB)   //
            let tanBB = tanB * tanB;    //
            let cosB = Math.cos(_gsB)   //
            let cosBBLL = cosB * cosB * _gsL * _gsL;    //

            let n1 = _e2 * cosB * cosB;
            let n2 = _rC / Math.sqrt(1 + n1);

            _gsX = (61.00 - 58 * tanBB + tanBB * tanBB) / 720.00;
            _gsX = _gsX * cosBBLL + (5 - tanBB + 9 * n1 + 4 * n1 * n1) / 24.00;
            _gsX = (_gsX * cosBBLL + 0.5) * n2 * tanB * cosBBLL;
            _gsX = _gsX + this.CalculateArcLength(_gsB);

            _gsY = (5 + (tanBB - 18) * tanBB + (14 - 58 * tanBB) * n1) / 120.00;
            _gsY = _gsY * cosBBLL + (n1 - tanBB + 1) / 6.00;
            _gsY = (_gsY * cosBBLL + 1) * n2 * cosB * _gsL;
            let descartesX = _gsY + _Y0;
            let descartesY = _gsX + _X0
            return{
                'descartesX': descartesX ,
                'descartesY': descartesY 
            } 
        }
}

export default Coordinate





