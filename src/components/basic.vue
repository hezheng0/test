<template>
    <div class="wrapper">
        <headerTop></headerTop>
        <sidebar></sidebar>
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <tag></tag>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import headerTop from "./headerTop";
import sidebar from "./sidebar";
import tag from "./tag";
import bus from "./bus";
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        headerTop,
        sidebar,
        tag
    },
    created() {
        bus.$on("collapse-content", msg => {
            this.collapse = msg;
        });

        bus.$on("tags", msg => {
            let arr = [];
            for (let i = 0, length = msg.length; i < length; i++) {
                msg[i].name && arr.push(msg[i], name);
            }
            this.tagsList = arr;
        });
    }
};
</script>

<style></style>
