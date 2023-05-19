<template>
  <div id="detailListView">
    <div class="detailListView-box">

      <MenuDetail v-if="showDetail" :menuDetailList="menuDetailList" :menuId="menuId" :commentList="commentList" :isShowSkeleton="isShowSkeleton"></MenuDetail>
      <NoteDetail v-else :noteDetailList="noteDetailList" :commentList="commentList" :isShowSkeleton="isShowSkeleton"></NoteDetail>
    </div>
  </div>
</template>

<script>

import MenuDetail from '@/components/Detail/MenuDetail.vue'
import NoteDetail from '@/components/Detail/NoteDetail.vue'

export default {

  name:'DetailListView',

  data(){
    return{
      menuId:this.$route.query.menuId,
      noteId:this.$route.query.noteId,
      menuDetailList:null,
      noteDetailList:null,
      showDetail:true,
      commentList:null,
      isShowSkeleton:true
    }
  },

  components:{
    MenuDetail,
    NoteDetail
  },

  created(){
    this.getMenuDetailData()
  },

  methods:{
    //请求菜谱详情列表数据
    async getMenuDetailData(){
      this.isShowSkeleton=true
      if(this.noteId==undefined){
        const data=await axios.get(`/recipe/detail/${this.menuId}`)
        //console.log(data);
        this.menuDetailList=data.data.result.recipe
        //console.log(this.menuDetailList);
        this.getCommentData(this.menuId)
        this.isShowSkeleton=false
      }else if(this.menuId==undefined){
        this.showDetail=false
        const data=await axios.get(`/note/detail/${this.noteId}`)
        //console.log(data);
        this.noteDetailList=data.data.result.note
        //console.log(this.noteDetailList);
        this.getCommentData(this.noteId)
        this.isShowSkeleton=false
      }
    },
    //请求评论列表数据
    async getCommentData(id){
      //console.log(id);
      const data=await axios.get(`/recipe/flatcomments/${id}/0/20`)
      //console.log(data);
      this.commentList=data.data.result
      //console.log(this.commentList);
    },
  },

}
</script>

<style>

</style>