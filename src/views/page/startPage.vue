<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 15:43:11
 * @LastEditors: kongwf
 * @LastEditTime: 2022-02-22 21:18:24
-->
<template>
    <div class="startPage">
        <img style="top: 30%;" src="../../assets/images/loginAndStart/startContent.png" />
        <img style="top: 70%;" src="../../assets/images/loginAndStart/startFooter.png" />
    </div>
</template>

<script>
export default {
    name:"startPage",
    data () {
        return {}
    },
    mounted(){
        require
    }
}
</script>

<style lang="scss" scoped>
.startPage{
    width: 100%;
    height: 100%;
    position:absolute;
    background:url(../../assets/images/loginAndStart/start.png);
    background-size:100%;
    background-repeat:no-repeat;
    background-position:bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
/*     justify-content: center; */
    img{
        position: relative;
        
        max-width: 100%;
        height: auto;
        object-fit:scale-down;
    }

}
</style>