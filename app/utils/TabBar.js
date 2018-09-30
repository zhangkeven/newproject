
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {StackNavigator,TabNavigator,NavigationActions} from 'react-navigation';
import HomeIndex from "../pages/HomeIndex";
import CreateOrder from "../pages/oneKey/CreateOrder";
import CreateType from "../pages/oneKey/CreateType";
import CreateSchedule from "../pages/oneKey/CreateSchedule";
import ReturnGoods from "../pages/oneKey/ReturnGoods";
import Repair from "../pages/oneKey/Repair";

const home = require('../img/nav_home2x.png');
const schedule = require('../img/nav_plan2x.png');
const type = require('../img/nav_release.png');
const returnGoods = require('../img/nav_return2x.png');
const repair = require('../img/nav_maintain2x.png');

const Tab = TabNavigator(
    {
        HomeIndex:{
            screen:HomeIndex,
            navigationOptions:{
                tabBarLabel:'首页',
                tabBarIcon: ({focused, tintColor}) => (
                  <Image
                    source={!focused ? require("../img/nav_home2x.png") : require("../img/nav_home_pre2x.png")}
                    style={[styles.tabIcon]}
                    resizeMode="contain"/>
                ),
            },
        },
        CreateSchedule:{
            screen:CreateSchedule,
            navigationOptions:{
                tabBarLabel:'进度',
                tabBarIcon: ({focused, tintColor}) => (
                  <Image
                    source={!focused ? require("../img/nav_plan2x.png") : require("../img/nav_plan_pre2x.png")}
                    style={[styles.tabIcon]}
                    resizeMode="contain"/>
                ),
            },
        },
        CreateType:{
            screen:CreateType,
            navigationOptions:{
                tabBarLabel:'创建',
                tabBarIcon: ({focused, tintColor}) => (
                  <Image
                    source={!focused ? require("../img/nav_release.png") : require("../img/nav_release.png")}
                    style={[styles.tabIcon]}
                    resizeMode="contain"/>
                ),
            },
        },
        ReturnGoods:{
            screen:ReturnGoods,
            navigationOptions:{
                tabBarLabel:'退货',
                tabBarIcon: ({focused, tintColor}) => (
                  <Image
                    source={!focused ? require("../img/nav_return2x.png") : require("../img/nav_return_pre2x.png")}
                    style={[styles.tabIcon]}
                    resizeMode="contain"/>
                ),
            },
        },
        Repair:{
            screen:Repair,
            navigationOptions:{
                tabBarLabel:'维修',
                tabBarIcon: ({focused, tintColor}) => (
                  <Image
                    source={!focused ? require("../img/nav_maintain2x.png") : require("../img/nav_maintain_pre2x.png")}
                    style={[styles.tabIcon]}
                    resizeMode="contain"/>
                ),
            },
        }
    },
    {
        iconStyle:{
               width:27,
               height:27,
               marginBottom:-4,
           },
           textStyle:{
               color:'#999',
           },
           selectedTextStyle:{
               color:'black',
           },
         tabIcon: {
           height: 24,
           width: 24,
           marginBottom: 2,
         }
    }
);