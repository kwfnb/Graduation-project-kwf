/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 11:42:20
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-07 09:47:51
 */
import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import 'video.js/dist/video'
import VideoPlayer from 'vue-video-player'
import {
    Toast,
    Button,
    Form,
    Field,
    CellGroup,
    Image,
    Col, 
    List ,PullRefresh ,
    Row,Swipe, SwipeItem,Lazyload,Sticky ,Picker,Popup,Uploader,NoticeBar,Tab, Tabs,Dialog ,NavBar 
    ,RadioGroup,Radio,AddressEdit,Cell,Checkbox, CheckboxGroup
} from 'vant';
import 'vant/lib/index.css';
import './style/iconfont.css'


createApp(App).use(Swipe).use(Vuex).use(Cell).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(AddressEdit).use(Radio).use(store).use(Sticky).use(Tab).use(Dialog).use(NavBar).use(Tabs).use(Popup).use(NoticeBar).use(Uploader).use(Picker).use(VideoPlayer).use(Toast).use(PullRefresh).use(List).use(SwipeItem).use(Lazyload).use(Col).use(Row).use(Toast).use(Button).use(Form).use(Field).use(Image).use(CellGroup).use(router).mount('#app')